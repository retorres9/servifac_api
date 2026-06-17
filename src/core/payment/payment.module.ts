import { Module } from "@nestjs/common";
import { Payment } from "./infrastructure/typeorm/payment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment]),
    ],
})

export class PaymentModule {}