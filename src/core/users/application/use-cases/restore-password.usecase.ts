import { Inject, NotFoundException } from "@nestjs/common";
import { USER_INTERFACE } from "../../domain/repository/user.interface";
import type { IUser } from "../../domain/repository/user.interface";
import { RestorePasswordInput } from "../model/restorePassword/restore-password.input";

export class RestorePasswordUseCase {
  constructor(
    @Inject(USER_INTERFACE)
    private readonly userRepository: IUser
  ) {}

  async execute(restore: RestorePasswordInput): Promise<void> {
    const foundUser = await this.userRepository.findByUsername(restore.strEmail);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    
  }
}