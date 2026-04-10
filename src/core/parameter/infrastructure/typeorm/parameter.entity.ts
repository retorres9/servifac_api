import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Parameter {
    @PrimaryGeneratedColumn()
    prmId!: number;

    @Column({ nullable: false })
    prmName!: string;

    @Column({ nullable: false })
    prmNemonic!: string;

    @Column({ nullable: false })
    prmValue!: string;

    @Column({ nullable: false })
    prmDescription!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    prmCreatedAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    prmUpdatedAt!: Date;

    @Column({ default: true })
    prmIsActive!: boolean;
}