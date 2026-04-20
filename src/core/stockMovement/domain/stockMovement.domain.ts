export class StockMovementDomain {
    constructor(
        public strReference: string,
        public intIdMovementType: number,
        public intIdUser: number,
        public strNote: string,
    ) {}
}