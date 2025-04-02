import { Module } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SharpService } from "../sharp/sharp.service";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
  controllers: [ImageController],
  providers: [ImageService, PrismaService, SharpService],
})
export class ImageModule {}
