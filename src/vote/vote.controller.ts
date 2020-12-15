import { Controller, Get, Logger, Query, Post, Delete, Patch, Body, Param, UseGuards } from "@nestjs/common";
import { Vote } from "./vote.entity";
import { VoteService } from "./vote.service";
import { DeleteResult } from "typeorm";
import { AuthGuard } from "src/shared/auth.guard";

@Controller('vote')
export class VoteController {
    private readonly logger = new Logger(VoteController.name);

    constructor(private readonly voteService: VoteService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getVotes(): Promise<Vote[]> {
        return this.voteService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getVote(@Param('id') id: number): Promise<Vote> {
        return this.voteService.find(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createVote(@Query('name') name: string): Promise<Vote> {
        return this.voteService.create(name);
    }

    @Post('/master/:masterId')
    @UseGuards(AuthGuard)
    async createVoteForMaster(@Param('masterId') masterId: number, @Query('name') name: string): Promise<Vote> {
        return this.voteService.createForMaster(masterId, name);
    }

    @Patch()
    @UseGuards(AuthGuard)
    async updateVote(@Body() vote: Vote): Promise<Vote> {
        return this.voteService.update(vote)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteVote(@Param('id') id: number): Promise<DeleteResult> {
        return this.voteService.delete(id);
    }
}