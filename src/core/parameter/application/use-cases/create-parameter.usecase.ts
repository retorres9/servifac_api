import { BadRequestException, Inject } from "@nestjs/common";
import { PARAMETER_REPOSITORY } from "../../domain/repository/parameter.repository";
import type { IParameterRepository } from "../../domain/repository/parameter.repository";
import { CreateParameterInput } from "../model/create-parameter.input";

export class CreateParameterUseCase {
  constructor(
    @Inject(PARAMETER_REPOSITORY)
    private readonly parameterRepository: IParameterRepository
  ) {
    
  }
  async execute(createParameterInput: CreateParameterInput): Promise<void> {
    //! TODO - Implementar validación para evitar crear parámetros con el mismo ID o nombre, dependiendo de la lógica de negocio.
    const parameter = await this.parameterRepository.findParameterById(1);
    if (parameter) {
      throw new BadRequestException('Parameter already exists');
    }
    await this.parameterRepository.createParameter(createParameterInput);
  }
}