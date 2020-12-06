import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, HttpModule } from '@nestjs/common';
import { VoteModule } from './vote/vote.module';
import { Vote } from './vote/vote.entity';
import { Master } from './master/master.entity';
import { Member } from './member/member.entity';
import { MasterModule } from './master/master.module';
import { MemberModule } from './member/member.module';
import { MemberVote } from './vote/memberVote.entity';
// tslint:disable-next-line: no-var-requires
const dotenv = require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PW,
      database: process.env.DB_NAME,
      entities: [Vote, Master, Member, MemberVote],
      synchronize: true,
    }),
    VoteModule,
    MasterModule,
    MemberModule,
    HttpModule,
  ]
})
export class AppModule {}

