import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/use-cases/create-user.usecase";
import { CreateUserDto } from "../dto/create-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) {}

    @Post('new')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }
}