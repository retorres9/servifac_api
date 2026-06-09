import { Sales } from "@core/sales/infrastructure/typeorm/sales.entity";
import { User } from "@core/users/infrastructure/persistence/typeorm/user.entity";
import { Warehouse } from "@core/warehouse/infrastructure/typeorm/warehouse.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    cusId!: number;

    @Column({ type: 'varchar', nullable: false })
    cusFirstName!: string;

    @Column({ type: 'varchar', nullable: false })
    cusLastName!: string;

    @Column({ type: 'varchar', nullable: false })
    @Index()
    cusCi!: string;

    @Column({ type: 'varchar' })
    cusEmail!: string;

    @Column({ type: 'varchar' })
    cusPhone!: string;

    @Column({ type: 'varchar' })
    cusAddress!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    cusCreatedAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    cusUpdatedAt!: Date;

    @OneToMany(() => Sales, (sales) => sales.salFkIdCustomer)
    cusFksales!: Sales[];

    @ManyToOne(() => User, (user) => user.customers)
    @JoinColumn({ name: 'cusFkUser' })
    cusFkUser!: User;

    @ManyToOne(() => Warehouse, (warehouse) => warehouse.wrhId)
    @JoinColumn({ name: 'cusFkWarehouse' })
    cusFkWarehouse!: Warehouse;
}