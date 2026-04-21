import { ITransactionManager } from "src/common/domain/transaction.manager";
import { DataSource } from "typeorm";

export class TypeOrmTransactionManager implements ITransactionManager {
    constructor(
        private readonly dataSource: DataSource
    ) {}
    run<T>(operation: () => Promise<T>): Promise<T> {
        return this.dataSource.transaction(() => operation());
    }
    
}