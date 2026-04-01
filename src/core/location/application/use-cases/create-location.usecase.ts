import { BadRequestException, Inject } from '@nestjs/common';
import { LOCATION_REPOSITORY } from '../../domain/repository/location.repository';
import type { LocationRepository } from '../../domain/repository/location.repository';
import type { CreateLocationInput } from '../model/create-location.input';
import type { CreateLocationOutput } from '../model/create-location.output';

export class CreateLocationUseCase {
  constructor(
    @Inject(LOCATION_REPOSITORY)
    private readonly locationRepository: LocationRepository
  ) {}

  async execute(
    locationInput: CreateLocationInput
  ): Promise<CreateLocationOutput> {
    const existingLocation =
      await this.locationRepository.findByName(locationInput);
    if (existingLocation) {
      throw new BadRequestException({ message: 'Location already exists' });
    }

    const newLocation =
      await this.locationRepository.createLocation(locationInput);
    return newLocation;
  }
}
