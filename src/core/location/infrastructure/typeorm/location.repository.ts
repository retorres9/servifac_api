import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { ILocation } from '../../domain/interfaces/location.interface';
import { LocationDomain } from '../../domain/location.domain';
import { GetLocationDomain } from '@core/location/domain/getLocation.domain';
import { Warehouse } from '@core/warehouse/infrastructure/typeorm/warehouse.entity';
import { BadRequestException } from '@nestjs/common';
import { User } from '@core/users/infrastructure/persistence/typeorm/user.entity';
import { UpdateLocationDto } from '@core/location/interface/dto/update-location.dto';

export class LocationRepository implements ILocation {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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
      locDescription: createLocationDto.strLocationDescription,
      locFkUserCreate: {usrId: createLocationDto.intUserCreate || 0},
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
  async getLocations(getLocationDomain: GetLocationDomain): Promise<LocationDomain[]> {
    const { intPage = 1, intLimit = 10, strSearchTerm, dtFromDate, dtToDate, strSortBy = 'locId', strSortOrder = 'ASC' } = getLocationDomain;
    const qb = this.locationRepository.createQueryBuilder('location')
      .leftJoinAndSelect('location.locFkWarehouseId', 'warehouse')
      .leftJoinAndSelect('location.locFkUserCreate', 'userCreate')
      .leftJoinAndSelect('location.locFkUserUpdate', 'userUpdate');
    if (strSearchTerm) {
      qb.andWhere('locations.locName ILIKE :strSearchTerm OR locations.locDescription ILIKE :strSearchTerm', {strSearchTerm});
    }

    if (dtFromDate) qb.andWhere('locations.locCreatedAt >= :dtFromDate', { dtFromDate });
    if (dtToDate) qb.andWhere('locations.locCreatedAt <= :dtToDate', { dtToDate });

    const validSortFields = ['locId', 'locName', 'locCreatedAt', 'locUpdatedAt'];
    const sortBy = validSortFields.includes(strSortBy) ? strSortBy : 'locId';

    qb.orderBy(`location.${sortBy}`, strSortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC')
      .skip((intPage - 1) * intLimit)
      .take(intLimit);
      

    const [locations, count] = await qb.getManyAndCount();
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
        location.locUpdatedAt,
        count
      )
    );
  }
  async findByName(name: string): Promise<LocationDomain | null> {
    const locationFound = await this.locationRepository.findOne({
      where: { locName: name },
      relations: ['locFkWarehouseId', 'locFkUserCreate', 'locFkUserUpdate']
    });
    console.log('LocationFound:', locationFound);
    return locationFound
      ? new LocationDomain(
          locationFound.locName,
          locationFound.locDescription,
          locationFound.locFkWarehouseId.wrhId
        )
      : null;
  }

  async updateLocation(updateLocationDto: UpdateLocationDto): Promise<void> {
    const locationEntity = await this.locationRepository.findOne({ where: { locId: updateLocationDto.intLocationId } });
    if (!locationEntity) {
      throw new BadRequestException(`Location with ID ${updateLocationDto.intLocationId} not found`);
    }
    const userUpdateId = await this.userRepository.findOne({ where: { usrId: updateLocationDto.intUserUpdate || 0 } });
    if (!userUpdateId) {
      throw new BadRequestException(`User with ID ${updateLocationDto.intUserUpdate} not found`);
    }
    const warehouse = await this.warehouseRepository.findOne({ where: { wrhId: updateLocationDto.intWarehouse } });
    if (!warehouse) {
      throw new BadRequestException(`Warehouse with ID ${updateLocationDto.intWarehouse} not found`);
    }
    locationEntity.locName = updateLocationDto.strLocationName;
    locationEntity.locDescription = updateLocationDto.strLocationDescription;
    locationEntity.locUpdatedAt = new Date();
    locationEntity.locFkWarehouseId = { wrhId: warehouse ? warehouse.wrhId : 0 } as Warehouse;
    locationEntity.locFkUserUpdate = { usrId: userUpdateId ? userUpdateId.usrId : 0 } as User;
    await this.locationRepository.save(locationEntity);
  }
}
