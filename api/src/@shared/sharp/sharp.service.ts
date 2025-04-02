import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";

@Injectable()
export class SharpService {
  async encodeMemoryImageToBase64(buffer: Buffer): Promise<string> {
    return sharp(buffer)
      .png()
      .resize(32, 32, { fit: "inside" })
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        return "data:image/png;base64," + data.toString("base64");
      })
      .catch((error) => {
        throw error;
      });
  }
}
