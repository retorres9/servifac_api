import { BadRequestException, Inject } from '@nestjs/common';
import { USER_INTERFACE, type IUser } from '../../domain/repository/user.interface';
import { CreateUserInput } from '../model/create-user.input';
import { CreateUserOutput } from '../model/create-user.output';
import { User } from '../../domain/user.domain';

export class CreateUserUseCase {
  constructor(
    @Inject(USER_INTERFACE)
    private readonly userRepository: IUser
  ) {}

  async execute(userInput: CreateUserInput): Promise<CreateUserOutput> {
    const existingUser = await this.userRepository.findByCi(userInput.strCi);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    const user = new User(
      userInput.strCi,
      userInput.strFirstName,
      userInput.strLastName,
      userInput.strPassword,
      userInput.intRole,
      userInput.strEmail,
      userInput.strPhone,
      userInput.strAddress,
      userInput.strCity
    );
    const userSaved = await this.userRepository.createUser({
      ...user,
    });
    if (!userSaved) {
      throw new BadRequestException('Failed to create user');
    }
    return {
      intUserId: userSaved.intUserId || 0,
      strFirstName: userSaved.strFirstName,
      strLastName: userSaved.strLastName,
      strEmail: userSaved.strEmail,
      intRole: userSaved.intRole,
      strCi: userSaved.strCi,
      strUsername: userSaved.strUsername,
      blIsActive: userSaved.blIsActive || false,
      dtCreatedAt: userSaved.dtCreatedAt || new Date(),
    };
  }
}
