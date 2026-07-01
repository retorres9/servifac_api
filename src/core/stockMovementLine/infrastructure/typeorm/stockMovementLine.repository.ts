import { InjectRepository } from "@nestjs/typeorm";
import { IStockMovementLine } from "../../domain/repository/stockMovement.Line.interface";
import { StockMovementLine } from "./stock-movementLine.entity";
import { DataSource, EntityManager, Repository } from "typeorm";
import { StockMovementLineDomain } from "../../domain/stockMovement.domain";
import { TransactionContext } from "@common/domain/transaction.manager";

export class StockMovementLineRepository implements IStockMovementLine {
    constructor(
        @InjectRepository(StockMovementLine)
        private readonly stockMovementLineRepository: Repository<StockMovementLine>
    ) {}
    async addStockMovementLine(entry: StockMovementLineDomain[], manager: TransactionContext): Promise<any> {
        const dataSource = manager ? (manager as EntityManager).getRepository(StockMovementLine) : this.stockMovementLineRepository;
        
        const newLines = entry.map(line => dataSource.create({
            smlFkMovementId: { stmId: line.intIdStockMovement } as any,
            smlFkProductId: { prodId: line.intIdProduct },
            smlFkWarehouseId: { wrhId: line.intIdWarehouse } as any,
            smlChange: line.intChange,
            smlNewQuantity: line.intNewQuantity,
            smlPreviousQuantity: line.intPreviousQuantity
        }));
        
        return await dataSource.save(newLines);
        
    }
    
}