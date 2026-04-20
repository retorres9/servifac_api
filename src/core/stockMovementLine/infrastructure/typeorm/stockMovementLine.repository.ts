import { InjectRepository } from "@nestjs/typeorm";
import { IStockMovementLine } from "../../domain/repository/stockMovement.Line.interface";
import { StockMovementLine } from "./stock-movementLine.entity";
import { DataSource, Repository } from "typeorm";
import { StockMovementLineDomain } from "../../domain/stockMovement.domain";

export class StockMovementLineRepository implements IStockMovementLine {
    constructor(
        @InjectRepository(StockMovementLine)
        private readonly stockMovementLineRepository: Repository<StockMovementLine>,
        private readonly dataSource: DataSource
    ) {}
    addStockMovementLine(entry: StockMovementLineDomain[]): Promise<any> {
        return this.dataSource.transaction( async manager => {
            const newLines = manager.getRepository(StockMovementLine)
            const linesToSave = entry.map(line => newLines.create({
                smlFkMovementId: { stmId: line.intIdStockMovement },
                smlFkProductId: { prodId: line.intIdProduct },
                smlFkWarehouseId: { wrhId: line.intIdWarehouse },
                smlChange: line.intChange,
                smlNewQuantity: line.intNewQty,
                smlPreviousQuantity: line.intPrevQty
            }));
            return await newLines.save(linesToSave);
        });
    }
    
}