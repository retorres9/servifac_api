import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

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
}