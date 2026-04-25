
import { Product } from '@core/product/infrastructure/persistence/typeorm/product.entity';
import { User } from '@core/users/infrastructure/persistence/typeorm/user.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  catId!: number;

  @Column({ nullable: false })
  catName!: string;

  @Column({ nullable: false })
  catDescription!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'catFkCreatedBy' })
  catCreatedBy!: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  catCreatedAt!: Date;
  
  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn({ name: 'catFkUpdatedBy' })
  catUpdatedBy!: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  catUpdatedAt!: Date;
}
