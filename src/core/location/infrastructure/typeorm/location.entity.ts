import { Warehouse } from 'src/core/warehouse/infrastructure/typeorm/warehouse.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LocationEntity {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  locId!: number;

  @Column({ nullable: false })
  locName!: string;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'locFkWarehouseId' })
  locFkWarehouseId!: Warehouse;
}
