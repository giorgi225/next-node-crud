import express from "express";
// Enums
import { UserRoutesEnum } from "@/enum/routes.enum";
// Middleware
import UserMiddleware from "@/middleware/user.middleware";

const userRoutes = express.Router();

userRoutes.get(
  UserRoutesEnum.GET_USER,
  UserMiddleware.authenticate,
  async (req, res) => {
    return res.status(200).json({ user: (req as any).user });
  }
);

export default userRoutes;
