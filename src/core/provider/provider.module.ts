import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "./infrastructure/typeorm/provider.entity";
import { ProviderController } from "./interface/controllers/provider.controller";
import { ProviderRepository } from "./infrastructure/typeorm/provider.repository";
import { PROVIDER_INTERFACE } from "./domain/repository/provider.interface";
import { CreateProviderUseCase } from "./application/use-cases/create-provider.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([Provider])
    ],
    controllers: [ProviderController],
    providers: [
        {
            provide: PROVIDER_INTERFACE,
            useClass: ProviderRepository
        },
        CreateProviderUseCase
    ]
})
export class ProviderModule {}