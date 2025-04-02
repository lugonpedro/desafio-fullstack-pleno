import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";
import { PrismaService } from "../prisma/prisma.service";
import { SharpService } from "../sharp/sharp.service";

@Injectable()
export class ImageService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sharp: SharpService
  ) {}

  private readonly s3Client = new S3Client({
    region: "sa-east-1",
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  async create(image: Express.Multer.File) {
    const fileName = uuidv4() + "-" + image.originalname.replace(/\s/g, "");

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: "yoobe",
        Key: fileName,
        Body: image.buffer,
        ACL: "public-read",
        ContentType: image.mimetype,
      })
    );

    const base64 = await this.sharp.encodeMemoryImageToBase64(image.buffer);

    return this.prisma.image.create({
      data: {
        name: fileName,
        type: image.mimetype,
        size: image.size,
        url: `${process.env.S3_URL + fileName}`,
        blur_url: base64,
      },
    });
  }
}
