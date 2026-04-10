import Redis from "ioredis"

export const CreateRedisClient = () => {
    return new Redis(process.env.REDIS_URL || 'redis://localhost:9777');
}

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const RedisProvider = {
    provide: REDIS_CLIENT,
    useFactory: () => {
        return CreateRedisClient();
    }
}