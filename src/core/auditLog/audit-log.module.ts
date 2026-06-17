import { Module } from "@nestjs/common";
import { AuditLog } from "./infrastructure/typeorm/audit.log.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([AuditLog]),
    ]
})

export class AuditLogModule {}