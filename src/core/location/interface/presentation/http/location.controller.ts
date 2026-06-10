import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateLocationDto } from '../../dto/create-location.dto';
import { CreateLocationUseCase } from '@core/location/application/use-cases/create-location.usecase';
import { GetLocationsDto } from '../../dto/getLocations.dto';
import { GetLocationsUseCase } from '@core/location/application/use-cases/get-locations.usecase';
import { UpdateLocationsUseCase } from '@core/location/application/use-cases/update-locations.usecase';
import { UpdateLocationDto } from '../../dto/update-location.dto';

@Controller('location')
export class LocationController {
  constructor(
    private readonly createLocationUseCase: CreateLocationUseCase,
    private readonly getLocationsUseCase: GetLocationsUseCase,
    private readonly updateLocationUseCase: UpdateLocationsUseCase
  ) { }

  @Post('new')
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.createLocationUseCase.execute(createLocationDto);
  }

  @Patch('update')
  updateLocation(@Body() updateLocationDto: UpdateLocationDto) {
    return this.updateLocationUseCase.execute(updateLocationDto);
  }

  @Post('find')
  findLocation(@Body() getLocationDto: GetLocationsDto) {
    return this.getLocationsUseCase.execute(getLocationDto);
  }
}
