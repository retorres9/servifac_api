import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateLocationDto } from '../../dto/create-location.dto';
import { CreateLocationUseCase } from '@core/location/application/use-cases/create-location.usecase';

@Controller('location')
export class LocationController {
  constructor(private readonly createLocationUseCase: CreateLocationUseCase) { }

  @Post('new')
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.createLocationUseCase.execute(createLocationDto);
  }

  @Patch('update')
  updateLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.createLocationUseCase.execute(createLocationDto);
  }

  @Post('find')
  findLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.createLocationUseCase.execute(createLocationDto);
  }
}
