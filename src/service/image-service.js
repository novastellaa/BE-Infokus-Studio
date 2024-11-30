import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/s3client.js";
import { ResponseError } from "../error/response-error.js";
import { Validation } from "../validation/validation.js";
import { ImageValidation } from "../validation/image-validation.js";
import { v4 as uuidv4 } from "uuid";


export class ImageService {
  static getKeyFromUrl(url) {
    const publicUrlBase = process.env.CLOUDFLARE_R2_PUBLIC_URL + "/";
    return url.startsWith(publicUrlBase)
      ? url.slice(publicUrlBase.length)
      : url;
  }

  static async upload(request) {
    if (request.images.length < 1) {
      throw new ResponseError(
        "error",
        400,
        "Gambar yang diunggah minimal 1 gambar",
      );
    }

    const filesRequest = await Validation.validate(
      ImageValidation.UPLOAD,
      request,
    );

    const images = [];

    for (const file of filesRequest.images) {
      const uniqueFileName = `${uuidv4()}`;
      const key = `${request.entity}/${uniqueFileName}`;

      const params = {
        Bucket: process.env.CLOUDFLARE_R2_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      };

      const command = new PutObjectCommand(params);

      try {
        await s3Client.send(command);
        const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_URL}/${key}`;
        images.push(publicUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
        throw new ResponseError("Upload Error", 500, "Gagal mengunggah gambar");
      }
    }

    return images;
  }

  static async deleteImageFromR2(imageUrl) {
    const key = this.getKeyFromUrl(imageUrl);
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.CLOUDFLARE_R2_BUCKET,
      Key: key,
    });

    try {
      await s3Client.send(deleteCommand);
      console.log(`Successfully deleted image: ${key}`);
    } catch (error) {
      console.error(`Error deleting image ${key}:`, error);
      throw new ResponseError("Delete Error", 500, "Gagal menghapus gambar");
    }
  }
}
