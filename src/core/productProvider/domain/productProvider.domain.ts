export class ProductProviderDomain {
    constructor(
        public intIdProduct: number,
        public intIdProvider: number,
        public strSupplierSku: string,
        public intUnitPrice: number,
        public intLeadDays: number
    ) {}
}