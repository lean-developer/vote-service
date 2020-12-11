import { Injectable, Logger } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Vote } from "./vote.entity";
import { Repository } from "typeorm";
import { MemberVote } from "./memberVote.entity";
import { MemberVoteResult } from "./memberVoteResult";

@Injectable()
export class MemberVoteService {
    private readonly logger = new Logger(VoteService.name);

    constructor(
        @InjectRepository(MemberVote)
        private readonly memberVoteRepository: Repository<MemberVote>,
        private readonly voteService: VoteService) {
    }

    async findAll(): Promise<MemberVote[]> {
        return await this.memberVoteRepository.find();
    }

    async findMemberVotesByMember(memberId: number): Promise<MemberVote[]> {
        return await this.memberVoteRepository
            .createQueryBuilder('membervote')
            .leftJoinAndSelect('membervote.vote', 'vote')
            .leftJoin('membervote.member', 'member')
            .where('member.id = :id', { id: memberId})
            .getMany();
    }

    async findMemberVotesByVote(voteId: number): Promise<MemberVoteResult> {
        const vote: Vote = await this.voteService.find(voteId);
        const memberVotes: MemberVote[] = await this.memberVoteRepository
            .createQueryBuilder('membervote')
            .leftJoin('membervote.vote', 'vote')
            .leftJoinAndSelect('membervote.member', 'member')
            .where('vote.id = :id', { id: voteId})
            .getMany();
        let result: MemberVoteResult = new MemberVoteResult();
        result.memberVotes = memberVotes;
        result.vote = vote;
        result.referencePoints = this.getReferencePoints();
        return result;
    }

    private getReferencePoints(): string {
        // TODO
        return '100';
    }

    async findMembersByVote(voteId: number): Promise<MemberVote[]> {
        return await this.memberVoteRepository
            .createQueryBuilder('membervote')
            .leftJoinAndSelect('membervote.member', 'member')
            .leftJoin('membervote.vote', 'vote')
            .where('vote.id = :id', { id: voteId})
            .getMany();
    }

    async saveMemberVote(memberVote: MemberVote): Promise<MemberVote> {
        return this.memberVoteRepository.save(memberVote);
    }
}