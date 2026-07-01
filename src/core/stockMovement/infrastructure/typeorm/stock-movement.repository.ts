import { InjectRepository } from "@nestjs/typeorm";
import { IStockMovement } from "../../domain/repository/stockMovement.interface";
import { StockMovementDomain } from "../../domain/stockMovement.domain";
import { StockMovement } from "./stock-movement.entity";
import { EntityManager, Repository } from "typeorm";
import { TransactionContext } from "@common/domain/transaction.manager";

export class StockMovementRepository implements IStockMovement {
    constructor(
        @InjectRepository(StockMovement)
        private readonly stockMovementRepository: Repository<StockMovement>
    ) {}

    async addStockMovement(stockMovement: StockMovementDomain, ctx?: TransactionContext): Promise<number> {
        const repo = ctx ? (ctx as EntityManager).getRepository(StockMovement) : this.stockMovementRepository;
        const newStockMovement = repo.create({
            stmMovementType: stockMovement.intIdMovementType ? {prmId: stockMovement.intIdMovementType} : undefined,
            stmReferenceId: stockMovement.strReference,
            stmNote: stockMovement.strNote || undefined,
            stmCreatedBy: {usrId: stockMovement.intIdUser}
        });
        const savedStockMovement = await repo.save(newStockMovement);
        return savedStockMovement.stmId;
    }
    getStockMovementsByProduct(productId: number): Promise<StockMovementDomain[]> {
        const movements = this.stockMovementRepository.find({
            where: { stmLines: { smlFkProductId: { prodId: productId } } },
            relations: ['stmLines', 'stmLines.smlFkProductId', 'stmMovementType', 'stmCreatedBy']
        });
        return movements.then(movs => movs.map(mov => new StockMovementDomain(
            mov.stmReferenceId,
            mov.stmMovementType ? mov.stmMovementType.prmId : 0,
            mov.stmNote ?? '',
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
            mov.stmMovementType ? mov.stmMovementType.prmId : 0,
            mov.stmNote ?? undefined,
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
            mov.stmMovementType ? mov.stmMovementType.prmId : 0,
            mov.stmNote ?? undefined,
            mov.stmCreatedBy.usrId
        )));
    }
}