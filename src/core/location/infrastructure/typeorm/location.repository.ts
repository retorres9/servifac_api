import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { ILocation } from '../../domain/interfaces/location.interface';
import { LocationDomain } from '../../domain/location.domain';

export class LocationRepository implements ILocation {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>
  ) {}
  async getLocationById(locationId: number): Promise<LocationDomain | null> {
    const location = await this.locationRepository.findOne({
      where: { locId: locationId },
      relations: ['locFkWarehouseId', 'locFkUserCreate', 'locFkUserUpdate']
    });
    return location ? new LocationDomain(
      location.locName, 
      location.locDescription, 
      location.locFkWarehouseId.wrhId,
      location.locId,
      location.locFkWarehouseId.wrhName,
      location.locFkUserCreate.usrId,
      location.locCreatedAt,
      location.locFkUserUpdate.usrId,
      location.locUpdatedAt
    ) : null;
  }
  async createLocation(createLocationDto: LocationDomain): Promise<LocationDomain> {
    const newLocationEntity = this.locationRepository.create({
      locName: createLocationDto.strLocationName,
      locFkWarehouseId: {wrhId: createLocationDto.intWarehouse || 0},
    });
    const savedLocation = await this.locationRepository.save(newLocationEntity);
    return new LocationDomain(
      savedLocation.locName, 
      savedLocation.locDescription, 
      savedLocation.locFkWarehouseId.wrhId,
      savedLocation.locId,
      savedLocation.locFkWarehouseId.wrhName,
      savedLocation.locFkUserCreate.usrId,
      savedLocation.locCreatedAt,
      savedLocation.locFkUserUpdate.usrId,
      savedLocation.locUpdatedAt
    );
  }
  async getLocations(): Promise<LocationDomain[]> {
    const locations = await this.locationRepository.find();
    return locations.map(
      (location) => new LocationDomain(
        location.locName, 
        location.locDescription,
        location.locFkWarehouseId.wrhId,
        location.locId,
        location.locFkWarehouseId.wrhName,
        location.locFkUserCreate.usrId,
        location.locCreatedAt,
        location.locFkUserUpdate.usrId,
        location.locUpdatedAt
      )
    );
  }
  async findByName(name: string): Promise<LocationDomain | null> {
    const LocationFound = await this.locationRepository.findOne({
      where: { locName: name },
    });
    return LocationFound
      ? new LocationDomain(
          LocationFound.locName,
          LocationFound.locDescription,
          LocationFound.locFkWarehouseId.wrhId
        )
      : null;
  }
}
