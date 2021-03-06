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

    async deleteOfMaster(memberId: number): Promise<DeleteResult> {
        // 1) master des members löschen
        const member: Member = await this.find(memberId);
        member.master = null;
        await this.memberRepository.save(member);
        // 2) member löschen
        return await this.memberRepository.delete(member);
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
        member.pin = this.getUniquePin(master);
        return await this.memberRepository.save(member);
    }

    async update(master: Member): Promise<Member> {
        return await this.memberRepository.save(master);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.memberRepository.delete(id);
    }

    private getUniquePin(master: Master): number {
        let cnt: number = 0;
        let pin: number = this.getRandomIntInclusive(1000, 9999);
        while(this.isPinUsed(master, pin)) {
            pin = this.getRandomIntInclusive(1000, 9999);
            cnt++;
            if (cnt > 5000) {
                break;
            }
        }
        return pin;
    }

    private isPinUsed(master: Master, pin: number): boolean {
        // PIN darf nicht bereits in Members des Masters benutzt werden!
        for (let m of master.members) {
            if (m.pin === pin) {
                return true;
            }
        }
        return false;
    }

    private getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
      } 
}