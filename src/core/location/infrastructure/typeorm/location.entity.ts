import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from '../persistence/typeorm/product.entity';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  loc_id: number;

  @Column({ nullable: false })
  loc_name: string;

  @ManyToMany(() => ProductEntity, (product) => product.locations)
  products: ProductEntity[];
}
