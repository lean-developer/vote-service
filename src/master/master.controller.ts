import { Controller, Logger, Get, Param, Query, Post, Patch, Delete, Body, UseGuards } from "@nestjs/common";
import { MasterService } from "./master.service";
import { Master } from "./master.entity";
import { DeleteResult } from "typeorm";
import { AuthGuard } from "src/shared/auth.guard";

@Controller('master')
export class MasterController {
    private readonly logger = new Logger(MasterController.name);

    constructor(private readonly masterService: MasterService) {}

    @Get()
    @UseGuards(AuthGuard)
    async getMasters(): Promise<Master[]> {
        return this.masterService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard)
    async getMaster(@Param('id') id: number): Promise<Master> {
        return this.masterService.find(id);
    }

    @Get('/uid/:uid')
    @UseGuards(AuthGuard)
    async getMasterByUid(@Param('uid') uid: string): Promise<Master> {
        return this.masterService.findByUid(uid);
    }

    @Post()
    @UseGuards(AuthGuard)
    async createMaster(@Query('name') name: string, @Query('uid') uid: string): Promise<Master> {
        return this.masterService.create(name, uid);
    }

    @Patch()
    @UseGuards(AuthGuard)
    async updateMaster(@Body() master: Master): Promise<Master> {
        return this.masterService.update(master)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    async deleteMaster(@Param('id') id: number): Promise<DeleteResult> {
        return this.masterService.delete(id);
    }
}