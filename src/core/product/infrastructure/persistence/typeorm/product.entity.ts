import { Category } from 'src/core/categories/infrastructure/persistence/typeorm/category.entity';
import { Location } from 'src/core/location/infrastructure/typeorm/location.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @ManyToOne(() => Category, (categories) => categories.catId, {
    eager: true,
  })
  category!: Category;

  @ManyToOne(() => Location, (location) => location.locId, {
    eager: true,
  })
  location!: Location;
}
