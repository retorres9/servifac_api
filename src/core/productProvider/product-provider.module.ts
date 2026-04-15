import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductProvider } from "./infrastructure/typeorm/product-provider.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductProvider])
    ],
    controllers: [],
    providers: []
})
export class ProductProviderModule {}