import { NextFunction, Request, Response } from "express";
// Models
import User from "@/models/user.model";
// Types
import { ResponsePromise } from "@/types/controller/controller.types";
// Utils
import JWT from "@/utils/jwt.utils";
import { UserModelType } from "@/types/models/model.types";
import mongoose from "mongoose";
import SendResponse from "@/utils/response.utils";

class UserMiddleware {
  public async authenticate(
    req: Request,
    res: Response,
    next: NextFunction
  ): ResponsePromise {
    const token = req.cookies["token"];
    const refreshToken = req.cookies["refresh-token"];

    if (!token && !refreshToken) {
        return new SendResponse(res).sendUnauthorized();
    }

    const jwt = new JWT();
    try {
      const decodeToken = jwt.verifyToken(token);
      const user: UserModelType | null = await User.findById(
        decodeToken.userId
      );
      UserMiddleware.sendUserData(user, req, res);
      next();
    } catch (err: any) {
      if (err.name === "TokenExpiredError") {
        try {
          const decodeRefresh = jwt.verifyRefreshToken(refreshToken);
          const user:
            | (UserModelType & { _id: mongoose.Types.ObjectId })
            | null = await User.findById(decodeRefresh.userId);
          UserMiddleware.sendUserData(user, req, res);
          const jwtGenerator = new JWT(user?._id, res);
          jwtGenerator.createToken();
          jwtGenerator.createRefreshToken();
          next();
        } catch (error: any) {
            return new SendResponse(res).sendUnauthorized("Refresh Token Expired");
        }
      } else {
        return new SendResponse(res).sendError(err.message)
      }
    }
  }
  private static sendUserData(
    user: UserModelType | null,
    req: Request,
    res: Response
  ) {
    if (user) {
      const userData = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        country: user.country,
        profile_image: user.profile_image,
      };
      (req as any).user = userData;
    } else {
        return new SendResponse(res).sendUnauthorized();
    }
  }
}

export default new UserMiddleware();
