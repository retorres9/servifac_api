import { Module } from "@nestjs/common";
import { LedgerEntry } from "./infrastructure/typeorm/ledger-entry.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([LedgerEntry])],
})

export class LedgerEntryModule {}