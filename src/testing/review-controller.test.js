import { ReviewController } from "../controller/review-controller.js";
import { ReviewService } from "../service/review-service.js";

jest.mock("../service/review-service.js");

describe("ReviewController", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: { rating: 5, comment: "Excellent service!" },
            params: { reservationId: "1" },
            user: { id: 101 },
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockNext = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should create a review successfully", async() => {
        const mockResponse = { id: 1, rating: 5, comment: "Excellent service!", userId: 101 };
        ReviewService.create.mockResolvedValue(mockResponse);

        await ReviewController.create(mockReq, mockRes, mockNext);

        expect(ReviewService.create).toHaveBeenCalledWith(mockReq.body, mockReq.user);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 201,
            message: "Review berhasil dibuat",
            data: mockResponse,
        });
    });

    test("should get a review by reservation ID", async() => {
        const mockResponse = { id: 1, rating: 5, comment: "Excellent service!", reservationId: 1 };
        ReviewService.get.mockResolvedValue(mockResponse);

        await ReviewController.get(mockReq, mockRes, mockNext);

        expect(ReviewService.get).toHaveBeenCalledWith(Number(mockReq.params.reservationId), mockReq.user);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Review berhasil didapatkan",
            data: mockResponse,
        });
    });

    test("should fetch all reviews", async() => {
        const mockResponse = [
            { id: 1, rating: 5, comment: "Excellent service!" },
            { id: 2, rating: 4, comment: "Good service!" },
        ];
        ReviewService.fetchAll.mockResolvedValue(mockResponse);

        await ReviewController.fetchAll(mockReq, mockRes, mockNext);

        expect(ReviewService.fetchAll).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Review berhasil didapatkan",
            data: mockResponse,
        });
    });

    test("should fetch some reviews", async() => {
        const mockResponse = [
            { id: 1, rating: 5, comment: "Excellent service!" },
            { id: 3, rating: 3, comment: "Average experience." },
        ];
        ReviewService.fetchSome.mockResolvedValue(mockResponse);

        await ReviewController.fetchSome(mockReq, mockRes, mockNext);

        expect(ReviewService.fetchSome).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Review berhasil didapatkan",
            data: mockResponse,
        });
    });

    test("should handle errors gracefully for create", async() => {
        const mockError = new Error("Unable to create review");
        ReviewService.create.mockRejectedValue(mockError);

        await ReviewController.create(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    test("should handle errors gracefully for get", async() => {
        const mockError = new Error("Review not found");
        ReviewService.get.mockRejectedValue(mockError);

        await ReviewController.get(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    test("should handle errors gracefully for fetchAll", async() => {
        const mockError = new Error("Unable to fetch reviews");
        ReviewService.fetchAll.mockRejectedValue(mockError);

        await ReviewController.fetchAll(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    test("should handle errors gracefully for fetchSome", async() => {
        const mockError = new Error("Unable to fetch some reviews");
        ReviewService.fetchSome.mockRejectedValue(mockError);

        await ReviewController.fetchSome(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(mockError);
    });
});