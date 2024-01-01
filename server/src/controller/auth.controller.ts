import { Request, Response } from "express";
import bcrypt from "bcrypt";
// Models
import User from "@models/user.model";
// Types
import type { ResponsePromise } from "@type/controller/controller.types";
// Utils
import JWT from "@utils/jwt.utils";

class AuthController {
  public async register(req: Request, res: Response): ResponsePromise {
    try {
      // Destructuring request object (req.body)
      const { name, lastname, email, password } = req.body;
      // Check is user exists in database
      const userExists = await User.findOne({ email });
      // if user exists function will stop running here and return response
      if (userExists) {
        return res.status(200).json({
          msg: "Email already exists",
          success: false,
        });
      }
      // if user dont exist this code will execute

      // hash users password to make it secure
      const hashedPassword = await bcrypt.hash(password, 10);
      // create new user
      const newUser = new User({
        name,
        lastname,
        email,
        password: hashedPassword,
      });
      await newUser.save();

      // generate accessToken and refresh accessToken, save in cookies and send success response
      const jwt = new JWT(newUser._id, res);
      jwt.createToken();
      jwt.createRefreshToken();
      res.status(201).json({
        success: true,
        message: "Registered Successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        msg: "Internal Server Error",
        success: false,
      });
    }
  }
  public async login(req: Request, res: Response): ResponsePromise {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "Invalid credentials",
        });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({
          success: false,
          msg: "Invalid credentials",
        });
      }

      const jwt = new JWT(user._id, res);
      jwt.createToken();
      jwt.createRefreshToken();
      res.status(201).json({
        success: true,
        message: "Logged in Successfully",
      });
    } catch (err) {
      res.status(500).json({
        message: err,
      });
    }
  }
  public async logout(req: Request, res: Response) {
    try {
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.status(200).json({ success: true, msg: "Logout successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
export default new AuthController();
