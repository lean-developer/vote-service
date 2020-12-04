import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Vote } from "./vote.entity";

@Injectable()
export class VoteService {
    private readonly logger = new Logger(VoteService.name);

    constructor(
        @InjectRepository(Vote)
        private readonly voteRepository: Repository<Vote>) {
    }

    async findAll(): Promise<Vote[]> {
        return await this.voteRepository.find();
    }
}