import { LocationDomain } from '../location.domain';
export const LOCATION_INTERFACE = Symbol('LOCATION_INTERFACE');

export interface ILocation {
  createLocation(createLocation: LocationDomain): Promise<LocationDomain>;
  getLocations(): Promise<LocationDomain[]>;
  findByName(name: string): Promise<LocationDomain | null>;
  getLocationById(locationId: number): Promise<LocationDomain | null>;
}
