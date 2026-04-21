import { SalesDomain } from "../sales.domain";

export const SALES_INTERFACE = Symbol('SALES_INTERFACE');
export interface ISales {
    createSale(sale: SalesDomain): Promise<void>;
    getSaleById(id: number): Promise<SalesDomain[] | null>;
    getAllSales(): Promise<SalesDomain[]>;
    updateSale(id: number, sale: SalesDomain): Promise<void>;
    deleteSale(id: number): Promise<void>;
}