import Redis from "ioredis"

export const CreateRedisClient = () => {
    new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
}

export const REDIS_CLIENT = 'REDIS_CLIENT';

export const RedisProvider = {
    provide: REDIS_CLIENT,
    useFactory: () => {
        return CreateRedisClient();
    }
}