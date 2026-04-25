import { Parameter } from "@core/parameter/infrastructure/typeorm/parameter.entity";
import { StockMovementLine } from "@core/stockMovementLine/infrastructure/typeorm/stock-movementLine.entity";
import { User } from "@core/users/infrastructure/persistence/typeorm/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class StockMovement {
    @PrimaryGeneratedColumn()
    stmId!: number;

    @ManyToOne(() => Parameter, (parameter) => parameter.prmId, { eager: true })
    stmMovementType?: Parameter;

    @Column({ type: 'varchar', nullable: true })
    stmReferenceId!: string;

    @Column({ nullable: true})
    stmNote!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    stmCreatedAt!: Date;

    @ManyToOne(() => User, (user) => user.usrId, { eager: true })
    stmCreatedBy!: User;

    @OneToMany(() => StockMovementLine, (line) => line.smlFkMovementId, { cascade: true, eager: true })
    stmLines!: StockMovementLine[];
}