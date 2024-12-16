import { TransactionController } from "../controller/transaction-controller.js";
import { TransactionService } from "../service/transaction-service.js";

jest.mock("../service/transaction-service.js");

describe("TransactionController", () => {
    let mockReq, mockRes, mockNext;

    beforeEach(() => {
        mockReq = {
            body: { amount: 1000 },
            params: { transactionId: "1", transactionDetailId: "2", reservationId: "3" },
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
        test("should create a transaction successfully", async() => {
            const mockResponse = { id: 1, amount: 1000 };
            TransactionService.create.mockResolvedValue(mockResponse);

            await TransactionController.create(mockReq, mockRes, mockNext);

            expect(TransactionService.create).toHaveBeenCalledWith(mockReq.body);
            expect(mockRes.status).toHaveBeenCalledWith(201);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 201,
                message: "Transaksi berhasil ditambahkan",
                data: mockResponse,
            });
        });

        test("should handle errors during creation", async() => {
            const mockError = new Error("Unable to create transaction");
            TransactionService.create.mockRejectedValue(mockError);

            await TransactionController.create(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("pay", () => {
        test("should process payment successfully", async() => {
            const mockResponse = { id: 1, status: "paid" };
            TransactionService.pay.mockResolvedValue(mockResponse);

            await TransactionController.pay(mockReq, mockRes, mockNext);

            expect(TransactionService.pay).toHaveBeenCalledWith({
                ...mockReq.body,
                transactionId: 1,
            });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Bukti pembayaran berhasil dikirim",
                data: mockResponse,
            });
        });

        test("should handle errors during payment", async() => {
            const mockError = new Error("Payment failed");
            TransactionService.pay.mockRejectedValue(mockError);

            await TransactionController.pay(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("get", () => {
        test("should get a transaction successfully", async() => {
            const mockResponse = { id: 1, amount: 1000 };
            TransactionService.get.mockResolvedValue(mockResponse);

            await TransactionController.get(mockReq, mockRes, mockNext);

            expect(TransactionService.get).toHaveBeenCalledWith(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Transaksi berhasil ditemukan",
                data: mockResponse,
            });
        });

        test("should handle errors during fetching a transaction", async() => {
            const mockError = new Error("Transaction not found");
            TransactionService.get.mockRejectedValue(mockError);

            await TransactionController.get(mockReq, mockRes, mockNext);

            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("setValid", () => {
        test("should validate a transaction successfully", async() => {
            const mockResponse = { id: 1, status: "valid" };
            TransactionService.setValid.mockResolvedValue(mockResponse);

            await TransactionController.setValid(mockReq, mockRes, mockNext);

            expect(TransactionService.setValid).toHaveBeenCalledWith({
                ...mockReq.body,
                transactionId: 1,
                transactionDetailId: 2,
            });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Transaksi berhasil divalidasi",
                data: mockResponse,
            });
        });
    });

    describe("setInvalid", () => {
        test("should invalidate a transaction successfully", async() => {
            const mockResponse = { id: 1, status: "invalid" };
            TransactionService.setInvalid.mockResolvedValue(mockResponse);

            await TransactionController.setInvalid(mockReq, mockRes, mockNext);

            expect(TransactionService.setInvalid).toHaveBeenCalledWith({
                ...mockReq.body,
                transactionId: 1,
                transactionDetailId: 2,
            });
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Transaksi berhasil divalidasi",
                data: mockResponse,
            });
        });
    });

    describe("setPaidOff", () => {
        test("should mark a transaction as paid off successfully", async() => {
            const mockResponse = { id: 1, status: "paid off" };
            TransactionService.setPaidOff.mockResolvedValue(mockResponse);

            await TransactionController.setPaidOff(mockReq, mockRes, mockNext);

            expect(TransactionService.setPaidOff).toHaveBeenCalledWith(1);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Transaksi telah diselesaikan",
                data: mockResponse,
            });
        });
    });

    describe("getTransactionByReservation", () => {
        test("should get transaction by reservation successfully", async() => {
            const mockResponse = [{ id: 1, reservationId: 3 }];
            TransactionService.getTransactionByReservation.mockResolvedValue(
                mockResponse
            );

            await TransactionController.getTransactionByReservation(
                mockReq,
                mockRes,
                mockNext
            );

            expect(TransactionService.getTransactionByReservation).toHaveBeenCalledWith(3);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Transaksi berhasil ditemukan",
                data: mockResponse,
            });
        });
    });

    describe("fetchAll", () => {
        test("should fetch all transactions successfully", async() => {
            const mockResponse = [
                { id: 1, amount: 1000 },
                { id: 2, amount: 2000 },
            ];
            TransactionService.fetchAll.mockResolvedValue(mockResponse);

            await TransactionController.fetchAll(mockReq, mockRes, mockNext);

            expect(TransactionService.fetchAll).toHaveBeenCalled();
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Transaksi berhasil didapatkan",
                data: mockResponse,
            });
        });
    });
});