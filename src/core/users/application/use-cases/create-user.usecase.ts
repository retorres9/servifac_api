import { BadRequestException, Inject } from '@nestjs/common';
import type { UserRepository } from '../../domain/repository/user.repository';
import { CreateUserInput } from '../model/create-user.input';
import { CreateUserOutput } from '../model/create-user.output';

export class CreateUserUseCase {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: UserRepository
  ) {}

  async execute(userInput: CreateUserInput): Promise<CreateUserOutput> {
    const existingUser = await this.userRepository.findByEmail(
      userInput.strEmail
    );
    if (existingUser) {
        throw new BadRequestException('User already exists');
    }
    const user = await this.userRepository.createUser({
      strCi: userInput.
      strFirstName: userInput.strFirstName,
      strLastName: userInput.strLastName,
      strEmail: userInput.strEmail,
      strPassword: userInput.strPassword,
      intIdRole: userInput.intIdRole,
      
    });
    return {
      intUserId: user.intUserId,
      strFirstName: user.strFirstName,
      strLastName: user.strLastName,
      strEmail: user.strEmail,
      intIdRole: user.intIdRole
    };
  }
}
