import { Controller, Get, Logger, Query, Post, Delete, Patch, Body, Param } from "@nestjs/common";
import { Vote } from "./vote.entity";
import { VoteService } from "./vote.service";
import { DeleteResult } from "typeorm";

@Controller('vote')
export class VoteController {
    private readonly logger = new Logger(VoteController.name);

    constructor(private readonly voteService: VoteService) {}

    @Get()
    async getVotes(): Promise<Vote[]> {
        return this.voteService.findAll();
    }

    @Get(':id')
    async getVote(@Param('id') id: number): Promise<Vote> {
        return this.voteService.find(id);
    }

    @Post()
    async createVote(@Query('name') name: string): Promise<Vote> {
        return this.voteService.create(name);
    }

    @Patch()
    async updateVote(@Body() vote: Vote): Promise<Vote> {
        return this.voteService.update(vote)
    }

    @Delete(':id')
    async deleteVote(@Param('id') id: number): Promise<DeleteResult> {
        return this.voteService.delete(id);
    }
}