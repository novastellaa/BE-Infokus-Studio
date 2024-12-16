import { ImageController } from "../controller/image-controller.js";
import { ImageService } from "../service/image-service.js";

jest.mock("../service/image-service.js");

describe("ImageController", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: {
                title: "Test Image",
            },
            files: [{
                filename: "image1.jpg",
                mimetype: "image/jpeg",
            }, ],
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };

        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should upload images successfully", async() => {
        // Mock service response
        const mockResponse = {
            id: 1,
            title: "Test Image",
            images: [{
                filename: "image1.jpg",
                mimetype: "image/jpeg",
            }, ],
        };
        ImageService.upload.mockResolvedValue(mockResponse);

        await ImageController.upload(mockReq, mockRes, mockNext);

        // Validate service call
        expect(ImageService.upload).toHaveBeenCalledWith({
            ...mockReq.body,
            images: mockReq.files,
        });

        // Validate response
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.send).toHaveBeenCalledWith({
            status: "success",
            code: 201,
            message: "Gambar berhasil diunggah",
            data: mockResponse,
        });
    });

    test("should handle errors gracefully", async() => {
        // Mock service to throw an error
        const mockError = new Error("Something went wrong");
        ImageService.upload.mockRejectedValue(mockError);

        await ImageController.upload(mockReq, mockRes, mockNext);

        // Validate error handling
        expect(mockNext).toHaveBeenCalledWith(mockError);
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.send).not.toHaveBeenCalled();
    });
});