import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { DisciplineOutputDto } from './dto/output.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';

@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Post()
  @ApiCreatedResponse({ type: DisciplineOutputDto })
  create(@Body() data: CreateDisciplineDto) {
    return this.disciplinesService.create(data);
  }

  @Get()
  @ApiOkResponse({ type: DisciplineOutputDto, isArray: true })
  findAll() {
    return this.disciplinesService.findAll();
  }

  @Get(':code')
  @ApiOkResponse({ type: DisciplineOutputDto })
  @ApiParam({ name: 'code', type: String })
  findOne(@Param('code') code: string) {
    return this.disciplinesService.findOne(code);
  }

  @Patch(':code')
  @ApiOkResponse({ type: DisciplineOutputDto })
  @ApiParam({ name: 'code', type: String })
  update(@Param('code') code: string, @Body() data: UpdateDisciplineDto) {
    return this.disciplinesService.update(code, data);
  }

  @Delete(':code')
  @ApiOkResponse({ type: DisciplineOutputDto })
  @ApiParam({ name: 'code', type: String })
  remove(@Param('code') code: string) {
    return this.disciplinesService.remove(code);
  }
}
