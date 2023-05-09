"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const repositories_1 = require("../../../../shared/repositories");
const crypto_1 = require("../../../../shared/adapter/crypto");
const jwt_1 = require("../../../../shared/adapter/jwt");
class AuthController {
    async login(req, res) {
        const { email, password } = req.body;
        const repository = new repositories_1.UserSharedRepository();
        const bcrypt = new crypto_1.BCryptPassword();
        const user = await repository.searchEmail(email, true);
        if (!user) {
            return res.status(401).json({
                message: 'Incorrect Email or password!',
                success: false,
            });
        }
        const correctPassword = await bcrypt.comparePassword(password, user.password);
        if (!correctPassword) {
            return res.status(401).json({
                message: 'Incorrect Email or password!',
                success: false,
            });
        }
        const jwtToken = new jwt_1.JwtToken();
        const token = jwtToken.sign({
            id: user.id,
            name: user.name,
            email: user.email,
        });
        return res.status(200).json({
            message: 'Login successful!',
            data: { token, user: { id: user.id, name: user.name, email: user.email } },
            success: true,
        });
    }
}
exports.AuthController = AuthController;
