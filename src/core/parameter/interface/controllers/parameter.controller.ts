import { Body, Controller, Post } from "@nestjs/common";
import { CreateParameterUseCase } from "../../application/use-cases/create-parameter.usecase";
import { CreateParameterDto } from "../dto/create-parameter.dto";

@Controller('parameters')
export class ParameterController {
    constructor(
        private readonly createParameterUseCase: CreateParameterUseCase
    ) {}

    @Post('new')
    async createParameter(@Body() createParameterDto: CreateParameterDto) {
        await this.createParameterUseCase.execute(createParameterDto);
    }
}