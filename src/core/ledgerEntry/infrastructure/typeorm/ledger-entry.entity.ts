import { Parameter } from "@core/parameter/infrastructure/typeorm/parameter.entity";
import { User } from "@core/users/infrastructure/persistence/typeorm/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('ledger_entry')
export class LedgerEntry {
    @PrimaryGeneratedColumn()
    ldgId!: number;

    @Column({ type: 'date'})
    ldgEntryDate!: Date;

    @ManyToOne(() => Parameter)
    @JoinColumn({ name: 'ldg_fk_account_code' })
    ldgFkAccountCode!: Parameter;

    @Column({ type: 'text'})
    ldgDescription!: string;

    @Column({ type: 'money', default: 0 })
    ldgDebit!: number;

    @Column({ type: 'money', default: 0 })
    ldgCredit!: number;

    @Column({ type: 'jsonb', nullable: true })
    ldgMetadata!: Record<string, any>;

    @CreateDateColumn()
    ldgCreatedAt!: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'ldg_fk_user' })
    ldgFkUser!: User;
}