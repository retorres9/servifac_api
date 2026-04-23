import { Sales } from "src/core/sales/infrastructure/typeorm/sales.entity";
import { Warehouse } from "src/core/warehouse/infrastructure/typeorm/warehouse.entity";
import { Column, Entity, Index, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Sales, (sales) => sales.salFkIdCustomer)
    cusFksales!: Sales[];

    @OneToOne(() => Warehouse, (warehouse) => warehouse.wrhId)
    cusFkWarehouse!: Warehouse;
}