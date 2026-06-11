import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./infrastructure/typeorm/customer.entity";
import { CustomerRepository } from "./infrastructure/typeorm/customer.repository";
import { CUSTOMER_INTERFACE } from "./domain/interfaces/customer.interface";
import { CustomerController } from "./interface/controller/customer.controller";
import { CreateCustomerUseCase } from "./application/use-cases/createCustomer.usecase";
import { UpdateCustomerUseCase } from "./application/use-cases/updateCostumer.usecase";
import { GetCustomersUseCase } from "./application/use-cases/getCustomers.usecase";
import { GetCustomerUseCase } from "./application/use-cases/getCustomer.usecase";
import { RedisModule } from "@common/Redis/redis.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer]),
        RedisModule
    ],
    controllers: [CustomerController],
    providers: [
        {
            provide: CUSTOMER_INTERFACE,
            useClass: CustomerRepository
        },
        CreateCustomerUseCase,
        GetCustomersUseCase,
        UpdateCustomerUseCase,
        GetCustomerUseCase
    ],
    exports: [CUSTOMER_INTERFACE]
})
export class CustomerModule {}