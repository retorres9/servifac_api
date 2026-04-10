import { Module } from "@nestjs/common";
import { ParameterController } from "./interface/controllers/parameter.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PARAMETER_REPOSITORY } from "./domain/repository/parameter.repository";
import { ParameterTypeOrmRepository } from "./infrastructure/typeorm/parameter.repository";
import { CreateParameterUseCase } from "./application/use-cases/create-parameter.usecase";
import { RedisModule } from "src/common/Redis/redis.module";
import { Parameter } from "./infrastructure/typeorm/parameter.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Parameter]),
        RedisModule
    ],
    controllers: [ParameterController],
    providers: [{
        provide: PARAMETER_REPOSITORY,
        useClass: ParameterTypeOrmRepository,
    },
    CreateParameterUseCase
]
})
export class ParameterModule {}