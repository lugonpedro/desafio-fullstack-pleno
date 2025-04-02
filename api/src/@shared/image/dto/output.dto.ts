import { ApiProperty } from "@nestjs/swagger";

export class ImageOutputDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  created_at: string;

  @ApiProperty()
  updated_at: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  size: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  blur_url: string;
}
