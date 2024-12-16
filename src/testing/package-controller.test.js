import { PackageController } from "../controller/package-controller.js";
import { PackageService } from "../service/package-service.js";

jest.mock("../service/package-service.js");

describe("PackageController", () => {
    let req, res, next;

    beforeEach(() => {
        req = { body: {}, params: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe("create", () => {
        it("should create a package and return success response", async() => {
            const mockResponse = { id: 1, name: "Package 1" };
            PackageService.create.mockResolvedValue(mockResponse);

            req.body = { name: "Package 1" };

            await PackageController.create(req, res, next);

            expect(PackageService.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 201,
                message: "Paket berhasil ditambahkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            PackageService.create.mockRejectedValue(error);

            await PackageController.create(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("get", () => {
        it("should get a package and return success response", async() => {
            const mockResponse = { id: 1, name: "Package 1" };
            PackageService.get.mockResolvedValue(mockResponse);

            req.params.packageId = "1";

            await PackageController.get(req, res, next);

            expect(PackageService.get).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Paket berhasil didapatkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            PackageService.get.mockRejectedValue(error);

            await PackageController.get(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("update", () => {
        it("should update a package and return success response", async() => {
            const mockResponse = { id: 1, name: "Updated Package" };
            PackageService.update.mockResolvedValue(mockResponse);

            req.params.packageId = "1";
            req.body = { name: "Updated Package" };

            await PackageController.update(req, res, next);

            expect(PackageService.update).toHaveBeenCalledWith({
                packageId: 1,
                name: "Updated Package",
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Paket berhasil diubah",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            PackageService.update.mockRejectedValue(error);

            await PackageController.update(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("delete", () => {
        it("should delete a package and return success response", async() => {
            req.params.packageId = "1";

            await PackageController.delete(req, res, next);

            expect(PackageService.delete).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Paket berhasil dihapus",
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            PackageService.delete.mockRejectedValue(error);

            await PackageController.delete(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("fetchAll", () => {
        it("should fetch all packages and return success response", async() => {
            const mockResponse = [
                { id: 1, name: "Package 1" },
                { id: 2, name: "Package 2" },
            ];
            PackageService.fetchAll.mockResolvedValue(mockResponse);

            await PackageController.fetchAll(req, res, next);

            expect(PackageService.fetchAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Paket berhasil didapatkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            PackageService.fetchAll.mockRejectedValue(error);

            await PackageController.fetchAll(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});