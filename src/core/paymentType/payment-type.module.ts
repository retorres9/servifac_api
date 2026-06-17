import { Module } from "@nestjs/common";
import { PaymentType } from "./infrastructure/typeorm/payment-type.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentType]),
    ],
    
})

export class PaymentTypeModule {}