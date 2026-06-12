import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Location } from './location.entity';
import { ILocation } from '../../domain/interfaces/location.interface';
import { LocationDomain } from '../../domain/location.domain';
import { GetLocationDomain } from '@core/location/domain/getLocation.domain';
import { Warehouse } from '@core/warehouse/infrastructure/typeorm/warehouse.entity';
import { BadRequestException, Inject } from '@nestjs/common';
import { User } from '@core/users/infrastructure/persistence/typeorm/user.entity';
import { REDIS_CLIENT } from '@common/Redis/redis.provider';
import { Redis } from 'ioredis';

export class LocationRepository implements ILocation {
  constructor(
    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis
  ) {}  
  async getLocationById(locationId: number): Promise<LocationDomain | null> {
    const redisKey = `location:getLocationById:${locationId}`;
    try{
      const cachedLocation = await this.redisClient.get(redisKey);
      if (cachedLocation) {
        const parsedLocation = JSON.parse(cachedLocation);
        return parsedLocation;
      }
    } catch (error) {
      console.error('Error fetching location from Redis:', error);
    }
    const location = await this.locationRepository.findOne({
      where: { locId: locationId },
      relations: ['locFkWarehouseId', 'locFkUserCreate', 'locFkUserUpdate']
    });

    const locationDomain = location ? new LocationDomain(
      location.locName, 
      location.locDescription, 
      location.locFkWarehouseId.wrhId,
      location.locId,
      location.locFkWarehouseId.wrhName,
      location.locFkUserCreate.usrId,
      location.locCreatedAt,
      location.locFkUserUpdate.usrId,
      location.locUpdatedAt,
      location.locIsActive
    ) : null;
    if (locationDomain) {
      try {
        await this.redisClient.set(redisKey, JSON.stringify(locationDomain), 'EX', 3600);
      } catch (error) {
        console.error('Error caching location in Redis:', error);
      }
    }
    return locationDomain;
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
    const redisKey = `locations:getLocations:${intPage}:${intLimit}:${strSearchTerm || ''}:${dtFromDate?.toISOString() || ''}:${dtToDate?.toISOString() || ''}:${strSortBy}:${strSortOrder}`;
    try {
      const cachedLocations = await this.redisClient.get(redisKey);
      if (cachedLocations) {
        const parsedLocations = JSON.parse(cachedLocations);
        return parsedLocations;
      }
    } catch (error) {
      console.error('Error retrieving locations from Redis:', error);
    }
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
    const locationDomain = locations.map(
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
        location.locIsActive,
        count
      )
    );
    try {
      await this.redisClient.set(redisKey, JSON.stringify(locationDomain), 'EX', 3600);
    } catch (error) {
      console.error('Error caching locations in Redis:', error);
    }
    return locationDomain;
  }

  async findByName(name: string): Promise<LocationDomain | null> {
    const redisKey = `location:findByName:${name}`;
    try {
      const cachedLocation = await this.redisClient.get(redisKey);
      if (cachedLocation) {
        const parsedLocation = JSON.parse(cachedLocation);
        return parsedLocation;
      }
    } catch (error) {
      console.error('Error retrieving location from Redis:', error);
    }
    const locationFound = await this.locationRepository.findOne({
      where: { locName: name },
      relations: ['locFkWarehouseId', 'locFkUserCreate', 'locFkUserUpdate']
    });
    
    const locationDomain = locationFound
      ? new LocationDomain(
          locationFound.locName,
          locationFound.locDescription,
          locationFound.locFkWarehouseId.wrhId,
          locationFound.locId,
          locationFound.locFkWarehouseId.wrhName,
          locationFound.locFkUserCreate.usrId,
          locationFound.locCreatedAt,
          locationFound.locFkUserUpdate.usrId,
          locationFound.locUpdatedAt,
          locationFound.locIsActive          
        )
      : null;
    try {
      await this.redisClient.set(redisKey, JSON.stringify(locationDomain), 'EX', 3600);
    } catch (error) {
      console.error('Error caching location in Redis:', error);
    }
    return locationDomain;
    
    }

  async updateLocation(intIdLocation: number, updateLocationDto: LocationDomain): Promise<void> {
    const locationEntity = await this.locationRepository.findOne({ where: { locId: intIdLocation } });
    if (!locationEntity) {
      throw new BadRequestException(`Location with ID ${intIdLocation} not found`);
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
    locationEntity.locIsActive = updateLocationDto.boolIsActive ?? true;
    await this.locationRepository.save(locationEntity);
  }
}
