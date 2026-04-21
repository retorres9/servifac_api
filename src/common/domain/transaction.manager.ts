export const TRANSACTION_MANAGER = Symbol('TRANSACTION_MANAGER');

export interface ITransactionManager {
    run<T>(operation: () => Promise<T>): Promise<T>;
}