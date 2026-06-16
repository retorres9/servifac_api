import { ProviderDomain } from "../provider.domain";
import { SearchProviderDomain } from "../search-provider.domain";

export const PROVIDER_INTERFACE = Symbol('PROVIDER_INTERFACE');
export interface IProvider {
    createProvider(entry: ProviderDomain): Promise<ProviderDomain>;
    getProviderEntries(searchProviderInput: SearchProviderDomain): Promise<ProviderDomain[]>;
    getProviderEntry(entry: ProviderDomain): Promise<ProviderDomain | null>;
    updateProvider(entry: ProviderDomain): Promise<ProviderDomain | null>;
    deleteProvider(id: string): Promise<void>;
}