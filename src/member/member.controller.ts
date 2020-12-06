import { Controller, Logger, Get, Param, Post, Query, Patch, Body, Delete } from "@nestjs/common";
import { MemberService } from "./member.service";
import { Member } from "./member.entity";
import { DeleteResult } from "typeorm";
import { MemberVote } from "src/vote/memberVote.entity";
import { MemberVoteService } from "src/vote/memberVote.service";
import { Voting } from "./voting";
import { Vote } from "src/vote/vote.entity";
import { VoteService } from "src/vote/vote.service";

@Controller('member')
export class MemberController {
    private readonly logger = new Logger(MemberController.name);

    constructor(private readonly memberService: MemberService,
        private readonly voteService: VoteService,
        private readonly memberVoteService: MemberVoteService) {}

    @Get()
    async getMembers(): Promise<Member[]> {
        return this.memberService.findAll();
    }

    @Get(':id')
    async getMember(@Param('id') id: number): Promise<Member> {
        return this.memberService.find(id);
    }

    @Get(':id/votes')
    async getVotes(@Param('id') id: number): Promise<MemberVote[]> {
        return this.memberVoteService.findVotesByMember(id);
    }

    @Post('/master/:masterId')
    async createMemberOfMaster(@Param('masterId') masterId: number, @Query('name') name: string): Promise<Member> {
        return this.memberService.create(masterId, name);
    }

    @Post(':memberId/vote/:voteId')
    async saveMemberVotePoints(@Param('memberId') memberId: number, @Param('voteId') voteId: number, @Body() voting: Voting): Promise<MemberVote> {
        const member: Member = await this.memberService.find(memberId);
        const vote: Vote = await this.voteService.find(voteId);
        const mv = new MemberVote();
        mv.member = member;
        mv.vote = vote;
        mv.points = voting.points;
        mv.notiz = voting.notiz;
       return await this.memberVoteService.saveMemberVote(mv);
    }

    @Patch()
    async updateMember(@Body() member: Member): Promise<Member> {
        return this.memberService.update(member)
    }

    @Delete(':id')
    async deleteMember(@Param('id') id: number): Promise<DeleteResult> {
        return this.memberService.delete(id);
    }
}