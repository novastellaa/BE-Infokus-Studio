import { ImageService } from "../service/image-service.js";

export class ImageController {
  static async upload(req, res, next) {
    try {
      const request = req.body;
      request.images = req.files;
      const response = await ImageService.upload(request);

      res.status(201).send({
        status: "success",
        code: 201,
        message: "Gambar berhasil diunggah",
        data: response,
      });
    } catch (e) {
      next(e);
    }
  }
}
