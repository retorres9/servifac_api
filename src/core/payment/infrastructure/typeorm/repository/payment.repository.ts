import { IPayment } from "@core/payment/domain/interfaces/payment.interface";
import { PaymentDomain } from "@core/payment/domain/paymet.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../payment.entity";
import { EntityManager, Repository } from "typeorm";
import { DomainError } from "@common/domain/error.domain";
import { TransactionContext } from "@common/domain/transaction.manager";

export class PaymentRepository implements IPayment {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>
    ) {}

    async createPayment(input: PaymentDomain, manager: TransactionContext): Promise<PaymentDomain> {        
        const repo = manager ? (manager as EntityManager).getRepository(Payment) : this.paymentRepository;
        try{
            const payment = repo.create({
            pymAmount: input.dcmAmount,
            pymCurrency: 'USD',
            pymReference: input.strReference,
            pymFkIdSale: { salId: input.intIdSale } as any,
            pymFkIdPaymentType: { pytId: 1 } as any, // Assuming a default payment type, this should be dynamic based on input
            pymFkStatus: { prmId: input.intPaymentStatus } as any,
            pymCreatedAt: input.dtePaymentDate,
        });
        await repo.save(payment);
        return input;
        } catch (error) {
            console.error('Error creating payment:', error);
            throw new DomainError('PAYMENT_CREATION_FAILED', 'Failed to create payment', error);
        }
    }
}