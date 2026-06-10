import { Module } from '@nestjs/common';
import { LocationController } from './interface/presentation/http/location.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './infrastructure/typeorm/location.entity';
import { LOCATION_INTERFACE } from './domain/interfaces/location.interface';
import { LocationRepository } from './infrastructure/typeorm/location.repository';
import { CreateLocationUseCase } from './application/use-cases/create-location.usecase';
import { GetLocationsUseCase } from './application/use-cases/get-locations.usecase';
import { Warehouse } from '@core/warehouse/infrastructure/typeorm/warehouse.entity';
import { User } from '@core/users/infrastructure/persistence/typeorm/user.entity';
import { UpdateLocationsUseCase } from './application/use-cases/update-locations.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Location]), TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Warehouse])],
  controllers: [LocationController],
  providers: [
    { provide: LOCATION_INTERFACE, useClass: LocationRepository },
    CreateLocationUseCase,
    GetLocationsUseCase,
    UpdateLocationsUseCase
  ],
  exports: [LOCATION_INTERFACE],
})
export class LocationModule {}
