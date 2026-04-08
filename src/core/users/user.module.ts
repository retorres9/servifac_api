import { Module, Res } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/persistence/typeorm/user.entity';
import { CreateUserUseCase } from './application/use-cases/create-user.usecase';
import { UserController } from './interface/controllers/user.controller';
import { USER_REPOSITORY } from './domain/repository/user.repository';
import { UserTypeormRepository } from './infrastructure/persistence/typeorm/user.repository';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { JwtModule } from '@nestjs/jwt';
import { ResetPasswordUseCase } from './application/use-cases/reset-password.usecase';
import { RestorePasswordUseCase } from './application/use-cases/restore-password.usecase';

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
  ResetPasswordUseCase,
  RestorePasswordUseCase
    ],
})
export class UserModule {}
