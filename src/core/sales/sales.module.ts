import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sales } from "./infrastructure/typeorm/sales.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sales])
    ],
    controllers: [],
    providers: []
})
export class SalesModule {}