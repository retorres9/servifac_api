import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { LocationEntity } from '../../typeorm/location.entity';
import { CategoryEntity } from 'src/core/categories/infrastructure/persistence/typeorm/category.entity';

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
  prod_wholesaleProfit: number;

  @Column({ default: true })
  prod_inStock: boolean;

  @Column({ type: 'int', default: 23 })
  prod_quantity: number;

  @Column({ type: 'smallint', default: 2 })
  prod_minQuantity: number;

  @Column({ type: 'boolean', default: true })
  prod_isTaxed: boolean;

  @ManyToMany(() => LocationEntity, (location) => location.products)
  locations: LocationEntity[];

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  categories: CategoryEntity[];
}
