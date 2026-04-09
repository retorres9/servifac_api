import { Inject, OnApplicationBootstrap } from "@nestjs/common";

export class ParameterService implements OnApplicationBootstrap {
    private cache = new Map<string, string>();
    private lastChecked: Date | null = null;
    
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redisClient: RedisClientType
    ) {}

    async onApplicationBootstrap() {
        await this.refresh();
    }

    async refresh() {
        try{
            const sinc = await this.getLastChecked();
            const changed = await
        }
    }
}