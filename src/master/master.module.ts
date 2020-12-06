import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Master } from './master.entity';
import { MasterService } from './master.service';
import { MasterController } from './master.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Master])
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
