import { Body, Controller, Post } from '@nestjs/common';
import { CreateLocationDto } from '../../dto/create-location.dto';
import { CreateLocationUseCase } from 'src/core/location/application/use-cases/create-location.usecase';

@Controller('location')
export class LocationController {
  constructor(private readonly createLocationUseCase: CreateLocationUseCase) { }

  @Post('new')
  createLocation(@Body() createLocationDto: CreateLocationDto) {
    return this.createLocationUseCase.execute(createLocationDto);
  }
}
