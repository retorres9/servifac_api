import { LocationDomain } from '../location.domain';
import { GetLocationDomain } from '../getLocation.domain';
export const LOCATION_INTERFACE = Symbol('LOCATION_INTERFACE');

export interface ILocation {
  createLocation(createLocation: LocationDomain): Promise<LocationDomain>;
  getLocations(getLocationInput: GetLocationDomain): Promise<LocationDomain[]>;
  findByName(name: string): Promise<LocationDomain | null>;
  getLocationById(locationId: number): Promise<LocationDomain | null>;
  updateLocation(location: LocationDomain): Promise<void>;
}
