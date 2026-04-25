import { Inject, OnApplicationBootstrap } from "@nestjs/common";
import Redis from "ioredis";
import { PARAMETER_INTERFACE } from "@core/parameter/domain/repository/parameter.interface";
import type { IParameter } from "@core/parameter/domain/repository/parameter.interface";

export class ParameterService implements OnApplicationBootstrap {
    private readonly cache = new Map<string, string>();
    private lastChecked: Date | null = null;
    private subscriber?: Redis;
    private refreserTimer?: NodeJS.Timeout;
    
    constructor(
        @Inject('REDIS_CLIENT')
        private readonly redisClient: Redis,
        @Inject(PARAMETER_INTERFACE)
        private readonly parameterRepository: IParameter
    ) {}

    async onApplicationBootstrap() {
        this.subscriber = this.redisClient.duplicate();
        if (this.subscriber) {
            await this.subscriber.connect();
            await this.subscriber.subscribe('params:changed', (message) => {
                try {
                    if (this.refreserTimer) clearTimeout(this.refreserTimer);
                    this.refreserTimer = setTimeout(() => this.refresh(), 100);
                } catch (err) {
                    console.error('Error handling parameter change message:', err);
                }
            });
        }
        await this.refresh();
    }

    async refresh() {
        try{
            const since = await this.getLastChecked();
            const changed = await this.parameterRepository.findParametersUpdated(since);
            if (!changed) {
                return;
            }
            for (const param of changed as any) {
                this.cache.set(param.strNemonic, param.strValue);
            }
            const now = new Date();
            await this.setLastChecked(now);
        } catch (error) {
            console.error('Error refreshing parameters:', error);
        }

    }

    private async getLastChecked(): Promise<Date> {
        if (this.redisClient) {
            const lastCheckedStr = await this.redisClient.get('parameters:lastChecked');
            return lastCheckedStr ? new Date(lastCheckedStr) : new Date(0);
        }
        return this.lastChecked || new Date(0);
    }

    private async setLastChecked(date: Date): Promise<void> {
        if (this.redisClient) {
            await this.redisClient.set('parameters:lastChecked', date.toISOString());
        }
        this.lastChecked = date;
    }

    async onModuleDestroy(): Promise<void> {
        if (this.redisClient) await this.redisClient.quit();
    }
}