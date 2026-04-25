import { Category } from '@core/categories/infrastructure/persistence/typeorm/category.entity';
import { ProductProvider } from '@core/productProvider/infrastructure/typeorm/product-provider.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {

  @PrimaryGeneratedColumn()
  prodId!: number;

  @Column({ unique: true, type: 'varchar' })
  prodBarcode!: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  prodCode!: string;

  @Column({ unique: true, nullable: false })
  prodName!: string;

  @Column({ type: 'boolean', default: true })
  prodIsTaxed!: boolean;

  @Column({ type: 'smallint' })
  prodTypeOfTax!: number;

  @ManyToOne(() => Category, (categories) => categories.products, {
    eager: true,
  })
  category!: Category;

  @OneToMany(() => ProductProvider, (productProvider) => productProvider.pprFkProductId)
  productProviders!: ProductProvider[];
}
