import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./infrastructure/typeorm/customer.entity";
import { CustomerRepository } from "./infrastructure/typeorm/customer.repository";
import { CUSTOMER_REPOSITORY } from "./domain/interfaces/customer.interface";
import { CustomerController } from "./interface/controller/customer.controller";
import { CreateCustomerUseCase } from "./application/use-cases/createCustomer.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer])
    ],
    controllers: [CustomerController],
    providers: [
        {
            provide: CUSTOMER_REPOSITORY,
            useClass: CustomerRepository
        },
        CreateCustomerUseCase,
    ],
    exports: [CUSTOMER_REPOSITORY]
})
export class CustomerModule {}