import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "./provider.entity";
import { IProvider } from "../../domain/repository/provider.interface";
import { ProviderDomain } from "../../domain/provider.domain";
import { Repository } from "typeorm";

export class ProviderRepository implements IProvider {
    constructor(
        @InjectRepository(Provider)
        private readonly providerRepository: Repository<Provider>
    ) {}
    async createProvider(entry: ProviderDomain): Promise<ProviderDomain> {
        const newProvider = this.providerRepository.create({
            prvName: entry.strProviderName,
            prvDescription: entry.strProviderDescription,
            prvContact: entry.strProviderContact,
            prvEmail: entry.strProviderEmail,
            prvPhone: entry.strProviderPhone,
            prvActive: entry.boolProviderActive
        });
        return this.providerRepository.save(newProvider).then(savedProvider => ({
            intIdProvider: savedProvider.prvId,
            strProviderName: savedProvider.prvName,
            strProviderDescription: savedProvider.prvDescription ?? '',
            strProviderContact: savedProvider.prvContact ?? '',
            strProviderEmail: savedProvider.prvEmail ?? '',
            strProviderPhone: savedProvider.prvPhone ?? '',
            boolProviderActive: savedProvider.prvActive
        }));
    }
    async getProviderEntries(): Promise<ProviderDomain[]> {
        const providers = await this.providerRepository.find();
        return providers.map(provider => ({
            intIdProvider: provider.prvId,
            strProviderName: provider.prvName,
            strProviderDescription: provider.prvDescription ?? '',
            strProviderContact: provider.prvContact ?? '',
            strProviderEmail: provider.prvEmail ?? '',
            strProviderPhone: provider.prvPhone ?? '',
            boolProviderActive: provider.prvActive
        }));
    }
    async getProviderEntry(entry: ProviderDomain): Promise<ProviderDomain | null> {
        const foundProvider = await this.providerRepository.findOne({ where: { prvId: entry.intIdProvider } });
        if (!foundProvider) {
            return null;
        }
        return {
            intIdProvider: foundProvider.prvId,
            strProviderName: foundProvider.prvName,
            strProviderDescription: foundProvider.prvDescription ?? '',
            strProviderContact: foundProvider.prvContact ?? '',
            strProviderEmail: foundProvider.prvEmail ?? '',
            strProviderPhone: foundProvider.prvPhone ?? '',
            boolProviderActive: foundProvider.prvActive
        };

    }
    async updateProvider(entry: ProviderDomain): Promise<ProviderDomain | null> {
        const providerToUpdate = await this.providerRepository.findOne({ where: { prvId: entry.intIdProvider } });
        if (!providerToUpdate) {
            return null;
        }
        const updatedProvider = await this.providerRepository.save({
            ...providerToUpdate,
            prvName: entry.strProviderName,
            prvDescription: entry.strProviderDescription,
            prvContact: entry.strProviderContact,
            prvEmail: entry.strProviderEmail,
            prvPhone: entry.strProviderPhone,
            prvActive: entry.boolProviderActive
        });
        return {
            intIdProvider: updatedProvider.prvId,
            strProviderName: updatedProvider.prvName,
            strProviderDescription: updatedProvider.prvDescription ?? '',
            strProviderContact: updatedProvider.prvContact ?? '',
            strProviderEmail: updatedProvider.prvEmail ?? '',
            strProviderPhone: updatedProvider.prvPhone ?? '',
            boolProviderActive: updatedProvider.prvActive
        };

    }
}