import { InjectRepository } from "@nestjs/typeorm";
import { CustomerDomain } from "../../domain/customer.domain";
import { ICustomer } from "../../domain/interfaces/customer.interface";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { GetCustomersInput } from "@core/customer/application/model/getCustomers.input";
import { REDIS_CLIENT } from "@common/Redis/redis.provider";
import Redis from "ioredis";

export class CustomerRepository implements ICustomer {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>,
        @Inject(REDIS_CLIENT) 
        private readonly redisClient: Redis
    ) {}
    
    async getCustomerByCi(ci: string): Promise<CustomerDomain | null> {
        const redisKey = `customer:getCustomerByCi:${ci}`;
        try {
            const cachedCustomer = await this.redisClient.get(redisKey);
            if (cachedCustomer) return JSON.parse(cachedCustomer);
        } catch (error) {
            console.error('Error fetching customer from Redis:', error);
        }
        const customer = await this.customerRepository.findOne({ where: { cusCi: ci }, relations: ['cusFkWarehouse'] });
        if (!customer) {
            return null;
        }
        try{
            await this.redisClient.set(redisKey, JSON.stringify(new CustomerDomain(
                customer.cusCi,
                customer.cusFirstName,
                customer.cusLastName,
                customer.cusEmail,
                customer.cusPhone,
                customer.cusAddress,
                customer.cusFkWarehouse.wrhId,
                customer.cusFkWarehouse.wrhName
            )), 'EX', 30);
        } catch (error) {
            console.error('Error setting customer in Redis:', error);
        }
        return new CustomerDomain(
            customer.cusCi,
            customer.cusFirstName,
            customer.cusLastName,
            customer.cusEmail,
            customer.cusPhone,
            customer.cusAddress,
            customer.cusFkWarehouse.wrhId,
            customer.cusFkWarehouse.wrhName
        );
    }

    async createCustomer(customer: CustomerDomain): Promise<void> {
        const existingCustomer = await this.customerRepository.findOne({ where: { cusCi: customer.strCi } });
        if (existingCustomer) {
            throw new BadRequestException('Customer with this CI already exists');
        }
        const newCustomerEntity = this.customerRepository.create({
            cusCi: customer.strCi,
            cusFirstName: customer.strName,
            cusLastName: customer.strLastName,
            cusEmail: customer.strEmail,
            cusPhone: customer.strPhone,
            cusAddress: customer.strAddress,
            cusFkWarehouse: { wrhId: customer.intIdWarehouse }
        });
        await this.customerRepository.save(newCustomerEntity);
    }
    async getCustomerById(id: number): Promise<CustomerDomain | null> {
        const redisKey = `customer:getCustomerById:${id}`;
        try {
            const cachedCustomer = await this.redisClient.get(redisKey);
            if (cachedCustomer) return JSON.parse(cachedCustomer);
        } catch (error) {
            console.error('Error fetching customer from Redis:', error);
        }
        const customer = await this.customerRepository.findOne({
            where: { cusId: id },
             relations: ['cusFkWarehouse']
         });
        if (!customer) {
            return null;
        }
        const result = new CustomerDomain(
            customer.cusCi,
            customer.cusFirstName,
            customer.cusLastName,
            customer.cusEmail,
            customer.cusPhone,
            customer.cusAddress,
            customer.cusFkWarehouse.wrhId,
            customer.cusFkWarehouse.wrhName
        );
        try{
            await this.redisClient.set(redisKey, JSON.stringify(result), 'EX', 30);
        } catch (error) {
            console.error('Error setting customer in Redis:', error);
        }
        return result;
    }
    async getAllCustomers(getCustomersInput: GetCustomersInput): Promise<CustomerDomain[]> {
        const { intPage = 1, intLimit = 10, strSearchTerm, dtFromDate, dtToDate, strSortBy = 'cusId', strSortOrder = 'ASC' } = getCustomersInput;
        const redisKey = `customer:getAllCustomers:${intPage}:${intLimit}:${strSearchTerm || ''}:${dtFromDate?.toISOString() || ''}:${dtToDate?.toISOString() || ''}:${strSortBy}:${strSortOrder}`;
        try {
            const cachedCustomers = await this.redisClient.get(redisKey);
            if (cachedCustomers) return JSON.parse(cachedCustomers);
        }
        catch (error) {
            console.error('Error fetching customers from Redis:', error);
        }
        const qb = this.customerRepository.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.cusFkWarehouse', 'warehouse')
            .leftJoinAndSelect('customer.cusFkUser', 'user');
        if (strSearchTerm) {
            const likeTerm = `%${strSearchTerm.trim()}%`;
            const exactTerm = strSearchTerm.trim();

            qb.andWhere(
            '(customer.cusFirstName ILIKE :likeTerm OR customer.cusLastName ILIKE :likeTerm OR customer.cusCi = :exactTerm)',
            { likeTerm, exactTerm }
            );
        }
        
        if (dtFromDate) qb.andWhere('customer.cusCreatedAt >= :fromDate', { fromDate: dtFromDate });
        if (dtToDate) qb.andWhere('customer.cusCreatedAt <= :toDate', { toDate: dtToDate });
        
        const allowedSortFields = ['cusFirstName', 'cusLastName', 'cusCi', 'cusCreatedAt'];
        const sortBy = allowedSortFields.includes(strSortBy) ? strSortBy : 'cusId';
        
        qb.orderBy(`customer.${sortBy}`, strSortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC');

        const [customers, total] = await qb.skip((intPage - 1) * intLimit).take(intLimit).getManyAndCount();
        const result = customers.map(customer => new CustomerDomain(
            customer.cusCi,
            customer.cusFirstName,
            customer.cusLastName,
            customer.cusEmail,
            customer.cusPhone,
            customer.cusAddress,
            customer.cusFkWarehouse.wrhId,
            customer.cusFkWarehouse.wrhName,
            customer.cusId,
            customer.cusFkUser.usrUsername,
            total
        ));
        try {
            await this.redisClient.set(redisKey, JSON.stringify(result), 'EX', 30);
        } catch (error) {
            console.error('Error setting customers in Redis:', error);
        }
        return result;
    }
    
    async updateCustomer(customer: CustomerDomain): Promise<void> {
        const customerFound = await this.customerRepository.findOne({ where: { cusId: customer.intCustomerId } });
        if (!customerFound) {
            throw new NotFoundException('Customer not found');
        }
        customerFound.cusCi = customer.strCi;
        customerFound.cusFirstName = customer.strName;
        customerFound.cusLastName = customer.strLastName;
        customerFound.cusEmail = customer.strEmail;
        customerFound.cusPhone = customer.strPhone;
        customerFound.cusAddress = customer.strAddress;
        customerFound.cusFkWarehouse = { wrhId: customer.intIdWarehouse } as any;
        await this.customerRepository.save(customerFound);

    }
    async deleteCustomer(id: number): Promise<void> {
        const customerFound = await this.customerRepository.findOne({ where: { cusId: id } });
        if (!customerFound) {
            throw new NotFoundException('Customer not found');
        }
        await this.customerRepository.remove(customerFound);
    }
}