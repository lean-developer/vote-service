import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member.entity';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { MasterModule } from 'src/master/master.module';
import { VoteModule } from 'src/vote/vote.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Member]),
        MasterModule, VoteModule, SharedModule
    ],
    providers: [
        MemberService,
    ],
    exports: [
        MemberService,
    ],
    controllers: [MemberController],
})
export class MemberModule {}
