import { ProductEntity } from "src/core/product/infrastructure/persistence/typeorm/product.entity";
import { Provider } from "src/core/provider/infrastructure/typeorrm/provider.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductProvider {
    @PrimaryGeneratedColumn()
    prpId!: number;

    @OneToMany(() => ProductEntity, (product) => product.prodId)
    @JoinColumn({ name: 'pprFkProductId' })
    pprFkProductId!: ProductEntity[];

    @OneToMany(() => Provider, (provider) => provider.prvId)
    @JoinColumn({ name: 'pprFkProviderId' })
    pprFkProviderId!: Provider[];

    @Column({type: 'varchar', nullable: true})
    pprSupplierSku!: string;

    @Column({type: 'money', nullable: false})
    pprCostPrice!: number;

    @Column({ type: 'numeric', nullable: true })
    pprLeadDays!: number;
}