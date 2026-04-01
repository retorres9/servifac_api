import { Module } from '@nestjs/common';
import { LocationController } from './interface/presentation/http/location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationEntity } from './infrastructure/typeorm/location.entity';
import { LOCATION_REPOSITORY } from './domain/repository/location.repository';
import { LocationTypeormRepository } from './infrastructure/typeorm/location.repository';
import { CreateLocationUseCase } from './application/use-cases/create-location.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([LocationEntity])],
  controllers: [LocationController],
  providers: [
    { provide: LOCATION_REPOSITORY, useClass: LocationTypeormRepository },
    CreateLocationUseCase,
  ],
})
export class LocationModule {}
