"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CicleController = void 0;
const http_helper_1 = require("../../../../shared/adapter/http.helper");
const cicle_usecase_1 = require("../../domain/usecases/cicle.usecase");
const repositories_1 = require("../../infra/repositories");
class CicleController {
    async createCicle(req, res) {
        const { userId } = req.params;
        const { startDate, endDate, flow, symptoms } = req.body;
        const response = new http_helper_1.ResponseHelper();
        const useCase = new cicle_usecase_1.CicleUseCase();
        console.log('symptomns', symptoms);
        const cicle = await useCase.execute({ startDate, endDate, flow, userId, symptoms });
        console.log('cicle', cicle);
        return response.success('Cicle created successfully!', res, cicle);
    }
    async getCicles(req, res) {
        const { id, userId } = req.params;
        const cicleRepository = new repositories_1.CicleRepository();
        const response = new http_helper_1.ResponseHelper();
        try {
            if (!id) {
                if (req.user.email != process.env.ADMIN_EMAIL || req.user.id != process.env.ADMIN_ID) {
                    return response.badRequest('You do not have the necessary access!', res);
                }
                const users = await cicleRepository.getAllCicles();
                return response.success('All cicles from the application!', res, users);
            }
            const cicle = await cicleRepository.getCicleById(id, userId);
            if (!cicle) {
                return response.badRequest('this ID do not exist!', res);
            }
            return response.success('Cicle search with success!', res, cicle);
        }
        catch (err) {
            return response.error('Error getting users!', res, err);
        }
    }
    async deleteCiclebyId(req, res) {
        const { id, userId } = req.params;
        const response = new http_helper_1.ResponseHelper();
        const cicleRepository = new repositories_1.CicleRepository();
        if (req.user.email != process.env.ADMIN_EMAIL || req.user.id != process.env.ADMIN_ID) {
            return response.badRequest('You do not have the necessary access!', res);
        }
        try {
            const cicleDeleted = await cicleRepository.getCicleById(id, userId);
            await cicleRepository.deleteCiclebyId(id);
            return response.success('Cicle deleted!', res, cicleDeleted);
        }
        catch (err) {
            return response.error('Error deleting cicle!', res, err);
        }
    }
}
exports.CicleController = CicleController;
