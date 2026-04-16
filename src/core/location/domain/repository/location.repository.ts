import { LocationDomain } from '../location.entity';
export const LOCATION_REPOSITORY = Symbol('LOCATION_REPOSITORY');

export interface LocationRepository {
  createLocation(createLocationDto: LocationDomain): Promise<LocationDomain>;
  getLocations(): Promise<LocationDomain[]>;
  findByName(createLocationDto: LocationDomain): Promise<LocationDomain | null>;
}
