import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Sales } from "./infrastructure/typeorm/sales.entity";
import { TransactionModule } from "@common/transaction.module";
import { SalesRepository } from "./infrastructure/typeorm/sales.repository";
import { SalesController } from "./presentation/controllers/sales.controller";
import { SalesLine } from "@core/salesLine/infrastructure/typeorm/sales-line.entity";
import { SalesLineRepository } from "@core/salesLine/infrastructure/typeorm/sales-line.repository";
import { CreateSaleUseCase } from "./application/use-cases/createSale.usecase";
import { AuditLogModule } from "@core/auditLog/audit-log.module";
import { LedgerEntryModule } from "@core/ledgerEntry/ledger-entry.module";
import { CustomerModule } from "@core/customer/customer.module";
import { StockMovementModule } from "@core/stockMovement/stock-movement.module";
import { SalesLineModule } from "@core/salesLine/sales-line.module";
import { SALES_INTERFACE } from "./domain/interfaces/sales.interface";
import { SALES_LINE_REPOSITORY } from "@core/salesLine/domain/interfaces/saleLine.interface";
import { PaymentModule } from "@core/payment/payment.module";
import { StockMovementLineModule } from "@core/stockMovementLine/stock-movement-line.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Sales, SalesLine]),
        TransactionModule,
        CustomerModule,
        LedgerEntryModule,
        AuditLogModule,
        StockMovementModule,
        SalesLineModule,
        PaymentModule,
        StockMovementLineModule
    ],
    controllers: [SalesController],
    providers: [
        { provide: SALES_INTERFACE, useClass: SalesRepository },
        { provide: SALES_LINE_REPOSITORY, useClass: SalesLineRepository },
        CreateSaleUseCase,
    ]
})
export class SalesModule {}