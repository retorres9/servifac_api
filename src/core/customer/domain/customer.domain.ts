export class CustomerDomain {
    constructor(
        public strCi: string,
        public strName: string,
        public strLastName: string,
        public strEmail: string,
        public strPhone: string,
        public strAddress: string,
        public intIdWarehouse: number,
        public strWarehouseName: string | null,
        public intCustomerId?: number
    ) {}
}