import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './vote.entity';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { MemberVoteService } from './memberVote.service';
import { MemberVote } from './memberVote.entity';
import { MasterModule } from 'src/master/master.module';
import { SharedModule } from 'src/shared/shared.module';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Vote]),
        TypeOrmModule.forFeature([MemberVote]),
        TypeOrmModule.forFeature([Product]),
        MasterModule, SharedModule
    ],
    providers: [
        ProductService,
        VoteService,
        MemberVoteService
    ],
    exports: [
        ProductService,
        VoteService,
        MemberVoteService
    ],
    controllers: [VoteController, ProductController],
})
export class VoteModule {}
