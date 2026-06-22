import { ITransactionManager, TransactionContext } from "@common/domain/transaction.manager";
import { DataSource } from "typeorm";

export class TypeOrmTransactionManager implements ITransactionManager {
    constructor(
        private readonly dataSource: DataSource
    ) {}
    run<T>(operation: (ctx?: TransactionContext) => Promise<T>): Promise<T> {
        return this.dataSource.transaction((manager) => operation(manager as TransactionContext));
    }
    
}