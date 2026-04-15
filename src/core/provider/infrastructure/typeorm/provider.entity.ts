import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Provider {
    @PrimaryGeneratedColumn()
    prvId!: number;

    @Column({ type: 'varchar', nullable: false })
    @Index({ unique: true })
    prvRuc!: string;

    @Column({ type: 'varchar', nullable: true })
    prvBusinessName?: string;

    @Column({ type: 'varchar', nullable: false })
    prvName!: string;

    @Column({ type: 'varchar', nullable: true })
    prvDescription?: string;

    @Column({ type: 'varchar', nullable: true })
    prvContact?: string;

    @Column({ type: 'varchar', nullable: true })
    prvEmail?: string;

    @Column({ type: 'varchar', nullable: true })
    prvPhone?: string;

    @Column({ type: 'boolean', default: true })
    prvActive!: boolean;
}