export class PaymentDomain {
    constructor(
        public intIdSale: number,
        public dcmAmount: number,
        public intPaymentTypeId: number,
        public strPaymentMethod: string,
        public strReference: string,
        public dtePaymentDate: Date,
        public intPaymentStatus: number,
        public intPaymentId?: number
    ) {}
}