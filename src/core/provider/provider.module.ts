import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "./infrastructure/typeorm/provider.entity";
import { ProviderController } from "./interface/controllers/provider.controller";
import { ProviderRepository } from "./infrastructure/typeorm/provider.repository";
import { PROVIDER_INTERFACE } from "./domain/repository/provider.interface";
import { CreateProviderUseCase } from "./application/use-cases/create-provider.usecase";
import { RedisModule } from "@common/Redis/redis.module";
import { SearchProvidersUseCase } from "./application/use-cases/search-providers.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([Provider]),
        RedisModule
    ],
    controllers: [ProviderController],
    providers: [
        {
            provide: PROVIDER_INTERFACE,
            useClass: ProviderRepository
        },
        CreateProviderUseCase,
        SearchProvidersUseCase
    ]
})
export class ProviderModule {}