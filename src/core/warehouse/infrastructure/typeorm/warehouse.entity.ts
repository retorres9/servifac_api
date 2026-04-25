import { Parameter } from "@core/parameter/infrastructure/typeorm/parameter.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    wrhId!: number;

    @Column({ nullable: false })
    @Index({ unique: true })
    wrhName!: string;

    @Column({ nullable: false })
    wrhDescription!: string;

    @ManyToOne(() => Parameter, { eager: true })
    @JoinColumn({ name: 'wrhFkTypeOfWarehouse' })
    wrhFkTypeOfWarehouse!: Parameter;

    @Column({ nullable: false })
    wrhAddress!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    wrhCreatedAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    wrhUpdatedAt!: Date;

    @Column({ type: 'boolean', default: true })
    wrhIsActive!: boolean;
}