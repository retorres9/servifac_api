import { LocationDomain } from '../location.domain';
export const LOCATION_INTERFACE = Symbol('LOCATION_INTERFACE');

export interface ILocation {
  createLocation(createLocationDto: LocationDomain): Promise<LocationDomain>;
  getLocations(): Promise<LocationDomain[]>;
  findByName(createLocationDto: LocationDomain): Promise<LocationDomain | null>;
}
