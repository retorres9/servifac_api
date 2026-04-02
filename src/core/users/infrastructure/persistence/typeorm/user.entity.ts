import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryColumn()
    usr_id!: number;

    @Column({ unique: true, nullable: false })
    usr_ci!: string;

    @Column({ unique: true, nullable: false })
    usr_username!: string;

    @Column({ nullable: false })
    usr_firstName!: string;

    @Column({ nullable: false })
    usr_lastName!: string;

    @Column({ unique: true, nullable: false })
    usr_email!: string;

    @Column({ nullable: false })
    usr_phone!: string;

    @Column({ nullable: false })
    usr_password!: string;

    @Column({ type: 'int', nullable: false })
    usr_role!: number;

    @Column({ default: true })
    usr_isActive!: boolean;

    @Column({ nullable: false })
    usr_address!: string;

    @Column({ nullable: false })
    usr_city!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    usr_createdAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    usr_updatedAt!: Date;

    @Column({ type: 'timestamp', nullable: true })
    usr_lastLogin!: Date | null;

    @Column({ nullable: true })
    usr_tempPass!: string | null;

    @Column({ default: false })
    usr_isAbleToChangePassword!: boolean;

    @Column({ type: 'int', default: 0 })
    usr_loginAttempts!: number;
    
};
