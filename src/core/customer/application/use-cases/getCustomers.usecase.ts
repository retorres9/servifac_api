import { CUSTOMER_REPOSITORY, type ICustomer } from "@core/customer/domain/interfaces/customer.interface";
import { Inject } from "@nestjs/common";
import { GetCustomersInput } from "../model/getCustomers.input";
import { CustomerDomain } from "@core/customer/domain/customer.domain";

export class GetCustomersUseCase {
    constructor(
        @Inject(CUSTOMER_REPOSITORY) 
        private readonly customerRepository: ICustomer
    ) {}

    async execute(getCustomersInput: GetCustomersInput): Promise<CustomerDomain[]> {
        return this.customerRepository.getAllCustomers(getCustomersInput);
    }
}