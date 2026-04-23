import { Module } from "@nestjs/common";
import { TRANSACTION_MANAGER } from "./domain/transaction.manager";
import { DataSource } from "typeorm";
import { TypeOrmTransactionManager } from "src/infrastructure/database/typeorm.transaction.manager";

@Module({
    providers: [{
        provide: TRANSACTION_MANAGER,
        useFactory: (datasource: DataSource) =>             new TypeOrmTransactionManager(datasource),
            inject: [DataSource]
        }
    ],
    controllers: [],
    exports: [TRANSACTION_MANAGER]
})
export class TransactionModule {}