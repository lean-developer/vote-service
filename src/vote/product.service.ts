import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { identity } from "rxjs";
import { Master } from "src/master/master.entity";
import { MasterService } from "src/master/master.service";
import { DeleteResult, Repository } from "typeorm";
import { Product } from "./product.entity";

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly masterService: MasterService) {
    }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    async find(id: number): Promise<Product> {
        return await this.productRepository.findOne(id);
    }

    async create(name: string): Promise<Product> {
        const vote: Product = new Product();
        vote.name = name;
        return await this.productRepository.save(vote);
    }

    async createForMaster(masterId: number, name: string): Promise<Product> {
        const master: Master = await this.masterService.find(masterId);
        const product: Product = new Product();
        product.name = name;
        product.master = master;
        return await this.productRepository.save(product);
    }

    async update(product: Product): Promise<Product> {
        return await this.productRepository.save(product);
    }

    async delete(id: number): Promise<DeleteResult> {
        return await this.productRepository.delete(id);
    }
}