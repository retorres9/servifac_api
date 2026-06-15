import { ProviderDomain } from "@core/provider/domain/provider.domain";
import { ProviderRepository } from "@core/provider/infrastructure/typeorm/provider.repository";
import { SearchProviderInput } from "../model/search-provider.input";
import { Inject } from "@nestjs/common";
import { PROVIDER_INTERFACE } from "@core/provider/domain/repository/provider.interface";

export class SearchProvidersUseCase {
    constructor(
        @Inject(PROVIDER_INTERFACE)
        private readonly providerRepository: ProviderRepository
    ) {}
    async execute(searchProviderInput: SearchProviderInput): Promise<ProviderDomain[]> {
        console.log('Executing SearchProvidersUseCase with input:', this.providerRepository, searchProviderInput);
        return await this.providerRepository.getProviderEntries(searchProviderInput);
    }
}