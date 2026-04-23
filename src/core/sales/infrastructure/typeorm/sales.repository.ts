import { InjectRepository } from "@nestjs/typeorm";
import { ISales } from "../../domain/interfaces/sales.interface";
import { SalesDomain } from "../../domain/sales.domain";
import { Sales } from "./sales.entity";
import { Repository } from "typeorm";

export class SalesRepository implements ISales {
    constructor(
        @InjectRepository(Sales)
        private salesRepository: Repository<Sales>,
    ) {}
    async createSale(sale: SalesDomain): Promise<number> {
        const saleEntity = this.salesRepository.create({
            salFkIdCustomer: { cusId: sale.intCustomerId },
            salFkIdStatus: { prmId: sale.intIdStatus },
            salTotal: sale.dcmTotal,
            salTotalWithTax: sale.dcmTotalWithTax,
            salFkIdUser: { usrId: sale.intUserId },
        });
        const savedSale = await this.salesRepository.save(saleEntity);
        return savedSale.salId;
    }
    async getSaleById(id: number): Promise<SalesDomain[] | null> {
        throw new Error("Method not implemented.");
    }
    async getAllSales(): Promise<SalesDomain[]> {
        throw new Error("Method not implemented.");
    }
    async updateSale(id: number, sale: SalesDomain): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteSale(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}