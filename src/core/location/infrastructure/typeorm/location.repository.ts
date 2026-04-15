import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LocationEntity } from './location.entity';
import { LocationRepository } from '../../domain/repository/location.repository';
import { Location } from '../../domain/location.entity';

export class LocationTypeormRepository implements LocationRepository {
  constructor(
    @InjectRepository(LocationEntity)
    private readonly locationRepository: Repository<LocationEntity>
  ) {}
  async createLocation(createLocationDto: Location): Promise<Location> {
    const newLocationEntity = this.locationRepository.create({
      locName: createLocationDto.strLocationName,
    });
    const savedLocation = await this.locationRepository.save(newLocationEntity);
    return new Location(savedLocation.locId, savedLocation.locName);
  }
  async getLocations(): Promise<Location[]> {
    const locations = await this.locationRepository.find();
    return locations.map(
      (location) => new Location(location.locId, location.locName)
    );
  }
  async findByName(createLocationDto: Location): Promise<Location | null> {
    const name = createLocationDto.strLocationName;
    const LocationFound = await this.locationRepository.findOne({
      where: { locName: name },
    });
    return LocationFound
      ? new Location(LocationFound.locId, LocationFound.locName)
      : null;
  }
}
