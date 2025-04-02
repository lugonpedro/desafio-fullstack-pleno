import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/@shared/prisma/prisma.service';
import { randomInt } from 'crypto';
import { StudentStatus } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateStudentDto) {
    const now = new Date();
    const randomFourDigit = randomInt(1000, 10000);

    return this.prisma.student.create({
      data: {
        name: data.name,
        birth_date: data.birth_date,
        registration: `${now.getUTCFullYear()}${randomFourDigit}`,
        status: data.status,
        photo_id: data.photo_id,
      },
    });
  }

  async findAll() {
    return this.prisma.student.findMany({});
  }

  async findOne(registration: string) {
    return this.exists(registration);
  }

  async update(registration: string, data: UpdateStudentDto) {
    await this.exists(registration);

    return this.prisma.student.update({
      where: { registration },
      data: data,
    });
  }

  async activate(registration: string) {
    await this.exists(registration);

    return this.prisma.student.update({
      where: { registration },
      data: {
        status: StudentStatus.ACTIVE,
      },
    });
  }

  async inactivate(registration: string) {
    await this.exists(registration);

    return this.prisma.student.update({
      where: { registration },
      data: {
        status: StudentStatus.INACTIVE,
      },
    });
  }

  async leave(registration: string) {
    await this.exists(registration);

    return this.prisma.student.update({
      where: { registration },
      data: {
        status: StudentStatus.ON_LEAVE,
      },
    });
  }

  async exists(registration: string) {
    const student = await this.prisma.student.findUnique({
      where: { registration },
    });

    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }

    return student;
  }
}
