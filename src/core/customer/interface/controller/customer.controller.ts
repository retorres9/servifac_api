import { Body, Controller, Post } from "@nestjs/common";
import { CreateCustomerUseCase } from "../../application/use-cases/createCustomer.usecase";
import { CreateCustomerDto } from "../dto/createCustomer.dto";

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase
    ) {}

    @Post('new')
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.createCustomerUseCase.execute(createCustomerDto);
    }
}