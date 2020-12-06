import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { Master } from "./master.entity";

@Injectable()
export class MasterService {
    private readonly logger = new Logger(MasterService.name);

    constructor(
        @InjectRepository(Master)
        private readonly masterRepository: Repository<Master>) {
    }

    async findAll(): Promise<Master[]> {
        return await this.masterRepository.find({ relations: ['members', 'votes'] });
    }

    async find(id: number): Promise<Master> {
        return await this.masterRepository.findOne(id, ({ relations: ['members', 'votes'] }));
    }

    async create(name: string): Promise<Master> {
        const master: Master = new Master();
        master.name = name;
        return await this.masterRepository.save(master);
    }

    async update(master: Master): Promise<Master> {
        return await this.masterRepository.save(master);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.masterRepository.delete(id);
    }
}