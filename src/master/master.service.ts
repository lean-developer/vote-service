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

    async findByUid(uid: string): Promise<Master> {
        return await this.masterRepository
            .createQueryBuilder('master')
            .leftJoinAndSelect('master.members', 'members')
            .leftJoin('master.votes', 'votes')
            .where('master.uid = :uid', { uid: uid})
            .getOne()
    }

    async create(name: string, uid: string): Promise<Master> {
        const master: Master = new Master();
        master.name = name;
        master.uid = uid;
        return await this.masterRepository.save(master);
    }

    async update(master: Master): Promise<Master> {
        return await this.masterRepository.save(master);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.masterRepository.delete(id);
    }
}