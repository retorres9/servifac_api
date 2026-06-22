import { TransactionContext } from "@common/domain/transaction.manager";
import { SalesDomain } from "../sales.domain";

export const SALES_INTERFACE = Symbol('SALES_INTERFACE');
export interface ISales {
    createSale(sale: SalesDomain, ctx: TransactionContext): Promise<number>;
    getSaleById(id: number): Promise<SalesDomain | null>;
    getAllSales(): Promise<SalesDomain[]>;
    updateSale(id: number, sale: SalesDomain): Promise<void>;
    deleteSale(id: number): Promise<void>;
}