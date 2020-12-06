import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { MemberVoteService } from './memberVote.service';
import { MemberVote } from './memberVote.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote]),
        TypeOrmModule.forFeature([MemberVote]),
    ],
    providers: [
        VoteService,
        MemberVoteService
    ],
    exports: [
        VoteService,
        MemberVoteService
    ],
    controllers: [VoteController],
})
export class VoteModule {}
