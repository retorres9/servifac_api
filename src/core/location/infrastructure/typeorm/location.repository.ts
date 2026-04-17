import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { ILocation } from '../../domain/repository/location.interface';
import { LocationDomain } from '../../domain/location.domain';

export class LocationRepository implements ILocation {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ) {}
  getLocationById(locationId: number): Promise<LocationDomain | null> {
    const location = this.locationRepository.findOne({
      where: { locId: locationId },
    });
    return location.then(loc => loc ? new LocationDomain(loc.locId, loc.locName, loc.locFkWarehouseId.wrhId) : null);
  }
  async createLocation(createLocationDto: LocationDomain): Promise<LocationDomain> {
    const newLocationEntity = this.locationRepository.create({
      locName: createLocationDto.strLocationName,
      locFkWarehouseId: {wrhId: createLocationDto.intWarehouse || 0},
    });
    const savedLocation = await this.locationRepository.save(newLocationEntity);
    return new LocationDomain(savedLocation.locId, savedLocation.locName, createLocationDto.intWarehouse);
  }
  async getLocations(): Promise<LocationDomain[]> {
    const locations = await this.locationRepository.find();
    return locations.map(
      (location) => new LocationDomain(
        location.locId, 
        location.locName, 
        location.locFkWarehouseId.wrhId)
      );
  }
  async findByName(name: string): Promise<LocationDomain | null> {
    const LocationFound = await this.locationRepository.findOne({
      where: { locName: name },
    });
    return LocationFound
      ? new LocationDomain(LocationFound.locId, LocationFound.locName, LocationFound.locFkWarehouseId.wrhId)
      : null;
  }
}
