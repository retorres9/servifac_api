import { CategoryEntity } from 'src/core/categories/infrastructure/persistence/typeorm/category.entity';
import { LocationEntity } from 'src/core/location/infrastructure/typeorm/location.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductEntity {
  @PrimaryColumn({ unique: true, type: 'varchar' })
  prod_code: string;

  @Column({ unique: true, nullable: false })
  prod_name: string;

  @Column({ type: 'decimal', precision: 7, scale: 3, default: 23.2 })
  prod_price: number;

  @Column({ type: 'decimal', precision: 7, scale: 3 })
  prod_normalProfit: number;

  @Column({ type: 'decimal', precision: 7, scale: 3, default: 23.2 })
  prod_wholesaleProfit: number | undefined;

  @Column({ default: true })
  prod_inStock: boolean;

  @Column({ type: 'int', default: 23 })
  prod_quantity: number;

  @Column({ type: 'smallint', default: 2 })
  prod_minQuantity: number;

  @Column({ type: 'boolean', default: true })
  prod_isTaxed: boolean;

  //@OneToMany(
  //  (type) => WarehouseStock,
  //  (warehouseStock) => warehouseStock.products
  //)
  //warehouseStock?: WarehouseStock[];

  @ManyToOne(() => CategoryEntity, (categories) => categories.cat_id, {
    eager: true,
  })
  category: CategoryEntity;

  @ManyToOne(() => LocationEntity, (location) => location.loc_id, {
    eager: true,
  })
  location: LocationEntity;

  //@OneToMany((type) => SaleDetail, (saleDetail) => saleDetail.product)
  //saleDetail: SaleDetail;

  //@OneToMany(
  //  (type) => ProductProvider,
  //  (productProvider) => productProvider.ppr_product
  //)
  //ppr_provider: Product;
}
