"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCicleValidator = void 0;
const zod_1 = require("zod");
const enums_1 = require("../../../../shared/domain/enums");
const createCicleValidator = (req, res, next) => {
    if (typeof req.body.flow === 'string') {
        req.body.flow = req.body.flow.toUpperCase();
    }
    const dateType = zod_1.z.string().refine((date) => dateRegex.test(date), {
        message: 'Invalid date, Enter a date in yyyy/mm/dd format ',
    });
    const flowEnum = zod_1.z.nativeEnum(enums_1.Flow).refine((val) => Object.values(enums_1.Flow).includes(val), {
        message: "Flow must be 'Ligth', 'Moderate' or 'Intense'",
    });
    const dateRegex = /^20\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/;
    const symptomsType = zod_1.z.array(zod_1.z.nativeEnum(enums_1.Symptoms));
    const scheme = zod_1.z.object({
        startDate: dateType,
        endDate: dateType,
        flow: flowEnum,
        symptoms: symptomsType.optional(),
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
exports.createCicleValidator = createCicleValidator;
