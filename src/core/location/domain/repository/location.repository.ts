import { Location } from '../location.entity';
export const LOCATION_REPOSITORY = Symbol('LOCATION_REPOSITORY');

export interface LocationRepository {
  createLocation(createLocationDto: Location): Promise<Location>;
  getLocations(): Promise<Location[]>;
  findByName(createLocationDto: Location): Promise<Location | null>;
}
