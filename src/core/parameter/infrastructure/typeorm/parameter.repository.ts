import { Inject, Optional } from "@nestjs/common";
import { Parameter } from "./parameter.entity";
import { MoreThan, Repository } from "typeorm";
import { ParameterRepository } from "../../domain/repository/parameter.repository";
import { ParameterEntity } from "../../domain/parameter.entity";
import { REDIS_CLIENT } from "src/common/Redis/redis.provider";
import { InjectRepository } from "@nestjs/typeorm";

export class ParameterTypeOrmRepository implements ParameterRepository {
    constructor(
        @Inject(REDIS_CLIENT) @Optional()
        private readonly redisClient: any,
        @InjectRepository(Parameter)
        private readonly parameterRepository: Repository<Parameter>
    ) {}

    async findParametersUpdated(since: Date): Promise<ParameterEntity[]> {
        const parameters = await this.parameterRepository.findBy({prmUpdatedAt: MoreThan(since)});
        return parameters.map(param => new ParameterEntity(
            param.prmId,
            param.prmName,
            param.prmNemonic,
            param.prmValue,
            param.prmDescription,
            param.prmCreatedAt,
            param.prmUpdatedAt,
            param.prmIsActive
        ));
    }

    async createParameter(parameter: ParameterEntity): Promise<ParameterEntity> {
        const parameterEntity = this.parameterRepository.create({
            prmName: parameter.strName,
            prmNemonic: parameter.strNemonic,
            prmValue: parameter.strValue,
            prmDescription: parameter.strDescription,
            prmIsActive: parameter.blIsActive
        });
        const savedParameter = await this.parameterRepository.save(parameterEntity);
        if (this.redisClient) await this.redisClient.publish('parameters:updated', JSON.stringify({ prmNemonic: savedParameter.prmNemonic, prmValue: savedParameter.prmValue }));
        return new ParameterEntity(
            savedParameter.prmId,
            savedParameter.prmName,
            savedParameter.prmNemonic,
            savedParameter.prmValue,
            savedParameter.prmDescription,
            savedParameter.prmCreatedAt,
            savedParameter.prmUpdatedAt,
            savedParameter.prmIsActive
        )
        
    }
    async getParameters(): Promise<ParameterEntity[]> {
        throw new Error("Method not implemented.");
    }
    async findParameter(createParameterDto:ParameterEntity): Promise<ParameterEntity | null> {
        throw new Error("Method not implemented.");
    }


}