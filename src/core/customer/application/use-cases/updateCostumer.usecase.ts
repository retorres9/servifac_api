import { CUSTOMER_INTERFACE, type ICustomer } from "@core/customer/domain/interfaces/customer.interface";
import { Inject } from "@nestjs/common";

export class UpdateCustomerUseCase {
    constructor(
        @Inject(CUSTOMER_INTERFACE) 
        private readonly customerRepository: ICustomer
    ) {}

    async execute(updateCustomerDto: any) {
        const { strCi, ...updateData } = updateCustomerDto;
        const existingCustomer = await this.customerRepository.getCustomerByCi(strCi);
        if (!existingCustomer) {
            throw new Error('Customer not found');
        }
        const updatedCustomer = {
            ...existingCustomer,
            ...updateData
        };
        await this.customerRepository.updateCustomer(updatedCustomer);
    }
}