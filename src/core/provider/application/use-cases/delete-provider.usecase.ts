import { type IProvider, PROVIDER_INTERFACE } from "@core/provider/domain/repository/provider.interface";
import { Inject } from "@nestjs/common";

export class DeleteProviderUseCase {
    constructor(
        @Inject(PROVIDER_INTERFACE) 
        private readonly providerRepository: IProvider
    ) {}

    async execute(id: string): Promise<any> {
        await this.providerRepository.deleteProvider(id);
    }
}