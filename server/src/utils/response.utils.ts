import { Response } from "express";

class SendResponse {
  private res: Response;

  constructor(res: Response) {
    this.res = res;
  }

  sendSuccess(data: any, status: number = 200) {
    return this.res.status(status).json({
      success: true,
      data,
    });
  }
  sendError(message: string, status: number = 500) {
    return this.res.status(status).json({
      success: false,
      error: {
        message,
      },
    });
  }
  sendUnauthorized(message: string = "Unauthorized") {
    return this.res.status(401).json({
      success: false,
      msg: message,
    });
  }
}

export default SendResponse;
