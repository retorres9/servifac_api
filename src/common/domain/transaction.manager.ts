export type TransactionContext = unknown

export const TRANSACTION_MANAGER = Symbol('TRANSACTION_MANAGER');

export interface ITransactionManager {
    run<T>(operation: (manager: TransactionContext) => Promise<T>): Promise<T>;
}