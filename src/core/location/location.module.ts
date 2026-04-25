import { Module } from '@nestjs/common';
import { LocationController } from './interface/presentation/http/location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './infrastructure/typeorm/location.entity';
import { LOCATION_INTERFACE } from './domain/interfaces/location.interface';
import { LocationRepository } from './infrastructure/typeorm/location.repository';
import { CreateLocationUseCase } from './application/use-cases/create-location.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  controllers: [LocationController],
  providers: [
    { provide: LOCATION_INTERFACE, useClass: LocationRepository },
    CreateLocationUseCase,
  ],
  exports: [LOCATION_INTERFACE],
})
export class LocationModule {}
