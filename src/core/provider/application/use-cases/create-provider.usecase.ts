import { Inject } from "@nestjs/common";
import { type IProvider, PROVIDER_INTERFACE } from "../../domain/repository/provider.interface";
import { ProviderDomain } from "../../domain/provider.domain";
import { CreateProviderInput } from "../model/create-provider.input";

export class CreateProviderUseCase {
    constructor(
        @Inject(PROVIDER_INTERFACE) private readonly providerRepository: IProvider
    ) {}

    async execute(entry: CreateProviderInput): Promise<ProviderDomain> {
        const providerDomain = new ProviderDomain();
        providerDomain.strProviderName = entry.strProviderName;
        providerDomain.strProviderContact = entry.strProviderContact;
        providerDomain.strProviderEmail = entry.strProviderEmail;
        providerDomain.strProviderPhone = entry.strProviderPhone;
        providerDomain.strProviderAddress = entry.strProviderAddress;
        providerDomain.strProviderDescription = entry.strProviderDescription;
        providerDomain.strRuc = entry.strRuc;
        providerDomain.strProviderBusinessName = entry.strProviderBusinessName;
        return this.providerRepository.createProvider(providerDomain);
    }
}