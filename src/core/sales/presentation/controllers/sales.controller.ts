import { Controller, Get, Param, Post } from "@nestjs/common";

@Controller('sales')
export class SalesController {
    constructor() {}

    @Post()
    createSale() {
        // Atomic: create sale, lines, payments, stock movements, and receipt in one DB transaction. Use idempotencyKey to prevent double-charges.
    }

    @Post('search')
    searchSales() {
        // Search sales with pagination, filtering by date range, customer, status, and sorting. Cache results in Redis for 5 minutes.
    }

    @Get(':id')
    getSale(@Param('id') id: string) {
        // Retrieve a sale by its ID, including lines, payments, stock movements, and receipt.
    }

    @Post(':id/receipt')
    generateReceipt(@Param('id') id: string) {
        // Generate a PDF receipt for the sale, including all details and a QR code linking to the online receipt.
    }
}