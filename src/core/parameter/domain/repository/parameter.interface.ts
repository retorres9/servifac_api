import { DeepPartial } from "typeorm";
import { ParameterDomain } from "../parameter.domain";
export const PARAMETER_INTERFACE = Symbol('PARAMETER_INTERFACE');
export interface IParameter {
  createParameter(createParameterDto: DeepPartial<ParameterDomain>): Promise<ParameterDomain>;
  getParameters(): Promise<ParameterDomain[]>;
  findParameterById(id: number): Promise<ParameterDomain | null>;
  findParametersUpdated(since: Date): Promise<ParameterDomain[]>;
}