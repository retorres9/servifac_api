import { ProductProvider } from "@core/productProvider/infrastructure/typeorm/product-provider.entity";
import { User } from "@core/users/infrastructure/persistence/typeorm/user.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'varchar', nullable: true })
    prvAddress?: string;

    @Column({ type: 'boolean', default: true })
    prvActive!: boolean;

    @OneToMany(() => ProductProvider, (productProvider) => productProvider.pprFkProviderId)
    prvProductProviders!: ProductProvider[];

    @OneToMany(() => User, (user) => user.usrId)
    prvUsers!: User[];
}