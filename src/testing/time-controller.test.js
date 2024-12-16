import { TimeController } from "../controller/time-controller.js";
import { TimeService } from "../service/time-service.js";

jest.mock("../service/time-service.js");

describe("TimeController", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: { time: "10:00" },
            params: { timeId: "1" },
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

    describe("create", () => {
        test("should create a new time successfully", async() => {
            const mockResponse = { id: 1, time: "10:00" };
            TimeService.create.mockResolvedValue(mockResponse);

            await TimeController.create(mockReq, mockRes, mockNext);

            expect(TimeService.create).toHaveBeenCalledWith(mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 201,
                message: "Waktu berhasil ditambahkan",
                data: mockResponse,
            });
        });

        test("should handle errors during creation", async() => {
            const mockError = new Error("Unable to create time");
            TimeService.create.mockRejectedValue(mockError);

            await TimeController.create(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("delete", () => {
        test("should delete a time successfully", async() => {
            TimeService.delete.mockResolvedValue();

            await TimeController.delete(mockReq, mockRes, mockNext);

            expect(TimeService.delete).toHaveBeenCalledWith(Number(mockReq.params.timeId));
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Waktu berhasil dihapus",
            });
        });

        test("should handle errors during deletion", async() => {
            const mockError = new Error("Unable to delete time");
            TimeService.delete.mockRejectedValue(mockError);

            await TimeController.delete(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("fetchAll", () => {
        test("should fetch all times successfully", async() => {
            const mockResponse = [
                { id: 1, time: "10:00" },
                { id: 2, time: "11:00" },
            ];
            TimeService.fetchAll.mockResolvedValue(mockResponse);

            await TimeController.fetchAll(mockReq, mockRes, mockNext);

            expect(TimeService.fetchAll).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Waktu berhasil didapatkan",
                data: mockResponse,
            });
        });

        test("should handle errors during fetching", async() => {
            const mockError = new Error("Unable to fetch times");
            TimeService.fetchAll.mockRejectedValue(mockError);

            await TimeController.fetchAll(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });
});