"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cicleExitsCicleValidator = void 0;
const http_helper_1 = require("../../../../shared/adapter/http.helper");
const repositories_1 = require("../../infra/repositories");
const cicleExitsCicleValidator = async (req, res, next) => {
    const { userId } = req.params;
    const { startDate, endDate, flow } = req.body;
    const response = new http_helper_1.ResponseHelper();
    const cicleRepository = new repositories_1.CicleRepository();
    const cicleExist = await cicleRepository.verifyCicleExits({ userId, startDate, endDate, flow });
    if (cicleExist) {
        return response.badRequest('This cicle already exists in this account!', res);
    }
    next();
};
exports.cicleExitsCicleValidator = cicleExitsCicleValidator;
