import { Inject } from "@nestjs/common";
import { type ITransactionManager, TRANSACTION_MANAGER } from "src/common/domain/transaction.manager";
import { SALES_INTERFACE, type ISales } from "../../domain/interfaces/sales.interface";
import { SellStockInput } from "../model/createSale.input";
import { CUSTOMER_REPOSITORY, type ICustomer } from "@core/customer/domain/interfaces/customer.interface";
import { type IStockMovement, STOCK_MOVEMENT_INTERFACE } from "@core/stockMovement/domain/repository/stockMovement.interface";

export class CreateSaleUseCase {
    constructor(
        @Inject(TRANSACTION_MANAGER)
        private readonly transactionManager: ITransactionManager,
        @Inject(SALES_INTERFACE)
        private readonly salesRepository: ISales,
        @Inject(CUSTOMER_REPOSITORY)
        private readonly customerRepository: ICustomer,
        @Inject(STOCK_MOVEMENT_INTERFACE)
        private readonly stockMovementRepository: IStockMovement
    ) {}

    async execute(input: SellStockInput) {
        await this.transactionManager.run(async () => {
            const saleId = await this.salesRepository.createSale({
                intCustomerId: input.intCustomerId,
                intIdStatus: 1, // Assuming 1 represents a new sale
                dcmTotal: 100, // Placeholder value, calculate based on sale lines
                dcmTotalWithTax: 110, // Placeholder value, calculate based on sale lines and tax
                intUserId: input.intUserId,
                SaleLines: []
            });
            const client = await this.customerRepository.getCustomerById(input.intCustomerId);
            if (!client) {
                throw new Error("Customer not found");
            }
            await this.stockMovementRepository.addStockMovement(
                {
                    strReference: `Sale #${saleId}`,
                    intIdMovementType: 2, // Assuming 2 represents a sale
                    strNote: `Quantity: -${input.intUserId}`,
                    intIdUser: input.intUserId,
                }
            )
        });
    }
}