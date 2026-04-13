import { DeepPartial } from "typeorm";
import { ParameterEntity } from "../parameter.entity";
export const PARAMETER_REPOSITORY = Symbol('PARAMETER_REPOSITORY');
export interface IParameterRepository {
  createParameter(createParameterDto: DeepPartial<ParameterEntity>): Promise<ParameterEntity>;
  getParameters(): Promise<ParameterEntity[]>;
  findParameterById(id: number): Promise<ParameterEntity | null>;
  findParametersUpdated(since: Date): Promise<ParameterEntity[]>;
}