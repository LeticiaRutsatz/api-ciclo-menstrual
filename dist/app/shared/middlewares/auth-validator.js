"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const http_helper_1 = require("../adapter/http.helper");
const jwt_1 = require("../adapter/jwt");
const jsonwebtoken_1 = require("jsonwebtoken");
const authValidator = (req, res, next) => {
    const response = new http_helper_1.ResponseHelper();
    const jwt = new jwt_1.JwtToken();
    const authorization = req.headers.authorization;
    if (!authorization) {
        return response.badRequest('Please inform a token!', res);
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return response.badRequest('Invalid Token!', res);
    }
    try {
        const auth = jwt.verify(token);
        if (!auth) {
            return response.badRequest('Sorry, you are not authorized!', res);
        }
        req.user = { id: auth.id, email: auth.email };
        return next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
            return response.badRequest('UNAUTHORIZED Token!', res);
        }
        throw error;
    }
};
exports.authValidator = authValidator;
