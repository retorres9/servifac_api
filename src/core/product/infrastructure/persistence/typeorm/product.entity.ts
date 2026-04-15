import { CategoryEntity } from 'src/core/categories/infrastructure/persistence/typeorm/category.entity';
import { LocationEntity } from 'src/core/location/infrastructure/typeorm/location.entity';
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class ProductEntity {

  @PrimaryColumn()
  prodId!: number;

  @Column({ unique: true, type: 'varchar' })
  prodBarcode!: string;

  @Column({ unique: true, type: 'varchar', nullable: false })
  prodCode!: string;

  @Column({ unique: true, nullable: false })
  prod_name!: string;

  @Column({ type: 'boolean', default: true })
  prod_isTaxed!: boolean;

  @Column({ type: 'smallint' })
  prod_typeOfTax!: number;

  @ManyToOne(() => CategoryEntity, (categories) => categories.cat_id, {
    eager: true,
  })
  category!: CategoryEntity;

  @ManyToOne(() => LocationEntity, (location) => location.locId, {
    eager: true,
  })
  location!: LocationEntity;
}
