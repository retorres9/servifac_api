import { ProductEntity } from 'src/core/product/infrastructure/persistence/typeorm/product.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  loc_id!: number;

  @Column({ nullable: false })
  loc_name!: string;

  @OneToMany(() => ProductEntity, (product) => product.location)
  products!: ProductEntity[];
}
