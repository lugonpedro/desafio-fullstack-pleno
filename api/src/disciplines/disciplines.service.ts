import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDisciplineDto } from './dto/create-discipline.dto';
import { UpdateDisciplineDto } from './dto/update-discipline.dto';
import { PrismaService } from 'src/@shared/prisma/prisma.service';

@Injectable()
export class DisciplinesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDisciplineDto) {
    return this.prisma.discipline.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.discipline.findMany({});
  }

  async findOne(code: string) {
    return this.exists(code);
  }

  async update(code: string, data: UpdateDisciplineDto) {
    await this.exists(code);

    return this.prisma.discipline.update({
      where: { code },
      data: data,
    });
  }

  async remove(code: string) {
    await this.exists(code);

    return this.prisma.discipline.delete({
      where: {
        code,
      },
    });
  }

  async exists(code: string) {
    const discipline = await this.prisma.discipline.findUnique({
      where: { code },
    });

    if (!discipline) {
      throw new HttpException('Discipline not found', HttpStatus.NOT_FOUND);
    }

    return discipline;
  }
}
