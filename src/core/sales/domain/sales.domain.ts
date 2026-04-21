import { SalesLineModule } from "src/core/salesLine/sales-line.module";

export class SalesDomain {
    constructor(
        public intCustomerId: number,
        public intIdStatus: number,
        public dcmTotal: number,
        public dcmTotalWithTax: number,
        public intUserId: number,
        public SaleLines: SalesLineModule[]
    ) {}
}