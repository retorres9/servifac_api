import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sales } from "./infrastructure/typeorm/sales.entity";
import { TransactionModule } from "src/common/transaction.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sales]),
        TransactionModule
    ],
    controllers: [],
    providers: []
})
export class SalesModule {}