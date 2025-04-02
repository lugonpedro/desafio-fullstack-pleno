import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { ImageOutputDTO } from "./dto/output.dto";
import { ImageService } from "./image.service";

const oneMb = 1000000;

@Controller("image")
@ApiTags("image")
export class ImageController {
  constructor(private service: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  @ApiOkResponse({ type: ImageOutputDTO })
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: oneMb / 2 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|gif)/ }),
        ],
      })
    )
    image: Express.Multer.File
  ) {
    return this.service.create(image);
  }
}
