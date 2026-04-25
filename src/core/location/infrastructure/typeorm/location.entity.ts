import { User } from '@core/users/infrastructure/persistence/typeorm/user.entity';
import { Warehouse } from '@core/warehouse/infrastructure/typeorm/warehouse.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Location {
  @PrimaryGeneratedColumn({ type: 'smallint' })
  locId!: number;

  @Column({ nullable: false })
  locName!: string;

  @Column({ nullable: false })
  locDescription!: string;

  @ManyToOne(() => Warehouse)
  @JoinColumn({ name: 'locFkWarehouseId' })
  locFkWarehouseId!: Warehouse;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'locFkUserCreate' })
  locFkUserCreate!: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  locCreatedAt!: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'locFkUserUpdate' })
  locFkUserUpdate!: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  locUpdatedAt!: Date;
}
