import { InjectRepository } from "@nestjs/typeorm";
import { IStockMovement } from "../../domain/repository/stockMovement.interface";
import { StockMovementDomain } from "../../domain/stockMovement.domain";
import { StockMovement } from "./stock-movement.entity";
import { Repository } from "typeorm";

export class StockMovementRepository implements IStockMovement {
    constructor(
        @InjectRepository(StockMovement)
        private readonly stockMovementRepository: Repository<StockMovement>
    ) {}

    async addStockMovement(stockMovement: StockMovementDomain): Promise<void> {
        const newStockMovement = this.stockMovementRepository.create({
            stmMovementType: {prmId: stockMovement.intIdMovementType},
            stmReferenceId: stockMovement.strReference,
            stmNote: stockMovement.strNote,
            stmCreatedBy: {usrId: stockMovement.intIdUser}
        });
        await this.stockMovementRepository.save(newStockMovement);
        return Promise.resolve();

    }
    getStockMovementsByProduct(productId: number): Promise<StockMovementDomain[]> {
        const movements = this.stockMovementRepository.find({
            where: { stmLines: { smlFkProductId: { prodId: productId } } },
            relations: ['stmLines', 'stmLines.smlFkProductId', 'stmMovementType', 'stmCreatedBy']
        });
        return movements.then(movs => movs.map(mov => new StockMovementDomain(
            mov.stmReferenceId,
            mov.stmMovementType.prmId,
            mov.stmNote,
            mov.stmCreatedBy.usrId
        )));
    }
    getStockMovementsByWarehouse(warehouseId: number): Promise<StockMovementDomain[]> {
        const movements = this.stockMovementRepository.find({
            where: { stmLines: { smlFkWarehouseId: { wrhId: warehouseId } } },
            relations: ['stmLines', 'stmLines.smlFkWarehouseId', 'stmMovementType', 'stmCreatedBy'],
            order: { stmCreatedAt: 'DESC' }
        });
        return movements.then(movs => movs.map(mov => new StockMovementDomain(
            mov.stmReferenceId,
            mov.stmMovementType.prmId,
            mov.stmNote || '',
            mov.stmCreatedBy.usrId
        )));
    }
    getStockMovementsByProductAndWarehouse(productId: number, warehouseId: number): Promise<StockMovementDomain[]> {
        const movements = this.stockMovementRepository.find({
            where: { 
                stmLines: { 
                    smlFkProductId: { prodId: productId }, 
                    smlFkWarehouseId: { wrhId: warehouseId } 
                } },
            relations: ['stmLines', 'stmLines.smlFkProductId', 'stmLines.smlFkWarehouseId', 'stmMovementType', 'stmCreatedBy'],
            order: { stmCreatedAt: 'DESC' }
        });
        return movements.then(movs => movs.map(mov => new StockMovementDomain(
            mov.stmReferenceId,
            mov.stmMovementType.prmId,
            mov.stmNote || '',
            mov.stmCreatedBy.usrId
        )));
    }
}