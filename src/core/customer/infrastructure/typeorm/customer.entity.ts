import { Sales } from "src/core/sales/infrastructure/typeorm/sales.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'varchar', nullable: true })
    cusEmail?: string;

    @Column({ type: 'varchar', nullable: true })
    cusPhone?: string;

    @OneToMany(() => Sales, (sales) => sales.salFkIdCustomer)
    sales!: Sales[];
}