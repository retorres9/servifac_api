import { Inject } from "@nestjs/common";
import { type ITransactionManager, TRANSACTION_MANAGER } from "@common/domain/transaction.manager";
import { SALES_INTERFACE, type ISales } from "../../domain/interfaces/sales.interface";
import { CUSTOMER_REPOSITORY, type ICustomer } from "@core/customer/domain/interfaces/customer.interface";
import { type IStockMovement, STOCK_MOVEMENT_INTERFACE } from "@core/stockMovement/domain/repository/stockMovement.interface";
import { type ISalesLine, SALES_LINE_REPOSITORY } from "@core/salesLine/domain/interfaces/saleLine.interface";
import { SalesDomain } from "@core/sales/domain/sales.domain";

export class CreateSaleUseCase {
    constructor(
        @Inject(TRANSACTION_MANAGER)
        private readonly transactionManager: ITransactionManager,
        @Inject(SALES_INTERFACE)
        private readonly salesRepository: ISales,
        @Inject(CUSTOMER_REPOSITORY)
        private readonly customerRepository: ICustomer,
        @Inject(STOCK_MOVEMENT_INTERFACE)
        private readonly stockMovementRepository: IStockMovement,
        @Inject(SALES_LINE_REPOSITORY)
        private readonly salesLineRepository: ISalesLine
    ) {}

    async execute(input: SalesDomain): Promise<void> {
        await this.transactionManager.run(async () => {
            const client = await this.customerRepository.getCustomerById(input.intCustomerId);
            if (!client) {
                throw new Error("Customer not found");
            }
            const saleId = await this.salesRepository.createSale({
                
                intCustomerId: input.intCustomerId,
                intIdStatus: 1, // Assuming 1 represents a new sale
                dcmTotal: 100, // Placeholder value, calculate based on sale lines
                dcmTotalWithTax: 110, // Placeholder value, calculate based on sale lines and tax
                intUserId: input.intUserId,
                SaleLines: []
            });
            input.SaleLines.forEach(line => line.intSaleId = saleId);
            await this.salesLineRepository.createSaleLines(input.SaleLines);
            await this.stockMovementRepository.addStockMovement(
                {
                    strReference: `Sale #${saleId}`,
                    intIdMovementType: 2, // Assuming 2 represents a sale
                    strNote: `Quantity: -${input.intUserId}`,
                    intIdUser: input.intUserId,
                }
            );

        });
    }
}