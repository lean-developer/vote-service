import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { Member } from "./member.entity";
import { MasterService } from "src/master/master.service";
import { Master } from "src/master/master.entity";

@Injectable()
export class MemberService {
    private readonly logger = new Logger(MemberService.name);

    constructor(
        @InjectRepository(Member)
        private readonly memberRepository: Repository<Member>,
        private readonly masterService: MasterService) {
    }

    async findAll(): Promise<Member[]> {
        return await this.memberRepository.find();
    }

    async find(id: number): Promise<Member> {
        return await this.memberRepository.findOne(id);
    }

    async findByName(masterId: number, name: string): Promise<number> {
        return await this.memberRepository
            .createQueryBuilder('member')
            .leftJoin('member.master', 'master')
            .where('master.id = :masterId', { masterId: masterId})
            .andWhere('member.name LIKE :name', { name: name })
            .getCount()
    }

    async create(masterId: number, name: string): Promise<Member> {
        const master: Master = await this.masterService.find(masterId);
        const member: Member = new Member();
        member.master = master;
        member.name = name;
        return await this.memberRepository.save(member);
    }

    async update(master: Member): Promise<Member> {
        return await this.memberRepository.save(master);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.memberRepository.delete(id);
    }
}