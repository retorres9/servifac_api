import { Customer } from "src/core/customer/infrastructure/typeorm/customer.entity";
import { Parameter } from "src/core/parameter/infrastructure/typeorm/parameter.entity";
import { SalesLine } from "src/core/salesLine/infrastructure/typeorm/sales-line.entity";
import { UserEntity } from "src/core/users/infrastructure/persistence/typeorm/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sales{
    @PrimaryGeneratedColumn()
    salId!: number;

    @OneToMany(() => SalesLine, (line) => line.sllFkIdSales, { cascade: true, eager: true })
    salesLines!: SalesLine[];

    @ManyToOne(() => Customer, (customer) => customer.cusId)
    @JoinColumn({ name: 'salFkIdCustomer' })
    salFkIdCustomer!: Customer;

    @ManyToOne(() => Parameter)
    @JoinColumn({ name: 'salFkIdStatus'})
    salFkIdStatus!: Parameter;

    @Column({ type: 'money', nullable: false })
    salTotal!: number;

    @Column({ type: 'money', nullable: false })
    salTotalWithTax!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    salCreatedAt!: Date;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'salFkIdUser' })
    salFkIdUser!: UserEntity;
}