import type { Response } from "express";
import type { ObjectId } from "mongoose";
import type { UserModelType } from "@/types/models/model.types";
import jwt, {
  JsonWebTokenError,
  Jwt,
  JwtPayload,
  VerifyCallback,
} from "jsonwebtoken";
import mongoose from "mongoose";
import { Token } from "typescript";
import { VerifyJsonWebKeyInput } from "crypto";

class JWT {
  private userId?: mongoose.Types.ObjectId;
  private res?: Response;

  constructor(userId?: mongoose.Types.ObjectId, res?: Response) {
    this.userId = userId;
    this.res = res;
  }

  public createToken(): void {
    const token = jwt.sign({ userId: this.userId }, "SECRET_TOKEN", {
      expiresIn: "1m",
    });
    if (!this.res) return;
    this.res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
  }

  public createRefreshToken(): void {
    const refreshToken = jwt.sign(
      { userId: this.userId },
      "SECRET_REFRESH_TOKEN",
      {
        expiresIn: "1d",
      }
    );
    if (!this.res) return;
    this.res.cookie("refresh-token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });
  }

  public verifyToken(token: string): JwtPayload["user_id"] {
    return jwt.verify(token, "SECRET_TOKEN");
  }
  public verifyRefreshToken(token: string): JwtPayload["user_id"] {
    return jwt.verify(token, "SECRET_REFRESH_TOKEN");
  }
}

export default JWT;
