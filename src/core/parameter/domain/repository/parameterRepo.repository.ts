export interface ParameterRepository {
  createParameter(createParameterDto: Parameter): Promise<Parameter>;
  getParameters(): Promise<Parameter[]>;
  findByName(createParameterDto: Parameter): Promise<Parameter | null>;
}