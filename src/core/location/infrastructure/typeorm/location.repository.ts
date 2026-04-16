import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from './location.entity';
import { LocationRepository } from '../../domain/repository/location.repository';
import { LocationDomain } from '../../domain/location.entity';

export class LocationTypeormRepository implements LocationRepository {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>
  ) {}
  async createLocation(createLocationDto: LocationDomain): Promise<LocationDomain> {
    const newLocationEntity = this.locationRepository.create({
      locName: createLocationDto.strLocationName,
    });
    const savedLocation = await this.locationRepository.save(newLocationEntity);
    return new LocationDomain(savedLocation.locId, savedLocation.locName);
  }
  async getLocations(): Promise<LocationDomain[]> {
    const locations = await this.locationRepository.find();
    return locations.map(
      (location) => new LocationDomain(location.locId, location.locName)
    );
  }
  async findByName(createLocationDto: LocationDomain): Promise<LocationDomain | null> {
    const name = createLocationDto.strLocationName;
    const LocationFound = await this.locationRepository.findOne({
      where: { locName: name },
    });
    return LocationFound
      ? new LocationDomain(LocationFound.locId, LocationFound.locName)
      : null;
  }
}
