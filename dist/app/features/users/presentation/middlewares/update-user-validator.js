"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserValidator = void 0;
const zod_1 = require("zod");
const http_helper_1 = require("../../../../shared/adapter/http.helper");
const updateUserValidator = async (req, res, next) => {
    const { email, password } = req.body;
    const response = new http_helper_1.ResponseHelper();
    const scheme = zod_1.z
        .object({
        email: zod_1.z.string().email().optional(),
        password: zod_1.z.string().min(8).optional(),
    })
        .strip();
    try {
        const data = scheme.parse(req.body);
        Object.assign(req.body, data);
        return next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res.status(400).json({
                error: error.issues.map((issue) => ({
                    campo: issue.path[0],
                    mensagem: issue.message,
                    codigo: issue.code,
                })),
            });
        }
        throw error;
    }
};
exports.updateUserValidator = updateUserValidator;
