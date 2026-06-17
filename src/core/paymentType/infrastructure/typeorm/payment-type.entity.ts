import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('payment_type')
export class PaymentType {
    @PrimaryGeneratedColumn()
    pytId!: number;

    @Column({ type: 'varchar', length: 255 })
    pytName!: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    pytCode!: string;

    @Column({ default: true })
    pytActive!: boolean;

    @Column({ default: true })
    pytIsCash!: boolean;

    @Column({ type: 'jsonb', nullable: true })
    pytConfig!: Record<string, any>;

    @Column({ type: 'varchar', length: 255 })
    pytDescription!: string;

    @CreateDateColumn()
    pytCreatedAt!: Date;

    @UpdateDateColumn()
    pytUpdatedAt!: Date;
}