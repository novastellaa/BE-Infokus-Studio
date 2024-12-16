import { AuthController } from "../controller/auth-controller.js";
import { AuthService } from "../service/auth-service.js";

jest.mock("../service/auth-service.js");
jest.mock("oslo/password", () => {
    return {
        Bcrypt: jest.fn().mockImplementation(() => ({
            hash: jest.fn().mockResolvedValue("hashedPassword"),
            compare: jest.fn().mockResolvedValue(true),
        })),
    };
});


describe("AuthController", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, user: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe("register", () => {
        it("should register a user and return success response", async() => {
            const mockResponse = { id: 1, username: "user1" };
            AuthService.register.mockResolvedValue(mockResponse);

            req.body = { username: "user1", password: "password123" };

            await AuthController.register(req, res, next);

            expect(AuthService.register).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 201,
                message: "User berhasil didaftarkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            AuthService.register.mockRejectedValue(error);

            await AuthController.register(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("login", () => {
        it("should login a user and return success response", async() => {
            const mockResponse = { token: "jwt_token" };
            AuthService.login.mockResolvedValue(mockResponse);

            req.body = { username: "user1", password: "password123" };

            await AuthController.login(req, res, next);

            expect(AuthService.login).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Login berhasil",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            AuthService.login.mockRejectedValue(error);

            await AuthController.login(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("me", () => {
        it("should return user data and return success response", async() => {
            const mockResponse = { id: 1, username: "user1" };
            AuthService.me.mockResolvedValue(mockResponse);

            req.user = { id: 1 };

            await AuthController.me(req, res, next);

            expect(AuthService.me).toHaveBeenCalledWith(req.user.id);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "User berhasil didapatkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            AuthService.me.mockRejectedValue(error);

            await AuthController.me(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});