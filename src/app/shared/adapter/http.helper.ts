import { Response, Request } from 'express';

export class ResponseHelper {
  success(message: string, res: Response, data?: any) {
    return res.status(201).json({
      message: message,
      success: true,
      data: data,
    });
  }

  badRequest(message: string, res: Response, data?: any) {
    return res.status(400).json({
      message: message,
      success: false,
      data: data,
    });
  }

  error(message: string, res: Response, data?: any) {
    return res.status(500).json({
      message: message,
      success: false,
      data: data,
    });
  }
}
