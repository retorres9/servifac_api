import { CustomerDomain } from "@core/customer/domain/customer.domain";
import { CUSTOMER_INTERFACE } from "@core/customer/domain/interfaces/customer.interface";
import { CustomerRepository } from "@core/customer/infrastructure/typeorm/customer.repository";
import { Inject } from "@nestjs/common";

export class GetCustomerUseCase {
    constructor(
        @Inject(CUSTOMER_INTERFACE) 
        private readonly customerRepository: CustomerRepository
    ) {}

    async execute(ci: string): Promise<CustomerDomain | null> {
        return await this.customerRepository.getCustomerByCi(ci);
    }
}