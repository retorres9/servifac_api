import { DeepPartial } from "typeorm";
import { ParameterEntity } from "../parameter.entity";
export const PARAMETER_REPOSITORY = Symbol('PARAMETER_REPOSITORY');
export interface ParameterRepository {
  createParameter(createParameterDto: DeepPartial<ParameterEntity>): Promise<ParameterEntity>;
  getParameters(): Promise<ParameterEntity[]>;
  findParameter(createParameterDto: DeepPartial<ParameterEntity>): Promise<ParameterEntity | null>;
  findParametersUpdated(since: Date): Promise<ParameterEntity[]>;
}