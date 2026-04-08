import { BadRequestException, Inject, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY } from "../../domain/repository/user.repository";
import type { UserRepository } from "../../domain/repository/user.repository";

export class ResetPasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(strEmail: string, newPassword: string): Promise<void> {
    const foundUser = await this.userRepository.findByUsername(strEmail);
    console.log('Found User:', foundUser);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    if (!foundUser.isAbleToChangePassword) {
      throw new BadRequestException('User is not allowed to change password');
    }
    if (foundUser.strTempPass) {
      throw new BadRequestException('User has a temporary password, cannot reset password');
    }
    await this.userRepository.resetPassword(foundUser, strEmail, newPassword);
  }
}