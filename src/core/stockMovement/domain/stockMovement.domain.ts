export class StockMovementDomain {
    constructor(
        public strReference: string,
        public intIdMovementType: number,
        public strNote: string | null | undefined,
        public intIdUser: number,
    ) {}
}