export interface CreateParameterUseCase {
  execute(input: CreateParameterInput): Promise<CreateParameterOutput>;
}