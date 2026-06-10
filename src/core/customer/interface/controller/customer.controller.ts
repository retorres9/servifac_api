import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateCustomerUseCase } from "../../application/use-cases/createCustomer.usecase";
import { CreateCustomerDto } from "../dto/createCustomer.dto";
import { UpdateCustomerUseCase } from "@core/customer/application/use-cases/updateCostumer.usecase";
import { GetCustomerDto } from "../dto/getCustomer.dto";
import { GetCustomersUseCase } from "@core/customer/application/use-cases/getCustomers.usecase";
import { GetCustomerUseCase } from "@core/customer/application/use-cases/getCustomer.usecase";

@Controller('customer')
export class CustomerController {
    constructor(
        private readonly createCustomerUseCase: CreateCustomerUseCase,
        private readonly updateCustomerUseCase: UpdateCustomerUseCase,
        private readonly getCustomersUseCase: GetCustomersUseCase,
        private readonly getCustomerUseCase: GetCustomerUseCase
    ) {}

    // GET /customers: list with pagination/filter (page, limit, q, warehouseId).

    @Get(':id')
    async findCustomerById(@Param('id') customerId: string) {
        return this.getCustomerUseCase.execute(customerId);
    }

    @Post()
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
        return this.createCustomerUseCase.execute(createCustomerDto);
    }

    @Post('search')
    async findAllCustomers(@Body() getCustomerDto: GetCustomerDto) {
        return this.getCustomersUseCase.execute(getCustomerDto);
    }

    @Patch('update')
    async updateCustomer(@Body() updateCustomerDto: CreateCustomerDto) {
        return this.updateCustomerUseCase.execute(updateCustomerDto);
    }

    @Get(':id/sales')
    async getCustomerSales(@Param('id') customerId: number) {
        // Implement the logic to get sales for a specific customer by their ID
    }

    @Get('autocomplete')
    async autocomplete(@Param('query') query: string) {
        // Implement the logic to autocomplete customer names based on the query
    }
}