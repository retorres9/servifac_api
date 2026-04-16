import { BadRequestException, Inject } from "@nestjs/common";
import { type IProvider, PROVIDER_INTERFACE } from "../../domain/repository/provider.interface";
import { ProviderDomain } from "../../domain/provider.domain";
import { CreateProviderInput } from "../model/create-provider.input";

export class CreateProviderUseCase {
    constructor(
        @Inject(PROVIDER_INTERFACE) private readonly providerRepository: IProvider
    ) {}

    async execute(entry: CreateProviderInput): Promise<ProviderDomain> {
        const existingProvider = await this.providerRepository.getProviderEntry({ intIdProvider: entry.intIdProvider } as ProviderDomain);
        if (existingProvider) {
            throw new BadRequestException('Provider already exists');
        }
        const providerDomain = new ProviderDomain(
            entry.intIdProvider,
            entry.strProviderName,
            entry.strProviderDescription,
            entry.strProviderContact,
            entry.strProviderEmail,
            entry.strProviderPhone,
            entry.boolProviderActive
        );
        return this.providerRepository.createProvider(providerDomain);
    }
}