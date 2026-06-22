import { TransactionContext } from "@common/domain/transaction.manager";
import { type IParameter, PARAMETER_INTERFACE } from "@core/parameter/domain/repository/parameter.interface";
import { type IPayment, PAYMENT_INTERFACE } from "@core/payment/domain/interfaces/payment.interface";
import { PaymentDomain } from "@core/payment/domain/paymet.domain";
import { type IPaymentType, PAYMENT_TYPE_INTERFACE } from "@core/paymentType/domain/interfaces/payment-type.interface";
import { BadRequestException, Inject } from "@nestjs/common";

export class CreatePaymentUseCase {
    constructor(
        @Inject(PAYMENT_INTERFACE) 
        private readonly paymentInterface: IPayment,
        @Inject(PARAMETER_INTERFACE)
        private readonly parameterInterface: IParameter,
        @Inject(PAYMENT_TYPE_INTERFACE) 
        private readonly paymentTypeInterface: IPaymentType
    ) {}

    async execute(input: PaymentDomain, ctx: TransactionContext): Promise<number> {
        const parameters = await this.parameterInterface.findParameterById(input.intPaymentStatus);
        if (!parameters) {
            throw new BadRequestException('Invalid payment status');
        }
        const paymentType = await this.paymentTypeInterface.getPaymentTypeById(input.intPaymentTypeId);
        if (!paymentType) {
            throw new BadRequestException('Invalid payment type');
        }
        const paymentId = await this.paymentInterface.createPayment(input, ctx);
        return paymentId.intPaymentId!;
    }
}