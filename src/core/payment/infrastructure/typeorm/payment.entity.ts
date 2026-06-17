import { Parameter } from "@core/parameter/infrastructure/typeorm/parameter.entity";
import { PaymentType } from "@core/paymentType/infrastructure/typeorm/payment-type.entity";
import { Sales } from "@core/sales/infrastructure/typeorm/sales.entity";
import { User } from "@core/users/infrastructure/persistence/typeorm/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('payment')
export class Payment {
    @PrimaryGeneratedColumn()
    pymId!: number;

    @ManyToOne(() => Sales)
    @JoinColumn({ name: 'pym_fk_id_sale' })
    pymFkIdSale!: Sales;

    @ManyToOne(() => PaymentType)
    @JoinColumn({ name: 'pym_fk_id_payment_type' })
    pymFkIdPaymentType!: PaymentType;

    @Column({ type: 'money' })
    pymAmount!: number;

    @Column({length: 3, default: 'USD'})
    pymCurrency!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    pymReference!: string;

    @ManyToOne(() => Parameter)
    @JoinColumn({ name: 'pym_fk_id_parameter' })
    pymFkStatus!: Parameter;

    @CreateDateColumn()
    pymCreatedAt!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'pym_fk_id_user' })
    pymFkIdUser!: User;
}