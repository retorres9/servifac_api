import { ProviderDomain } from "../provider.domain";

export const PROVIDER_REPOSITORY = Symbol('PROVIDER_REPOSITORY');
export interface IProviderInterface {
    createProvider(entry: ProviderDomain): Promise<ProviderDomain>;
    getProviderEntries(): Promise<ProviderDomain[]>;
    getProviderEntry(entry: ProviderDomain): Promise<ProviderDomain | null>;
    updateProvider(entry: ProviderDomain): Promise<ProviderDomain | null>;
}