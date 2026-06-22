import { Module } from "@nestjs/common";
import { Payment } from "./infrastructure/typeorm/payment.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParameterModule } from "@core/parameter/parameter.module";
import { PaymentTypeModule } from "@core/paymentType/payment-type.module";
import { PAYMENT_INTERFACE } from "./domain/interfaces/payment.interface";
import { PaymentRepository } from "./infrastructure/typeorm/repository/payment.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment]),
        ParameterModule,
        PaymentTypeModule,
    ],
    providers: [
        { provide: PAYMENT_INTERFACE, useClass: PaymentRepository }
    ],
    exports: [PAYMENT_INTERFACE]
})

export class PaymentModule {}