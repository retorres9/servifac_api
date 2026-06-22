export class PaymentTypeDomain {
    constructor(
        public pytId: number,
        public pytName: string,
        public pytCode: string,
        public pytActive: boolean,
        public pytIsCash: boolean,
        public pytConfig: Record<string, any>,
        public pytDescription: string,
        public pytCreatedAt: Date,
        public pytUpdatedAt: Date,
    ) {}
}