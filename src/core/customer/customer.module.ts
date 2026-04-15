import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./infrastructure/typeorm/customer.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Customer])
    ],
    controllers: [],
    providers: []
})
export class CustomerModule {}