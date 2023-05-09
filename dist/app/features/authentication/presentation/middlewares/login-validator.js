"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserValidator = void 0;
const zod_1 = require("zod");
const loginUserValidator = (req, res, next) => {
    const scheme = zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().nonempty(),
    });
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
exports.loginUserValidator = loginUserValidator;
