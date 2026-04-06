import { Inject, UnauthorizedException } from "@nestjs/common";
import { LoginInput } from "../model/login/login.input";
import { LoginOutput } from "../model/login/login.output";
import { USER_REPOSITORY } from "../../domain/repository/user.repository";
import type { UserRepository } from "../../domain/repository/user.repository";
import { JwtService } from "@nestjs/jwt";

export class LoginUseCase {
    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly jwtService: JwtService
    ) {}
    async execute(input: LoginInput): Promise<LoginOutput> {
        const { strEmail, strPassword } = input;
        const user = await this.userRepository.login(strEmail, strPassword);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        
        return {
            strToken: this.jwtService.sign({ sub: user.intUserId, username: user.strUsername }),
            user: {
                strCi: user.strCi,
                strFirstName: user.strFirstName,
                strLastName: user.strLastName,
                strUsername: user.strUsername,
                strEmail: user.strEmail,
                strPhone: user.strPhone,
                strAddress: user.strAddress,
                strCity: user.strCity,
                intRole: user.intRole,
            },
        };
    }
}