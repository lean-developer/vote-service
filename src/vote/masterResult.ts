import { MemberVoteResult } from "src/vote/memberVoteResult";
import { Master } from "../master/master.entity";

export class MasterResult {
    master: Master;
    memberVoteResults: MemberVoteResult[]; 
}
