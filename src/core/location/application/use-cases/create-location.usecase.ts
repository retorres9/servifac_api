import { BadRequestException, Inject } from '@nestjs/common';
import { LOCATION_INTERFACE } from '../../domain/interfaces/location.interface';
import type { ILocation } from '../../domain/interfaces/location.interface';
import type { CreateLocationInput } from '../model/create-location.input';

export class CreateLocationUseCase {
  constructor(
    @Inject(LOCATION_INTERFACE)
    private readonly locationRepository: ILocation
  ) {}

  async execute(
    locationInput: CreateLocationInput
  ): Promise<void> {
    const existingLocation =
      await this.locationRepository.findByName(locationInput.strLocationName);
    if (existingLocation) {
      throw new BadRequestException({ message: 'Location already exists' });
    }    
    await this.locationRepository.createLocation(locationInput);
  }
}
