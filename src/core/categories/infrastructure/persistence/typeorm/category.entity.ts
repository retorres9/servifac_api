
import { Product } from 'src/core/product/infrastructure/persistence/typeorm/product.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  catId!: number;

  @Column({ nullable: false })
  catName!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
