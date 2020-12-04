import { Controller, Get, Logger } from "@nestjs/common";
import { Vote } from "./vote.entity";
import { VoteService } from "./vote.service";

@Controller('vote')
export class VoteController {
    private readonly logger = new Logger(VoteController.name);

    constructor(private readonly voteService: VoteService) {}

    @Get()
    async getVotes(): Promise<Vote[]> {
        return this.voteService.findAll();
    }
}