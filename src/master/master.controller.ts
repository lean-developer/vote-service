import { Controller, Logger, Get, Param, Query, Post, Patch, Delete, Body } from "@nestjs/common";
import { MasterService } from "./master.service";
import { Master } from "./master.entity";
import { DeleteResult } from "typeorm";

@Controller('master')
export class MasterController {
    private readonly logger = new Logger(MasterController.name);

    constructor(private readonly masterService: MasterService) {}

    @Get()
    async getMasters(): Promise<Master[]> {
        return this.masterService.findAll();
    }

    @Get(':id')
    async getMaster(@Param('id') id: number): Promise<Master> {
        return this.masterService.find(id);
    }

    @Post()
    async createMaster(@Query('name') name: string): Promise<Master> {
        return this.masterService.create(name);
    }

    @Patch()
    async updateMaster(@Body() master: Master): Promise<Master> {
        return this.masterService.update(master)
    }

    @Delete(':id')
    async deleteMaster(@Param('id') id: number): Promise<DeleteResult> {
        return this.masterService.delete(id);
    }
}