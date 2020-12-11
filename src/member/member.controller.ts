import { Controller, Logger, Get, Param, Post, Query, Patch, Body, Delete } from "@nestjs/common";
import { MemberService } from "./member.service";
import { Member } from "./member.entity";
import { DeleteResult } from "typeorm";
import { MemberVote } from "src/vote/memberVote.entity";
import { MemberVoteService } from "src/vote/memberVote.service";
import { Voting } from "./voting";
import { Vote } from "src/vote/vote.entity";
import { VoteService } from "src/vote/vote.service";
import { MemberVoteResult } from "src/vote/memberVoteResult";

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

    @Get(':memberId/membervote')
    async getMemberVotesByMember(@Param('memberId') memberId: number): Promise<MemberVote[]> {
        return this.memberVoteService.findMemberVotesByMember(memberId);
    }

    @Get('/membervote/:voteId')
    async getMemberVotesByVote(@Param('voteId') voteId: number): Promise<MemberVoteResult> {
        return this.memberVoteService.findMemberVotesByVote(voteId);
    }

    @Post('/master/:masterId')
    async createMemberOfMaster(@Param('masterId') masterId: number, @Query('name') name: string): Promise<Member> {
        const memberExists = await this.memberService.findByName(masterId, name);
        if (memberExists <= 0) {
            return this.memberService.create(masterId, name);
        }
    }

    @Delete(':memberId/master/:masterId')
    async deleteMemberOfMaster(@Param('memberId') memberId: number, @Param('masterId') masterId: number): Promise<DeleteResult> {
        return await this.memberService.deleteOfMaster(memberId);
    }

    @Post(':memberId/vote/:voteId')
    async saveMemberVotePoints(@Param('memberId') memberId: number, @Param('voteId') voteId: number, @Body() voting: Voting): Promise<MemberVote> {
        const member: Member = await this.memberService.find(memberId);
        const vote: Vote = await this.voteService.find(voteId);
        const mv = new MemberVote();
        mv.member = member;
        mv.vote = vote;
        mv.points = voting.points;
        mv.note = voting.note;
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