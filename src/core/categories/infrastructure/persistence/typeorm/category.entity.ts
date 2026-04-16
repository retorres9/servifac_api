
import { ProductEntity } from 'src/core/product/infrastructure/persistence/typeorm/product.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  cat_id!: number;

  @Column({ nullable: false })
  cat_name!: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity[];
}
