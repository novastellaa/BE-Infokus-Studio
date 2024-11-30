import { AddonController } from "../controller/addon-controller.js";
import { AddonService } from "../service/addon-service.js";

jest.mock("../service/addon-service.js");

describe("AddonController", () => {
    let res, next;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();
    });

    describe("create", () => {
        it("should return a success response when creating an addon", async() => {
            const request = { name: "Addon 1", price: 100 };
            const response = { id: 1, ...request };

            AddonService.create.mockResolvedValue(response);

            await AddonController.create({ body: request }, res, next);

            expect(AddonService.create).toHaveBeenCalledWith(request);
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                code: 201,
                message: "Tambahan berhasil dibuat",
                data: response,
            });
        });

        it("should call next with an error if creating an addon fails", async() => {
            const error = new Error("Something went wrong");
            AddonService.create.mockRejectedValue(error);

            await AddonController.create({ body: {} }, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("update", () => {
        it("should return a success response when updating an addon", async() => {
            const request = { name: "Updated Addon", price: 150, addonId: 1 };
            const response = { id: 1, ...request };

            AddonService.update.mockResolvedValue(response);

            await AddonController.update({ body: request, params: { addonId: 1 } }, res, next);

            expect(AddonService.update).toHaveBeenCalledWith(request);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Tambahan berhasil diubah",
                data: response,
            });
        });

        it("should call next with an error if updating an addon fails", async() => {
            const error = new Error("Something went wrong");
            AddonService.update.mockRejectedValue(error);

            await AddonController.update({ body: {}, params: { addonId: 1 } }, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("delete", () => {
        it("should return a success response when deleting an addon", async() => {
            AddonService.delete.mockResolvedValue();

            await AddonController.delete({ params: { addonId: 1 } }, res, next);

            expect(AddonService.delete).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Tambahan berhasil dihapus",
            });
        });

        it("should call next with an error if deleting an addon fails", async() => {
            const error = new Error("Something went wrong");
            AddonService.delete.mockRejectedValue(error);

            await AddonController.delete({ params: { addonId: 1 } }, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("get", () => {
        it("should return a success response when fetching an addon by ID", async() => {
            const response = { id: 1, name: "Addon 1", price: 100 };
            AddonService.get.mockResolvedValue(response);

            await AddonController.get({ params: { addonId: 1 } }, res, next);

            expect(AddonService.get).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Tambahan berhasil ditemukan",
                data: response,
            });
        });

        it("should call next with an error if fetching an addon by ID fails", async() => {
            const error = new Error("Addon not found");
            AddonService.get.mockRejectedValue(error);

            await AddonController.get({ params: { addonId: 1 } }, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("fetchAll", () => {
        it("should return a success response when fetching all addons", async() => {
            const response = [{ id: 1, name: "Addon 1", price: 100 }];
            AddonService.fetchAll.mockResolvedValue(response);

            await AddonController.fetchAll({}, res, next);

            expect(AddonService.fetchAll).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Tambahan berhasil ditemukan",
                data: response,
            });
        });

        it("should call next with an error if fetching all addons fails", async() => {
            const error = new Error("Error fetching addons");
            AddonService.fetchAll.mockRejectedValue(error);

            await AddonController.fetchAll({}, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe("getAddonByCategory", () => {
        it("should return a success response when fetching addons by category", async() => {
            const response = [{ id: 1, name: "Addon 1", price: 100 }];
            AddonService.getAddonByCategory.mockResolvedValue(response);

            await AddonController.getAddonByCategory({ params: { categoryId: 1 } }, res, next);

            expect(AddonService.getAddonByCategory).toHaveBeenCalledWith(1);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({
                status: "success",
                code: 200,
                message: "Tambahan berhasil ditemukan",
                data: response,
            });
        });

        it("should call next with an error if fetching addons by category fails", async() => {
            const error = new Error("Error fetching addons by category");
            AddonService.getAddonByCategory.mockRejectedValue(error);

            await AddonController.getAddonByCategory({ params: { categoryId: 1 } }, res, next);

            expect(next).toHaveBeenCalledWith(error);
        });
    });
});