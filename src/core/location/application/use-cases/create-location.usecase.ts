import { BadRequestException, Inject } from '@nestjs/common';
import { LOCATION_INTERFACE } from '../../domain/repository/location.interface';
import type { ILocation } from '../../domain/repository/location.interface';
import type { CreateLocationInput } from '../model/create-location.input';
import type { CreateLocationOutput } from '../model/create-location.output';

export class CreateLocationUseCase {
  constructor(
    @Inject(LOCATION_INTERFACE)
    private readonly locationRepository: ILocation
  ) {}

  async execute(
    locationInput: CreateLocationInput
  ): Promise<CreateLocationOutput> {
    const existingLocation =
      await this.locationRepository.findByName(locationInput.strLocationName);
    if (existingLocation) {
      throw new BadRequestException({ message: 'Location already exists' });
    }

    const newLocation =
      await this.locationRepository.createLocation(locationInput);
    return newLocation;
  }
}
