import { ReservationController } from "../controller/reservation-controller.js";
import { ReservationService } from "../service/reservation-service.js";

jest.mock("../service/reservation-service.js");

describe("ReservationController", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: { name: "Test Reservation", date: "2024-12-20" },
            params: { reservationId: "1" },
            query: { date: "2024-12-20" },
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

    test("should create a reservation successfully", async() => {
        const mockResponse = { id: 1, name: "Test Reservation", date: "2024-12-20" };
        ReservationService.create.mockResolvedValue(mockResponse);

        await ReservationController.create(mockReq, mockRes, mockNext);

        expect(ReservationService.create).toHaveBeenCalledWith(mockReq.body, mockReq.user);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 201,
            message: "Reservasi berhasil ditambahkan",
            data: mockResponse,
        });
    });

    test("should set reservation as success", async() => {
        const mockResponse = { id: 1, status: "success" };
        ReservationService.setSuccess.mockResolvedValue(mockResponse);

        await ReservationController.setSuccess(mockReq, mockRes, mockNext);

        expect(ReservationService.setSuccess).toHaveBeenCalledWith(mockReq.params.reservationId);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Reservasi telah selesai",
            data: mockResponse,
        });
    });

    test("should set reservation as canceled", async() => {
        const mockResponse = { id: 1, status: "canceled" };
        ReservationService.setCancel.mockResolvedValue(mockResponse);

        await ReservationController.setCancel(mockReq, mockRes, mockNext);

        expect(ReservationService.setCancel).toHaveBeenCalledWith(mockReq.params.reservationId);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Reservasi telah dibatalkan",
            data: mockResponse,
        });
    });

    test("should fetch all reservations", async() => {
        const mockResponse = [{ id: 1, name: "Test Reservation" }];
        ReservationService.fetchAll.mockResolvedValue(mockResponse);

        await ReservationController.fetchAll(mockReq, mockRes, mockNext);

        expect(ReservationService.fetchAll).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Reservasi berhasil didapatkan",
            data: mockResponse,
        });
    });

    test("should get reservations by date", async() => {
        const mockResponse = [{ id: 1, name: "Test Reservation", date: "2024-12-20" }];
        ReservationService.getReservationByDate.mockResolvedValue(mockResponse);

        await ReservationController.getReservationByDate(mockReq, mockRes, mockNext);

        expect(ReservationService.getReservationByDate).toHaveBeenCalledWith(mockReq.query.date);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Reservasi hari ini berhasil didapatkan",
            data: mockResponse,
        });
    });

    test("should get reservation by ID", async() => {
        const mockResponse = { id: 1, name: "Test Reservation" };
        ReservationService.get.mockResolvedValue(mockResponse);

        await ReservationController.get(mockReq, mockRes, mockNext);

        expect(ReservationService.get).toHaveBeenCalledWith(mockReq.params.reservationId);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Reservasi berhasil didapatkan",
            data: mockResponse,
        });
    });

    test("should get reservations by user", async() => {
        const mockResponse = [{ id: 1, name: "User Reservation", userId: 101 }];
        ReservationService.getReservationByUser.mockResolvedValue(mockResponse);

        await ReservationController.getReservationByUser(mockReq, mockRes, mockNext);

        expect(ReservationService.getReservationByUser).toHaveBeenCalledWith(mockReq.user.id);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 200,
            message: "Reservasi berhasil didapatkan",
            data: mockResponse,
        });
    });

    test("should handle errors gracefully", async() => {
        const mockError = new Error("Something went wrong");
        ReservationService.create.mockRejectedValue(mockError);

        await ReservationController.create(mockReq, mockRes, mockNext);

        expect(mockNext).toHaveBeenCalledWith(mockError);
    });
});