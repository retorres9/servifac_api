import { Category } from "@core/categories/infrastructure/persistence/typeorm/category.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    usrId!: number;

    @Column({ unique: true, nullable: false })
    usrCi!: string;

    @Column({ unique: true, nullable: false })
    usrUsername!: string;

    @Column({ nullable: false })
    usrFirstName!: string;

    @Column({ nullable: false })
    usrLastName!: string;

    @Column({ unique: true, nullable: false })
    usrEmail!: string;

    @Column({ nullable: false })
    usrPhone!: string;

    @Column({ nullable: false })
    usrPassword!: string;

    @Column({ type: 'int', nullable: false })
    usrRole!: number;

    @Column({ default: true })
    usrIsActive!: boolean;

    @Column({ nullable: false })
    usrAddress!: string;

    @Column({ nullable: false })
    usrCity!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    usrCreatedAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    usrUpdatedAt!: Date;

    @Column({ type: 'timestamp', nullable: true })
    usrLastLogin!: Date | null;

    @Column({ type: 'varchar', nullable: true })
    usrTempPass!: string | null;

    @Column({ default: false })
    usrIsAbleToChangePassword!: boolean;

    @Column({ type: 'int', default: 0 })
    usrLoginAttempts!: number;
    
    @OneToMany(() => Category, (category) => category.catCreatedBy)
    categories!: Category[];
};
