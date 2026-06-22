import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "./infrastructure/typeorm/provider.entity";
import { ProviderController } from "./interface/controllers/provider.controller";
import { ProviderRepository } from "./infrastructure/typeorm/provider.repository";
import { PROVIDER_INTERFACE } from "./domain/repository/provider.interface";
import { CreateProviderUseCase } from "./application/use-cases/create-provider.usecase";
import { RedisModule } from "@common/Redis/redis.module";
import { SearchProvidersUseCase } from "./application/use-cases/search-providers.usecase";
import { DeleteProviderUseCase } from "./application/use-cases/delete-provider.usecase";

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
        SearchProvidersUseCase,
        DeleteProviderUseCase
    ]
})
export class ProviderModule {}