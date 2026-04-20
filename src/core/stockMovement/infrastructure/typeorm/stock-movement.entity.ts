import { Parameter } from "src/core/parameter/infrastructure/typeorm/parameter.entity";
import { StockMovementLine } from "src/core/stockMovementLine/infrastructure/typeorm/stock-movementLine.entity";
import { UserEntity } from "src/core/users/infrastructure/persistence/typeorm/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StockMovement {
    @PrimaryGeneratedColumn()
    stmId!: number;

    @ManyToOne(() => Parameter, { eager: true })
    stmMovementType!: Parameter;

    @Column({ type: 'varchar', nullable: true })
    stmReferenceId!: string;

    @Column({ nullable: true})
    stmNote?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    stmCreatedAt!: Date;

    @ManyToOne(() => UserEntity, { eager: true })
    stmCreatedBy!: UserEntity;

    @OneToMany(() => StockMovementLine, (line) => line.smlFkMovementId, { cascade: true, eager: true })
    stmLines!: StockMovementLine[];
}