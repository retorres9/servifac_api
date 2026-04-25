import { Product } from "@core/product/infrastructure/persistence/typeorm/product.entity";
import { Provider } from "@core/provider/infrastructure/typeorm/provider.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductProvider {
    @PrimaryGeneratedColumn()
    prpId!: number;

    @ManyToOne(() => Product, (product) => product.productProviders)
    @JoinColumn({ name: 'pprFkProductId' })
    pprFkProductId!: Product;

    @ManyToOne(() => Provider, (provider) => provider.prvProductProviders)
    @JoinColumn({ name: 'pprFkProviderId' })
    pprFkProviderId!: Provider;

    @Column({type: 'varchar', nullable: true})
    pprSupplierSku!: string;

    @Column({type: 'money', nullable: false})
    pprCostPrice!: number;

    @Column({ type: 'numeric', nullable: true })
    pprLeadDays!: number;

    @Column({ type: 'boolean', nullable: true })
    pprIsActive!: boolean;
}