import { Module } from "@nestjs/common";
import { PaymentType } from "./infrastructure/typeorm/payment-type.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PAYMENT_TYPE_INTERFACE } from "./domain/interfaces/payment-type.interface";
import { PaymentRepository } from "./infrastructure/typeorm/payment-type.repository";
import { GetPaymentTypeIdUseCase } from "./application/usecases/get-payment-type-id.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([PaymentType]),
    ],
    providers: [
        { provide: PAYMENT_TYPE_INTERFACE, useClass: PaymentRepository },
        GetPaymentTypeIdUseCase,
    ],
    
})

export class PaymentTypeModule {}