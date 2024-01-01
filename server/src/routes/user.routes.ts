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

userRoutes.post("/hi", async(req, res) => {
  res.cookie("habibhi", "asdajsdasd", {
    httpOnly: true,
    secure: true,
    sameSite: "none"
  })
  return res.status(200).json({err: "False"})
})

// userRoutes.get(
//   UserRoutesEnum.GET_USER,
//   // UserMiddleware.authenticate,
//   async (req, res) => {
//     return res
//       .status(200)
//       .json({ user: { name: "Giorgi", lastname: "Shalamberidze", email: "gigi.shalamberidze2020@gmail.com" } });
//   }
// );

export default userRoutes;
