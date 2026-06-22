import { type IPaymentType, PAYMENT_TYPE_INTERFACE } from "@core/paymentType/domain/interfaces/payment-type.interface";
import { Inject } from "@nestjs/common";
import { PaymentTypeOutput } from "../models/payment-type.output";

export class GetPaymentTypeIdUseCase {
    constructor(
        @Inject(PAYMENT_TYPE_INTERFACE)
        private readonly paymentTypeInterface: IPaymentType
    ) {}

    async execute(id: number): Promise<PaymentTypeOutput> {
        const paymentType = await this.paymentTypeInterface.getPaymentTypeById(id);
        return {
            intId: paymentType.pytId,
            strName: paymentType.pytName,
            strCode: paymentType.pytCode,
            boolActive: paymentType.pytActive,
            boolIsCash: paymentType.pytIsCash,
            objConfig: paymentType.pytConfig,
            strDescription: paymentType.pytDescription,
            dtCreatedAt: paymentType.pytCreatedAt,
            dtUpdatedAt: paymentType.pytUpdatedAt,
        };
    }
}