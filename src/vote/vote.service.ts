import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
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

    async find(id: number): Promise<Vote> {
        return await this.voteRepository.findOne(id);
    }

    async create(name: string): Promise<Vote> {
        const vote: Vote = new Vote();
        vote.name = name;
        return await this.voteRepository.save(vote);
    }

    async update(vote: Vote): Promise<Vote> {
        return await this.voteRepository.save(vote);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.voteRepository.delete(id);
    }
}