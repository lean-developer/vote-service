import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';

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
    controllers: [AbortController],
})
export class VoteModule {}
