import { TransactionContext } from "@common/domain/transaction.manager";
import { PaymentDomain } from "../paymet.domain";
export const PAYMENT_INTERFACE = Symbol("PAYMENT_INTERFACE");
export interface IPayment {
    createPayment(input: PaymentDomain, manager: TransactionContext): Promise<PaymentDomain>;
}