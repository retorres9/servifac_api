import { ProductEntity } from 'src/core/product/infrastructure/persistence/typeorm/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  locId!: number;

  @Column({ nullable: false })
  loc_name!: string;

  @OneToMany(() => ProductEntity, (product) => product.location)
  products!: ProductEntity[];
}
