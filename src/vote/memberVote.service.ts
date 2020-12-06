import { Injectable, Logger } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Vote } from "./vote.entity";
import { Repository } from "typeorm";
import { MemberVote } from "./memberVote.entity";

@Injectable()
export class MemberVoteService {
    private readonly logger = new Logger(VoteService.name);

    constructor(
        @InjectRepository(MemberVote)
        private readonly memberVoteRepository: Repository<MemberVote>) {
    }

    async findAll(): Promise<MemberVote[]> {
        return await this.memberVoteRepository.find();
    }

    async findVotesByMember(memberId: number): Promise<MemberVote[]> {
        return await this.memberVoteRepository
            .createQueryBuilder('membervote')
            .leftJoinAndSelect('membervote.vote', 'vote')
            .leftJoin('membervote.member', 'member')
            .where('member.id = :id', { id: memberId})
            .getMany();
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