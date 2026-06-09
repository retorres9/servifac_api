import { LocationDomain } from '../location.domain';
import { GetLocationDomain } from '../getLocation.domain';
import { GetLocationOutput } from '@core/location/application/model/getLocation.output';
export const LOCATION_INTERFACE = Symbol('LOCATION_INTERFACE');

export interface ILocation {
  createLocation(createLocation: LocationDomain): Promise<LocationDomain>;
  getLocations(getLocationInput: GetLocationDomain): Promise<LocationDomain[]>;
  findByName(name: string): Promise<LocationDomain | null>;
  getLocationById(locationId: number): Promise<LocationDomain | null>;
}
