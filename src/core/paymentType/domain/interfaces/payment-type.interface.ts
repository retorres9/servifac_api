import { PaymentTypeDomain } from "../payment-type.domain";

export const PAYMENT_TYPE_INTERFACE = Symbol("PAYMENT_TYPE_INTERFACE");
export interface IPaymentType {
    getPaymentTypeById(id: number): Promise<PaymentTypeDomain>;
}