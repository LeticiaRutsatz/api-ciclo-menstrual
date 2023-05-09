"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidator = void 0;
const zod_1 = require("zod");
const createUserValidator = (req, res, next) => {
    const dateType = zod_1.z.string().refine((date) => dateRegex.test(date), {
        message: 'Invalid date, Enter a date in dd/mm/yyyy format ',
    });
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const scheme = zod_1.z
        .object({
        name: zod_1.z.string().nonempty(),
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
        birthDate: dateType,
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
exports.createUserValidator = createUserValidator;
