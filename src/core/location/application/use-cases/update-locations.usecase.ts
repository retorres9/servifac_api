import { type ILocation, LOCATION_INTERFACE } from "@core/location/domain/interfaces/location.interface";
import { UpdateLocationDto } from "@core/location/interface/dto/update-location.dto";
import { Inject } from "@nestjs/common";

export class UpdateLocationsUseCase {
    constructor(
    @Inject(LOCATION_INTERFACE)
    private readonly locationRepository: ILocation
    ) {}

    async execute(intIdLocation: number, updateLocationDto: UpdateLocationDto): Promise<void> {
        await this.locationRepository.updateLocation(intIdLocation, updateLocationDto);
    }
}