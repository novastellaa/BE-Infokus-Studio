import { prisma } from "../application/db.js";
import { PackageService } from "../service/package-service.js";

// Mock Prisma
jest.mock("../application/db.js", () => ({
    prisma: {
        categoryPackage: {
            create: jest.fn(),
        },
        category: {
            findFirst: jest.fn(),
        },
    },
}));

describe("PackageService", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test("should create a package successfully", async() => {
        // Mock kategori ditemukan
        prisma.category.findFirst.mockResolvedValue({
            id: 1,
            name: "Kategori A",
        });

        // Mock untuk create package
        prisma.categoryPackage.create.mockResolvedValue({
            id: 1,
            name: "Paket A",
            description: "Deskripsi Paket A",
            price: 1000,
            category: {
                id: 1,
                name: "Kategori A",
            },
        });

        // Data request
        const request = {
            name: "Paket A",
            description: "Deskripsi Paket A",
            price: 1000,
            categoryId: 1,
        };

        // Panggil service
        const result = await PackageService.create(request);

        // Validasi parameter prisma
        expect(prisma.category.findFirst).toHaveBeenCalledWith({
            where: { id: 1, deletedAt: null },
        });
        expect(prisma.categoryPackage.create).toHaveBeenCalledWith({
            data: request,
            select: {
                id: true,
                name: true,
                description: true,
                price: true,
                category: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });

        // Validasi hasil
        expect(result).toEqual({
            id: 1,
            name: "Paket A",
            description: "Deskripsi Paket A",
            price: 1000,
            category: {
                id: 1,
                name: "Kategori A",
            },
        });
    });

    test("should throw error if category does not exist", async() => {
        // Mock kategori tidak ditemukan
        prisma.category.findFirst.mockResolvedValue(null);

        const request = {
            name: "Paket A",
            description: "Deskripsi Paket A",
            price: 1000,
            categoryId: 99,
        };

        // Panggil service dan cek error
        await expect(PackageService.create(request)).rejects.toThrow("Kategori tidak ditemukan");

        // Validasi parameter prisma
        expect(prisma.category.findFirst).toHaveBeenCalledWith({
            where: { id: 99, deletedAt: null },
        });
    });
});