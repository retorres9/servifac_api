import { Parameter } from "@core/parameter/infrastructure/typeorm/parameter.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Location } from "@core/location/infrastructure/typeorm/location.entity";
import { Customer } from "@core/customer/infrastructure/typeorm/customer.entity";

@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    wrhId!: number;

    @Column({ nullable: false })
    @Index({ unique: true })
    wrhName!: string;

    @Column({ nullable: false })
    wrhDescription!: string;

    @ManyToOne(() => Parameter, { eager: true })
    @JoinColumn({ name: 'wrhFkTypeOfWarehouse' })
    wrhFkTypeOfWarehouse!: Parameter;

    @Column({ nullable: false })
    wrhAddress!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    wrhCreatedAt!: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    wrhUpdatedAt!: Date;

    @Column({ type: 'boolean', default: true })
    wrhIsActive!: boolean;

    @OneToMany(() => Location, (location) => location.locFkWarehouseId)
    locations!: Location[];

    @OneToMany(() => Customer, (customer) => customer.cusFkWarehouse)
    customers!: Customer[];
}