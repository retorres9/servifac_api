import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Provider } from "./infrastructure/typeorrm/provider.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Provider])
    ],
    controllers: [],
    providers: []
})
export class ProviderModule {}