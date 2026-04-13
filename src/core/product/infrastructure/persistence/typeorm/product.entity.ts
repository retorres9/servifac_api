import { CategoryEntity } from 'src/core/categories/infrastructure/persistence/typeorm/category.entity';
import { LocationEntity } from 'src/core/location/infrastructure/typeorm/location.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryColumn({ unique: true, type: 'varchar' })
  prod_code!: string;

  @Column({ unique: true, nullable: false })
  prod_name!: string;

  @Column({ type: 'boolean', default: true })
  prod_isTaxed!: boolean;

  @Column({ type: 'smallint' })
  prod_typeOfTax!: number;

  // @ManyToOne(
  //  () => Warehouse,
  //  (warehouse) => warehouse.product
  // )
  // warehouseStock?: Warehouse;

  @ManyToOne(() => CategoryEntity, (categories) => categories.cat_id, {
    eager: true,
  })
  category!: CategoryEntity;

  @ManyToOne(() => LocationEntity, (location) => location.loc_id, {
    eager: true,
  })
  location!: LocationEntity;

  //@OneToMany((type) => SaleDetail, (saleDetail) => saleDetail.product)
  //saleDetail: SaleDetail;

  //@OneToMany(
  //  (type) => ProductProvider,
  //  (productProvider) => productProvider.ppr_product
  //)
  //ppr_provider: Product;
}
