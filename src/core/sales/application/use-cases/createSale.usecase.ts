import { Inject } from "@nestjs/common";
import { type ITransactionManager, TRANSACTION_MANAGER } from "@common/domain/transaction.manager";
import { SALES_INTERFACE, type ISales } from "../../domain/interfaces/sales.interface";
import { CUSTOMER_INTERFACE, type ICustomer } from "@core/customer/domain/interfaces/customer.interface";
import { type IStockMovement, STOCK_MOVEMENT_INTERFACE } from "@core/stockMovement/domain/repository/stockMovement.interface";
import { type ISalesLine, SALES_LINE_REPOSITORY } from "@core/salesLine/domain/interfaces/saleLine.interface";
import { SalesDomain } from "@core/sales/domain/sales.domain";
import { SaleLineDomain } from "@core/salesLine/domain/saleLine.domain";
import { type IPayment, PAYMENT_INTERFACE } from "@core/payment/domain/interfaces/payment.interface";

export class CreateSaleUseCase {
    constructor(
        @Inject(TRANSACTION_MANAGER)
        private readonly transactionManager: ITransactionManager,
        @Inject(SALES_INTERFACE)
        private readonly salesRepository: ISales,
        @Inject(CUSTOMER_INTERFACE)
        private readonly customerRepository: ICustomer,
        @Inject(STOCK_MOVEMENT_INTERFACE)
        private readonly stockMovementRepository: IStockMovement,
        @Inject(SALES_LINE_REPOSITORY)
        private readonly salesLineRepository: ISalesLine,
        @Inject(PAYMENT_INTERFACE)
        private readonly paymentInterface: IPayment
    ) {}

    async execute(input: SalesDomain): Promise<void> {
        await this.transactionManager.run(async (ctx) => {
            const client = await this.customerRepository.getCustomerById(input.intCustomerId!);
            if (!client) {
                throw new Error("Customer not found");
            }
            const totals = this.calculateTotals(input.SaleLines);
            const saleId = await this.salesRepository.createSale({
                
                intCustomerId: input.intCustomerId,
                intIdStatus: 1, // Assuming 1 represents a new sale
                dcmTotal: totals.total, // Placeholder value, calculate based on sale lines
                dcmTotalWithTax: totals.totalWithTax, // Placeholder value, calculate based on sale lines and tax
                intUserId: input.intUserId,
                SaleLines: []
            }, ctx);
            input.SaleLines.forEach(line => line.intSaleId = saleId);
            await this.salesLineRepository.createSaleLines(input.SaleLines, ctx);
            await this.paymentInterface.createPayment({
                intIdSale: saleId,
                dcmAmount: totals.totalWithTax,
                intPaymentTypeId: 1, // Assuming a default payment type, this should be dynamic based on input
                strPaymentMethod: 'Cash', // Placeholder value, this should be dynamic based on input
                strReference: `Payment for Sale #${saleId}`,
                dtePaymentDate: new Date(),
                intPaymentStatus: 1, // Assuming 1 represents a completed payment
            }, ctx); // Passing the TransactionContext
            await this.stockMovementRepository.addStockMovement(
                {
                    strReference: `Sale #${saleId}`,
                    intIdMovementType: 2, // Assuming 2 represents a sale
                    strNote: `Quantity: -${input.intUserId}`,
                    intIdUser: input.intUserId!,
                }, ctx
            );

        });
    }

    private calculateTotals(saleLines: SaleLineDomain[]): { total: number, totalWithTax: number } {
        let total = 0;
        let totalWithTax = 0;
        saleLines.forEach(line => {
            total += line.intTotalPrice;
            totalWithTax += line.intTotalPrice * 1.1; // Assuming a 10% tax rate
        }
        );
        return { total, totalWithTax };
    }
}