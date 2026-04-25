import { SaleLineDomain } from "../saleLine.domain";

export const SALES_LINE_REPOSITORY = Symbol('SALES_LINE_REPOSITORY');
export interface ISalesLine {
    createSaleLines(saleLines: SaleLineDomain[]): Promise<void>;
    getSaleLineById(id: number): Promise<SaleLineDomain[] | null>;
}