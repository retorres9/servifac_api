import { Inject, NotFoundException } from "@nestjs/common";
import { USER_REPOSITORY } from "../../domain/repository/user.repository";
import type { UserRepository } from "../../domain/repository/user.repository";
import { RestorePasswordInput } from "../model/restorePassword/restore-password.input";

export class RestorePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository
  ) {}

  async execute(restore: RestorePasswordInput): Promise<void> {
    const foundUser = await this.userRepository.findByUsername(restore.strEmail);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    
  }
}