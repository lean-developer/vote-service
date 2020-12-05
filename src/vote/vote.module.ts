import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote])
    ],
    providers: [
        VoteService,
    ],
    exports: [
        VoteService,
    ],
    controllers: [VoteController],
})
export class VoteModule {}
