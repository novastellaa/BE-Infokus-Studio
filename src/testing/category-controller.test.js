import { CategoryController } from "../controller/category-controller.js";
import { CategoryService } from "../service/category-service.js";

// Mock CategoryService methods
jest.mock("../service/category-service.js");

describe("CategoryController", () => {
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
        it("should create a category and return success response", async() => {
            const mockResponse = { id: 1, name: "New Category" };
            CategoryService.create.mockResolvedValue(mockResponse);

            req.body = { name: "New Category" };

            await CategoryController.create(req, res, next);

            expect(CategoryService.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 201,
                message: "Kategori berhasil ditambahkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            CategoryService.create.mockRejectedValue(error);

            await CategoryController.create(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("get", () => {
        it("should get a category by ID and return success response", async() => {
            const mockResponse = { id: 1, name: "Category 1" };
            CategoryService.get.mockResolvedValue(mockResponse);

            req.params.categoryId = 1;

            await CategoryController.get(req, res, next);

            expect(CategoryService.get).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Kategori berhasil didapatkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            CategoryService.get.mockRejectedValue(error);

            await CategoryController.get(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("update", () => {
        it("should update a category and return success response", async() => {
            const mockResponse = { id: 1, name: "Updated Category" };
            CategoryService.update.mockResolvedValue(mockResponse);

            req.body = { name: "Updated Category" };
            req.params.categoryId = 1;

            await CategoryController.update(req, res, next);

            expect(CategoryService.update).toHaveBeenCalledWith({
                ...req.body,
                categoryId: 1,
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Kategori berhasil diubah",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            CategoryService.update.mockRejectedValue(error);

            await CategoryController.update(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("delete", () => {
        it("should delete a category and return success response", async() => {
            CategoryService.delete.mockResolvedValue();

            req.params.categoryId = 1;

            await CategoryController.delete(req, res, next);

            expect(CategoryService.delete).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Kategori berhasil dihapus",
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            CategoryService.delete.mockRejectedValue(error);

            await CategoryController.delete(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("fetchAll", () => {
        it("should fetch all categories and return success response", async() => {
            const mockResponse = [{ id: 1, name: "Category 1" }];
            CategoryService.fetchAll.mockResolvedValue(mockResponse);

            await CategoryController.fetchAll(req, res, next);

            expect(CategoryService.fetchAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Kategori berhasil didapatkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            CategoryService.fetchAll.mockRejectedValue(error);

            await CategoryController.fetchAll(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getLatest", () => {
        it("should get the latest category and return success response", async() => {
            const mockResponse = { id: 1, name: "Latest Category" };
            CategoryService.getLatest.mockResolvedValue(mockResponse);

            await CategoryController.getLatest(req, res, next);

            expect(CategoryService.getLatest).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Kategori terbaru berhasil didapatkan",
                data: mockResponse,
            });
        });

        it("should call next with an error if service fails", async() => {
            const error = new Error("Service Error");
            CategoryService.getLatest.mockRejectedValue(error);

            await CategoryController.getLatest(req, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});