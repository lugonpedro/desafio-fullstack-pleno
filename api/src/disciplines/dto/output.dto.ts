import { ApiProperty } from '@nestjs/swagger';
import { Discipline } from '@prisma/client';

export class DisciplineOutputDto implements Discipline {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  updated_at: Date;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  credits: number;

  @ApiProperty()
  department_id: number;
}
