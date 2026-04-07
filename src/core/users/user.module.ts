import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/typeorm/user.entity';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UserController } from './interface/controllers/user.controller';
import { USER_REPOSITORY } from './domain/repository/user.repository';
import { UserTypeormRepository } from './infrastructure/persistence/typeorm/user.repository';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'your_jwt_secret_key', // Cambia esto por una clave secreta segura
      signOptions: { expiresIn: '1h' }, // Opcional: configura la expiración del token
    }),
  ],
  controllers: [UserController],
  providers: [{
    provide: USER_REPOSITORY,
    useClass: UserTypeormRepository,
  },
  CreateUserUseCase,
  LoginUseCase,
    ],
})
export class UserModule {}
