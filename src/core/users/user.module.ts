import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/typeorm/user.entity';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UserController } from './interface/controllers/user.controller';
import { USER_REPOSITORY } from './domain/repository/user.repository';
import { UserTypeormRepository } from './infrastructure/persistence/typeorm/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [{
    provide: USER_REPOSITORY,
    useClass: UserTypeormRepository,
  },
  CreateUserUseCase],
})
export class UserModule {}
