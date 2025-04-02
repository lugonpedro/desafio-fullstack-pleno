import { ApiProperty } from '@nestjs/swagger';
import { Student, StudentStatus } from '@prisma/client';

export class StudentOutputDto implements Student {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  birth_date: Date;

  @ApiProperty()
  registration: string;

  @ApiProperty()
  photo_id: number;

  @ApiProperty()
  status: StudentStatus;
}
