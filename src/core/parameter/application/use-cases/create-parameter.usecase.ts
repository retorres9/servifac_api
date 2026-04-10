import { BadRequestException, Inject } from "@nestjs/common";
import { PARAMETER_REPOSITORY } from "../../domain/repository/parameter.repository";
import type { ParameterRepository } from "../../domain/repository/parameter.repository";
import { CreateParameterInput } from "../model/create-parameter.input";

export class CreateParameterUseCase {
  constructor(
    @Inject(PARAMETER_REPOSITORY)
    private readonly parameterRepository: ParameterRepository
  ) {
    
  }
  async execute(createParameterInput: CreateParameterInput): Promise<void> {
    const parameter = await this.parameterRepository.findParameter(createParameterInput);
    if (parameter) {
      throw new BadRequestException('Parameter already exists');
    }
    await this.parameterRepository.createParameter(createParameterInput);
  }
}