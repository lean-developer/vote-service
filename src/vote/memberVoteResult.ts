import { MemberVote } from "./memberVote.entity";
import { Vote } from "./vote.entity";

export class MemberVoteResult {
    vote: Vote;
    referencePoints: string;
    memberVotes: MemberVote[];
}