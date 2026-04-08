import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserUseCase } from "../../application/use-cases/create-user.usecase";
import { CreateUserDto } from "../dto/create-user.dto";
import { LoginUseCase } from "../../application/use-cases/login.usecase";
import { LoginDto } from "../dto/login.dto";
import { ResetPasswordUseCase } from "../../application/use-cases/reset-password.usecase";
import { ResetPasswordDto } from "../dto/reset-password.dto";
import { RestorePasswordDto } from "../dto/restore-password.dto";
import { RestorePasswordUseCase } from "../../application/use-cases/restore-password.usecase";

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly loginUseCase: LoginUseCase,
        private readonly resetPasswordUseCase: ResetPasswordUseCase,
        private readonly restorePasswordUseCase: RestorePasswordUseCase
    ) {}

    @Post('signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.createUserUseCase.execute(createUserDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto) {
        return this.loginUseCase.execute(loginDto);
    }

    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.resetPasswordUseCase.execute(resetPasswordDto.strEmail, resetPasswordDto.strNewPassword);
    }

    @Post('restore-password')
    restorePassword(@Body() restorePasswordDto: RestorePasswordDto) {
        return this.restorePasswordUseCase.execute(restorePasswordDto);
    }
}