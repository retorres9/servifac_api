import { SaleLineDomain } from "../saleLine.domain";

export const SALES_LINE_REPOSITORY = Symbol('SALES_LINE_REPOSITORY');
export interface ISalesLine {
    createSaleLine(saleLine: SaleLineDomain): Promise<void>;
    getSaleLineById(id: number): Promise<SaleLineDomain[] | null>;
}