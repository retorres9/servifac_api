import { Inject, Optional } from "@nestjs/common";
import { Parameter } from "./parameter.entity";
import { MoreThan, Repository } from "typeorm";
import { IParameter } from "../../domain/repository/parameter.interface";
import { ParameterDomain } from "../../domain/parameter.domain";
import { REDIS_CLIENT } from "src/common/Redis/redis.provider";
import { InjectRepository } from "@nestjs/typeorm";

export class ParameterTypeOrmRepository implements IParameter {
    constructor(
        @Inject(REDIS_CLIENT) @Optional()
        private readonly redisClient: any,
        @InjectRepository(Parameter)
        private readonly parameterRepository: Repository<Parameter>
    ) {}

    async findParametersUpdated(since: Date): Promise<ParameterDomain[]> {
        const parameters = await this.parameterRepository.findBy({prmUpdatedAt: MoreThan(since)});
        return parameters.map(param => new ParameterDomain(
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

    async createParameter(parameter: ParameterDomain): Promise<ParameterDomain> {
        const parameterEntity = this.parameterRepository.create({
            prmName: parameter.strName,
            prmNemonic: parameter.strNemonic,
            prmValue: parameter.strValue,
            prmDescription: parameter.strDescription,
            prmIsActive: parameter.blIsActive
        });
        const savedParameter = await this.parameterRepository.save(parameterEntity);
        if (this.redisClient) await this.redisClient.publish('parameters:updated', JSON.stringify({ prmNemonic: savedParameter.prmNemonic, prmValue: savedParameter.prmValue }));
        return new ParameterDomain(
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
    async getParameters(): Promise<ParameterDomain[]> {
        throw new Error("Method not implemented.");
    }
    async findParameterById(id: number): Promise<ParameterDomain | null> {
        const parameter = await this.parameterRepository.findOne({ where: { prmId: id } });
        if (!parameter) {
            return null;
        }
        return new ParameterDomain(
            parameter.prmId,
            parameter.prmName,
            parameter.prmNemonic,
            parameter.prmValue,
            parameter.prmDescription,
            parameter.prmCreatedAt,
            parameter.prmUpdatedAt,
            parameter.prmIsActive
        );
    }


}