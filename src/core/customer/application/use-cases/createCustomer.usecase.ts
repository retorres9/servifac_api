import { Inject } from "@nestjs/common";
import { CUSTOMER_REPOSITORY, type ICustomer } from "../../domain/interfaces/customer.interface";
import { CreateCustomerInput } from "../model/createCustomer.input";

export class CreateCustomerUseCase {
    constructor(
        @Inject(CUSTOMER_REPOSITORY)
        private readonly customer: ICustomer
    ) {}

    async execute(input: CreateCustomerInput) {
        await this.customer.createCustomer({
            strCi: input.strCi,
            strName: input.strName,
            strLastName: input.strLastName,
            strEmail: input.strEmail,
            strPhone: input.strPhone,
            strAddress: input.strAddress,
            intIdWarehouse: input.intIdWarehouse,
            strWarehouseName: null // This will be populated when fetching the customer, not needed for creation
        });
    }
}