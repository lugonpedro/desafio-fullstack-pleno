import { ApiProperty } from '@nestjs/swagger';
import { StudentStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateStudentDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsDateString()
  @ApiProperty()
  birth_date: string;

  @IsEnum(StudentStatus)
  @IsOptional()
  @ApiProperty()
  status?: StudentStatus;

  @IsInt()
  @IsOptional()
  @ApiProperty()
  photo_id?: number;
}
