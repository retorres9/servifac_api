export class ResComun {
    constructor(
        public readonly strTransactionState: string,
        public readonly intTransactionCode: number,
        public readonly strTransactionMessage: string,
        public readonly objData: any
    ) {

    }
}