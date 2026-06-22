import { IPaymentType } from "@core/paymentType/domain/interfaces/payment-type.interface";
import { PaymentTypeDomain } from "@core/paymentType/domain/payment-type.domain";
import { InjectRepository } from "@nestjs/typeorm";
import { PaymentType } from "./payment-type.entity";
import { Repository } from "typeorm";

export class PaymentRepository implements IPaymentType {
    constructor(
        @InjectRepository(PaymentType)
        private readonly paymentTypeRepository: Repository<PaymentType>
    ) {}

    async getPaymentTypeById(id: number): Promise<PaymentTypeDomain> {
        const paymentType = await this.paymentTypeRepository.findOne({ where: { pytId: id } });
        if (!paymentType) {
            throw new Error(`Payment type with ID ${id} not found`);
        }
        return new PaymentTypeDomain(
            paymentType.pytId, 
            paymentType.pytName, 
            paymentType.pytCode, 
            paymentType.pytActive, 
            paymentType.pytIsCash, 
            paymentType.pytConfig, 
            paymentType.pytDescription, 
            paymentType.pytCreatedAt, 
            paymentType.pytUpdatedAt);
    }
}