const { CategoryController } = require("../controller/category-controller.js");
const { CategoryService } = require("../service/category-service.js");

// Mock Response dan Request
const mockRequest = (body = {}, params = {}) => ({
    body,
    params,
});

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

jest.mock("../service/category-service.js");

describe("CategoryController", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("create", () => {
        it("should create a category successfully", async() => {
            const req = mockRequest({ name: "New Category", images: ["image1.png"] });
            const res = mockResponse();

            const mockCategory = { id: 1, name: "New Category", images: ["image1.png"] };
            CategoryService.create.mockResolvedValue(mockCategory);

            await CategoryController.create(req, res, mockNext);

            expect(CategoryService.create).toHaveBeenCalledWith(req.body);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 201,
                message: "Kategori berhasil ditambahkan",
                data: mockCategory,
            });
        });

        it("should handle errors in creating category", async() => {
            const req = mockRequest({ name: "Invalid Category" });
            const res = mockResponse();
            const error = new Error("Validation failed");

            CategoryService.create.mockRejectedValue(error);

            await CategoryController.create(req, res, mockNext);

            expect(CategoryService.create).toHaveBeenCalledWith(req.body);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe("get", () => {
        it("should return a category by ID", async() => {
            const req = mockRequest({}, { categoryId: 1 });
            const res = mockResponse();

            const mockCategory = { id: 1, name: "Category 1", images: [] };
            CategoryService.get.mockResolvedValue(mockCategory);

            await CategoryController.get(req, res, mockNext);

            expect(CategoryService.get).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Kategori berhasil didapatkan",
                data: mockCategory,
            });
        });

        it("should handle errors in getting category", async() => {
            const req = mockRequest({}, { categoryId: 1 });
            const res = mockResponse();
            const error = new Error("Not found");

            CategoryService.get.mockRejectedValue(error);

            await CategoryController.get(req, res, mockNext);

            expect(CategoryService.get).toHaveBeenCalledWith(1);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });

    describe("delete", () => {
        it("should delete a category successfully", async() => {
            const req = mockRequest({}, { categoryId: 1 });
            const res = mockResponse();

            CategoryService.delete.mockResolvedValue();

            await CategoryController.delete(req, res, mockNext);

            expect(CategoryService.delete).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Kategori berhasil dihapus",
            });
        });

        it("should handle errors in deleting category", async() => {
            const req = mockRequest({}, { categoryId: 1 });
            const res = mockResponse();
            const error = new Error("Delete failed");

            CategoryService.delete.mockRejectedValue(error);

            await CategoryController.delete(req, res, mockNext);

            expect(CategoryService.delete).toHaveBeenCalledWith(1);
            expect(mockNext).toHaveBeenCalledWith(error);
        });
    });
});