import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentOutputDto } from './dto/output.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @ApiCreatedResponse({ type: StudentOutputDto })
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  @ApiOkResponse({ type: StudentOutputDto, isArray: true })
  findAll() {
    return this.studentsService.findAll();
  }

  @Get(':registration')
  @ApiOkResponse({ type: StudentOutputDto })
  @ApiParam({ name: 'registration', type: String })
  findOne(@Param('registration') registration: string) {
    return this.studentsService.findOne(registration);
  }

  @Patch(':registration')
  @ApiOkResponse({ type: StudentOutputDto })
  @ApiParam({ name: 'registration', type: String })
  update(
    @Param('registration') registration: string,
    @Body() data: UpdateStudentDto,
  ) {
    return this.studentsService.update(registration, data);
  }

  @Post('activate/:registration')
  @HttpCode(200)
  @ApiOkResponse({ type: StudentOutputDto })
  @ApiParam({ name: 'registration', type: String })
  activate(@Param('registration') registration: string) {
    return this.studentsService.activate(registration);
  }

  @Post('inactivate/:registration')
  @HttpCode(200)
  @ApiOkResponse({ type: StudentOutputDto })
  @ApiParam({ name: 'registration', type: String })
  inactivate(@Param('registration') registration: string) {
    return this.studentsService.inactivate(registration);
  }

  @Post('leave/ :registration')
  @HttpCode(200)
  @ApiOkResponse({ type: StudentOutputDto })
  @ApiParam({ name: 'registration', type: String })
  leave(@Param('registration') registration: string) {
    return this.studentsService.leave(registration);
  }
}
