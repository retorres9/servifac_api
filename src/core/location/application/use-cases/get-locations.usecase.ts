import { type ILocation, LOCATION_INTERFACE } from "@core/location/domain/interfaces/location.interface";
import { GetLocationsDto } from "@core/location/interface/dto/getLocations.dto";
import { Inject } from "@nestjs/common";
import { GetLocationOutput } from "../model/getLocation.output";
import { LocationDomain } from "@core/location/domain/location.domain";

export class GetLocationsUseCase {
  constructor(
    @Inject(LOCATION_INTERFACE)
    private readonly locationRepository: ILocation
  ) {}
    
  async execute(getLocationsDto: GetLocationsDto): Promise<LocationDomain[]> {
    return this.locationRepository.getLocations(getLocationsDto);
  }
}