import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/use-cases/create-user.usecase";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUseCase } from "../../application/use-cases/login.usecase";
import { LoginDto } from "../dto/login.dto";

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loginUseCase: LoginUseCase
    ) {}

    @Post('new')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.loginUseCase.execute(loginDto);
    }
}