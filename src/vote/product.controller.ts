import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/shared/auth.guard";
import { DeleteResult } from "typeorm";
import { Product } from "./product.entity";
import { ProductService } from "./product.service";

@Controller('product')
export class ProductController {
    private readonly logger = new Logger(ProductController.name);

    constructor(private readonly productService: ProductService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getProducts(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getVote(@Param('id') id: number): Promise<Product> {
        return this.productService.find(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createVote(@Query('name') name: string): Promise<Product> {
        return this.productService.create(name);
    }

    @Post('/master/:masterId')
    @UseGuards(AuthGuard)
    async createVoteForMaster(@Param('masterId') masterId: number, @Query('name') name: string): Promise<Product> {
        return this.productService.createForMaster(masterId, name);
    }

    @Patch()
    @UseGuards(AuthGuard)
    async updateVote(@Body() product: Product): Promise<Product> {
        return this.productService.update(product)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteVote(@Param('id') id: number): Promise<DeleteResult> {
        return this.productService.delete(id);
    }
}