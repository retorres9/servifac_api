import { InjectRepository } from "@nestjs/typeorm";
import { Provider } from "./provider.entity";
import { IProvider } from "../../domain/repository/provider.interface";
import { ProviderDomain } from "../../domain/provider.domain";
import { Repository } from "typeorm";
import { SearchProviderDomain } from "@core/provider/domain/search-provider.domain";
import { Inject } from "@nestjs/common";
import { REDIS_CLIENT } from "@common/Redis/redis.provider";
import Redis from "ioredis";

export class ProviderRepository implements IProvider {
    constructor(
        @InjectRepository(Provider)
        private readonly providerRepository: Repository<Provider>,
        @Inject(REDIS_CLIENT)
        private readonly redisClient: Redis
    ) {}
    async createProvider(entry: ProviderDomain): Promise<ProviderDomain> {
        const newProvider = this.providerRepository.create({
            prvName: entry.strProviderName,
            prvDescription: entry.strProviderDescription,
            prvRuc: entry.strRuc,
            prvBusinessName: entry.strProviderBusinessName,
            prvAddress: entry.strProviderAddress,
            prvContact: entry.strProviderContact,
            prvEmail: entry.strProviderEmail,
            prvPhone: entry.strProviderPhone,
            prvActive: entry.boolProviderActive
        });
        return this.providerRepository.save(newProvider).then(savedProvider => ({
            strRuc: savedProvider.prvRuc,
            intIdProvider: savedProvider.prvId,
            strProviderName: savedProvider.prvName,
            strProviderDescription: savedProvider.prvDescription ?? '',
            strProviderContact: savedProvider.prvContact ?? '',
            strProviderEmail: savedProvider.prvEmail ?? '',
            strProviderPhone: savedProvider.prvPhone ?? '',
            boolProviderActive: savedProvider.prvActive,
            strProviderBusinessName: savedProvider.prvBusinessName ?? '',
            strProviderAddress: savedProvider.prvAddress ?? ''
        }));
    }
    async getProviderEntries(searchProviderInput: SearchProviderDomain): Promise<ProviderDomain[]> {
        const { intPage = 1, intLimit = 10, strSearchTerm = '', dtFromDate, dtToDate, strSortBy = 'prvId', strSortOrder = 'ASC' } = searchProviderInput;
        const redisKey = `providers:search:${intPage}:${intLimit}:${strSearchTerm}:${dtFromDate?.toISOString()}:${dtToDate?.toISOString()}:${strSortBy}:${strSortOrder}`;
        try {
            const cachedResult = await this.redisClient.get(redisKey);
            if (cachedResult) {
                return JSON.parse(cachedResult);
            }
        } catch (error) {
            console.error('Error fetching from Redis:', error);
        }

        const queryBuilder = this.providerRepository.createQueryBuilder('provider');

        if (strSearchTerm) {
            queryBuilder.where('provider.prvName ILIKE :searchTerm OR provider.prvDescription ILIKE :searchTerm', { searchTerm: `%${strSearchTerm}%` });
        }
        if (dtFromDate) {
            queryBuilder.andWhere('provider.createdAt >= :fromDate', { fromDate: dtFromDate });
        }
        if (dtToDate) {
            queryBuilder.andWhere('provider.createdAt <= :toDate', { toDate: dtToDate });
        }
        queryBuilder.orderBy(`provider.${strSortBy}`, strSortOrder);
        queryBuilder.skip((intPage - 1) * intLimit).take(intLimit);        

        const [providers, total] = await queryBuilder.getManyAndCount();
        try {
            await this.redisClient.set(redisKey, JSON.stringify({ providers, total }), 'EX', 60);
        } catch (error) {
            console.error('Error setting Redis cache:', error);
        }
        return providers.map(provider => ({
            intIdProvider: provider.prvId,
            strProviderName: provider.prvName,
            strProviderDescription: provider.prvDescription ?? '',
            strProviderContact: provider.prvContact ?? '',
            strProviderEmail: provider.prvEmail ?? '',
            strProviderPhone: provider.prvPhone ?? '',
            boolProviderActive: provider.prvActive,
            strProviderBusinessName: provider.prvBusinessName ?? '',
            strProviderAddress: provider.prvAddress ?? '',
            strRuc: provider.prvRuc
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
            boolProviderActive: foundProvider.prvActive,
            strProviderBusinessName: foundProvider.prvBusinessName ?? '',
            strProviderAddress: foundProvider.prvAddress ?? '',
            strRuc: foundProvider.prvRuc
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
            prvActive: entry.boolProviderActive,
            prvBusinessName: entry.strProviderBusinessName,
            prvAddress: entry.strProviderAddress,
            prvRuc: entry.strRuc
        });
        return {
            intIdProvider: updatedProvider.prvId,
            strProviderName: updatedProvider.prvName,
            strProviderDescription: updatedProvider.prvDescription ?? '',
            strProviderContact: updatedProvider.prvContact ?? '',
            strProviderEmail: updatedProvider.prvEmail ?? '',
            strProviderPhone: updatedProvider.prvPhone ?? '',
            boolProviderActive: updatedProvider.prvActive,
            strProviderBusinessName: updatedProvider.prvBusinessName ?? '',
            strProviderAddress: updatedProvider.prvAddress ?? '',
            strRuc: updatedProvider.prvRuc
        };

    }
}