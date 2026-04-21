import { SalesLineModule } from "../../sales-line.module";

export const SALES_LINE_REPOSITORY = Symbol('SALES_LINE_REPOSITORY');
export interface ISalesLine {
    createSaleLine(saleLine: SalesLineModule): Promise<void>;
    getSaleLineById(id: number): Promise<SalesLineModule[] | null>;
}