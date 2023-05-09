"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHelper = void 0;
class ResponseHelper {
    success(message, res, data) {
        return res.status(201).json({
            message: message,
            success: true,
            data: data,
        });
    }
    badRequest(message, res, data) {
        return res.status(400).json({
            message: message,
            success: false,
            data: data,
        });
    }
    error(message, res, data) {
        return res.status(500).json({
            message: message,
            success: false,
            data: data,
        });
    }
}
exports.ResponseHelper = ResponseHelper;
