import { InjectRepository } from "@nestjs/typeorm";
import { CustomerDomain } from "../../domain/customer.domain";
import { ICustomer } from "../../domain/interfaces/customer.interface";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { GetCustomersInput } from "@core/customer/application/model/getCustomers.input";

export class CustomerRepository implements ICustomer {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}
    
    async getCustomerByCi(ci: string): Promise<CustomerDomain | null> {
        const customer = await this.customerRepository.findOne({ where: { cusCi: ci }, relations: ['cusFkWarehouse'] });
        if (!customer) {
            return null;
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
        const customer = await this.customerRepository.findOne({
            where: { cusId: id },
             relations: ['cusFkWarehouse']
         });
        if (!customer) {
            return null;
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
    async getAllCustomers(getCustomersInput: GetCustomersInput): Promise<CustomerDomain[]> {
        const { intPage = 1, intLimit = 10, strSearchTerm, dtFromDate, dtToDate, strSortBy = 'cusId', strSortOrder = 'ASC' } = getCustomersInput;

        const qb = this.customerRepository.createQueryBuilder('customer')
            .leftJoinAndSelect('customer.cusFkWarehouse', 'warehouse');
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
        return customers.map(customer => new CustomerDomain(
            customer.cusCi,
            customer.cusFirstName,
            customer.cusLastName,
            customer.cusEmail,
            customer.cusPhone,
            customer.cusAddress,
            customer.cusFkWarehouse.wrhId,
            customer.cusFkWarehouse.wrhName,
            total
        ));
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