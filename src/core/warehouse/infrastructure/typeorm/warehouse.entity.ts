import { Parameter } from "src/core/parameter/infrastructure/typeorm/parameter.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    wrhId!: number;

    @Column({ nullable: false })
    wrhName!: string;

    @Column({ nullable: false })
    wrhDescription!: string;

    @ManyToOne(() => Parameter, { eager: true })
    wrhTypeOfWarehouse!: Parameter;

    @Column({ nullable: false })
    wrhAddress!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    wrhCreatedAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    wrhUpdatedAt!: Date;

    @Column({ type: 'boolean', default: true })
    wrhIsActive!: boolean;
}