import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master } from './master.entity';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Master]),
        SharedModule
    ],
    providers: [
        MasterService,
    ],
    exports: [
        MasterService,
    ],
    controllers: [MasterController],
})
export class MasterModule {}
