import { ProductEntity } from 'src/core/location/infrastructure/persistence/typeorm/product.entity';
import { PrimaryGeneratedColumn, Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  cat_id: number;

  @Column({ nullable: false })
  cat_name: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  products: ProductEntity[];
}
