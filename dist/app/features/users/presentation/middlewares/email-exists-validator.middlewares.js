"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailExistsValidator = void 0;
const repositories_1 = require("../../../../shared/repositories");
const emailExistsValidator = async (req, res, next) => {
    const { email } = req.body;
    if (email) {
        const repository = new repositories_1.UserSharedRepository();
        const exists = await repository.searchEmail(email);
        if (exists) {
            return res.status(404).json({
                message: 'email already in use!',
                success: true,
            });
        }
    }
    next();
};
exports.emailExistsValidator = emailExistsValidator;
