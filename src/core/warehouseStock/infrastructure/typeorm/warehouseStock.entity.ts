import { ProductEntity } from "src/core/product/infrastructure/persistence/typeorm/product.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Warehouse {
    @PrimaryGeneratedColumn()
    id!: number;

    // @OneToMany(() => ProductEntity, (product) => product.prod_code)
    // product!: ProductEntity;
}