import { InjectRepository } from "@nestjs/typeorm";
import { CustomerDomain } from "../../domain/customer.domain";
import { ICustomer } from "../../domain/interfaces/customer.interface";
import { Customer } from "./customer.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";

export class CustomerRepository implements ICustomer {
    constructor(
        @InjectRepository(Customer)
        private readonly customerRepository: Repository<Customer>
    ) {}

    async createCustomer(customer: CustomerDomain): Promise<void> {
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
    async getAllCustomers(): Promise<CustomerDomain[]> {
        const customers = await this.customerRepository.find({ relations: ['cusFkWarehouse'] });
        return customers.map(customer => new CustomerDomain(
            customer.cusCi,
            customer.cusFirstName,
            customer.cusLastName,
            customer.cusEmail,
            customer.cusPhone,
            customer.cusAddress,
            customer.cusFkWarehouse.wrhId,
            customer.cusFkWarehouse.wrhName)
        );
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