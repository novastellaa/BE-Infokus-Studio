import { AuthController } from "../controller/auth-controller.js";
import { AuthService } from "../service/auth-service.js";

jest.mock("../service/auth-service.js");
jest.mock("oslo/password", () => ({
    Bcrypt: jest.fn().mockImplementation(() => ({
        hash: jest.fn().mockResolvedValue("hashed_password"),
        verify: jest.fn().mockResolvedValue(true),
    })),
}));

describe("AuthController", () => {
    const mockReq = {};
    const mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
    };
    const mockNext = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should register a user successfully", async() => {
        const mockRequest = { name: "John", email: "john@example.com", password: "123" };
        const mockResponse = { name: "John", email: "john@example.com" };

        mockReq.body = mockRequest;
        AuthService.register.mockResolvedValue(mockResponse);

        await AuthController.register(mockReq, mockRes, mockNext);

        expect(AuthService.register).toHaveBeenCalledWith(mockRequest);
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({
            status: "success",
            code: 201,
            message: "User berhasil didaftarkan",
            data: mockResponse,
        });
    });
});