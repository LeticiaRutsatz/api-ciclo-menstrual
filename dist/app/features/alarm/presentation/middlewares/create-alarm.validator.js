"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAlarmValidator = void 0;
const zod_1 = require("zod");
const createAlarmValidator = (req, res, next) => {
    const timeType = zod_1.z.string().refine((time) => timeRegex.test(time), {
        message: 'Invalid time, Enter a time in HH:MM:SS format ',
    });
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    const scheme = zod_1.z.object({
        alarmTime: timeType,
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
exports.createAlarmValidator = createAlarmValidator;
