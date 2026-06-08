import { Body, Controller, Patch, Post } from "@nestjs/common";
import { CreateCustomerUseCase } from "../../application/use-cases/createCustomer.usecase";
import { CreateCustomerDto } from "../dto/createCustomer.dto";
import { UpdateCustomerUseCase } from "@core/customer/application/use-cases/updateCostumer.usecase";
import { GetCustomerDto } from "../dto/getCustomer.dto";
import { GetCustomersUseCase } from "@core/customer/application/use-cases/getCustomers.usecase";

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        private readonly getCustomerUseCase: GetCustomersUseCase
    ) {}

    @Post('new')
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.createCustomerUseCase.execute(createCustomerDto);
    }

    @Post('find')
    async findAllCustomers(@Body() getCustomerDto: GetCustomerDto) {
        return this.getCustomerUseCase.execute(getCustomerDto);
    }

    @Patch('update')
    async updateCustomer(@Body() updateCustomerDto: CreateCustomerDto) {
        return this.updateCustomerUseCase.execute(updateCustomerDto);
    }
}