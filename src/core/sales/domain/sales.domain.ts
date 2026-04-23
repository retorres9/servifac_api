import { SaleLineDomain } from "src/core/salesLine/domain/saleLine.domain";


export class SalesDomain {
    constructor(
        public intCustomerId: number,
        public intIdStatus: number,
        public dcmTotal: number,
        public dcmTotalWithTax: number,
        public intUserId: number,
        public SaleLines: SaleLineDomain[]
    ) {}
}