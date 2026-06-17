import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('audit_log')
export class AuditLog {
    @PrimaryGeneratedColumn()
    adlId!: number;

    @Column({ type: 'varchar', length: 255 })
    adlEntity!: string;

    @Column()
    adlEntityId!: number;

    @Column({ type: 'varchar', length: 255 })
    adlAction!: string;

    @Column({ type: 'jsonb', nullable: true })
    adlBefore!: Record<string, any>;

    @Column({ type: 'jsonb', nullable: true })
    adlAfter!: Record<string, any>;

    @Column({ type: 'jsonb', nullable: true })
    adlMetadata!: Record<string, any>;

    @CreateDateColumn()
    adlCreatedAt!: Date;
}