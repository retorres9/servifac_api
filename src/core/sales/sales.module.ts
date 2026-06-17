import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sales } from "./infrastructure/typeorm/sales.entity";
import { TransactionModule } from "@common/transaction.module";
import { SalesRepository } from "./infrastructure/typeorm/sales.repository";
import { SalesController } from "./presentation/http/sales.controller";
import { SalesLine } from "@core/salesLine/infrastructure/typeorm/sales-line.entity";
import { SalesLineRepository } from "@core/salesLine/infrastructure/typeorm/sales-line.repository";
import { CreateSaleUseCase } from "./application/use-cases/createSale.usecase";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sales, SalesLine]),
        TransactionModule
    ],
    controllers: [SalesController],
    providers: [
        { provide: 'SALES_INTERFACE', useClass: SalesRepository },
        { provide: 'SALES_LINE_REPOSITORY', useClass: SalesLineRepository },
        CreateSaleUseCase,
    ]
})
export class SalesModule {}