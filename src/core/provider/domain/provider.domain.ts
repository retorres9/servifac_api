export class ProviderDomain {
    constructor(
        public intIdProvider: number,
        public strProviderName: string,
        public strProviderDescription: string,
        public strProviderContact: string,
        public strProviderEmail: string,
        public strProviderPhone: string,
        public boolProviderActive: boolean
    ) {}
}