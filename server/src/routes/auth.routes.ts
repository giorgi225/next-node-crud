import express from "express";
// Enums
import { AuthRoutesEnum } from "@/enum/routes.enum";
// Controller
import AuthController from "@/controller/auth.controller";
// Middleware
import AuthMiddleware from "@/middleware/auth.middleware";

const authRoutes = express.Router();

// Register
authRoutes.post(
  AuthRoutesEnum.REGISTER,
  AuthMiddleware.validateRegistration,
  AuthController.register
);
// Login
authRoutes.post(
  AuthRoutesEnum.LOGIN,
  AuthMiddleware.validateLogin,
  AuthController.login
);
authRoutes.post(AuthRoutesEnum.LOGOUT, AuthController.logout);

export default authRoutes;
