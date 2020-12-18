import { Injectable, Logger } from "@nestjs/common";
import { VoteService } from "./vote.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Vote } from "./vote.entity";
import { DeleteResult, Repository } from "typeorm";
import { MemberVote } from "./memberVote.entity";
import { MemberVoteResult } from "./memberVoteResult";
import { MasterResult } from "./masterResult";
import { Master } from "./../master/master.entity";
import { MasterService } from "./../master/master.service";

@Injectable()
export class MemberVoteService {
    private readonly logger = new Logger(VoteService.name);

    constructor(
        @InjectRepository(MemberVote)
        private readonly memberVoteRepository: Repository<MemberVote>,
        private readonly voteService: VoteService,
        private readonly masterService: MasterService) {
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

    async findMemberVotesResultByVote(voteId: number): Promise<MemberVoteResult> {
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
        // result.referencePoints = this.getReferencePoints(memberVotes);
        result.referencePoints = "20";
        return result;
    }

    private getReferencePoints(memberVotes: MemberVote[]): string {
        // TODO
        /* StoryPoints mit dem höchsten Vorkommen empfehlen; gibt es mehrere mit dem höchsten Vorkommen: den höchsten Wert nehmen! */
        let sortedVotes: MemberVote[] = memberVotes.sort((a, b) => (+a.points > +b.points) ? 1 : ((+a.points < +b.points) ? -1 : 0))
        return sortedVotes[0].points;
    }

    async findMemberVotesByVote(voteId: number): Promise<MemberVote[]> {
        return await this.memberVoteRepository
            .createQueryBuilder('membervote')
            .leftJoinAndSelect('membervote.member', 'member')
            .leftJoin('membervote.vote', 'vote')
            .where('vote.id = :id', { id: voteId})
            .getMany();
    }

    async findMemberVotesByVotes(votes: Vote[]): Promise<MemberVote[]> {
        const voteIds: number[] = votes.map(({ id }) => id);
        return await this.memberVoteRepository
            .createQueryBuilder('membervote')
            .leftJoinAndSelect('membervote.member', 'member')
            .leftJoin('membervote.vote', 'vote')
            .where('vote.id IN (:voteIds)', { voteIds: voteIds})
            .orderBy('vote.id')
            .getMany();
    }

    async findResult(id: number): Promise<MasterResult> {
        let masterResult: MasterResult = new MasterResult();
        const master: Master = await this.masterService.find(id);
        masterResult.master = master;
        let memberVoteResults: MemberVoteResult[] = [];
        const masterMemberVotes: MemberVote[] = await this.findMemberVotesByVotes(master.votes);
        for (let v of master.votes) {
            // MemberVotes für diese Vote aus den zuvor geladenen MasterMemberVotes (d.h. alle MemberVotes aller Votes des Masters) filtern
            let memberVotes: MemberVote[] = masterMemberVotes.filter( memberVote => memberVote.vote.id === v.id );
            // MemberVoteResult Objekt erzeugen und in Array ablegen
            let memberVoteResult: MemberVoteResult = new MemberVoteResult();
            memberVoteResult.vote = v;
            memberVoteResult.referencePoints = ''; // TODO
            memberVoteResult.memberVotes = memberVotes;
            memberVoteResults.push(memberVoteResult);
        }
        masterResult.memberVoteResults = memberVoteResults; 
        return masterResult;
    }

    async deleteMemberVotesByVote(voteId: number): Promise<void> {
        const memberVotes: MemberVote[] = await this.findMemberVotesByVote(voteId);
        for (let mv of memberVotes) {
            this.memberVoteRepository.delete(mv);
        }
    }

    async saveMemberVote(memberVote: MemberVote): Promise<MemberVote> {
        return this.memberVoteRepository.save(memberVote);
    }
}