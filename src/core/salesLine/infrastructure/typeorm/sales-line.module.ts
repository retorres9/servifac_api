import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SalesLine } from "./sales-line.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([SalesLine])
    ],
    controllers: [],
    providers: []
})
export class SalesLineModule {}