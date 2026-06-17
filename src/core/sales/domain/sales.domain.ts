import { SaleLineDomain } from "@core/salesLine/domain/saleLine.domain";


export class SalesDomain {
    constructor(
        public intCustomerId: number | undefined,
        public intIdStatus: number,
        public dcmTotal: number,
        public dcmTotalWithTax: number,
        public intUserId: number | undefined,
        public SaleLines: SaleLineDomain[]
    ) {}
}