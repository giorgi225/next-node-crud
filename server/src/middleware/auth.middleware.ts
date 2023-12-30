import { NextFunction, Request, Response } from "express";
import { check, validationResult } from "express-validator";
// Utils
import Regex from "@/utils/regex.utils";

class AuthMiddleware {
  public validateRegistration(
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    AuthMiddleware.validate([
      check("name")
        .notEmpty()
        .withMessage("Name is required")
        .bail()

        .isString()
        .custom((value) => Regex.isMultilingualAlpha(value))
        .withMessage("Please enter valid name"),
      check("lastname")
        .notEmpty()
        .withMessage("Lastname is required")
        .bail()

        .isString()
        .custom((value) => Regex.isMultilingualAlpha(value))
        .withMessage("Please enter valid lastname"),

      check("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format"),
      check("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()

        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters long"),
      check("password_confirmation")
        .notEmpty()
        .withMessage("Password confirmation is required")
        .bail()
        .custom((value, { req }) => {
          return value === req.body.password;
        })
        .withMessage("Password confirmation does not match password"),
    ])(req, res, next);
  }
  public validateLogin(req: Request, res: Response, next: NextFunction): void {
    AuthMiddleware.validate([
      check("email")
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format"),
      check("password").notEmpty().withMessage("Password is required"),
    ])(req, res, next);
  }
  private static validate(validations: any[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (let validation of validations) {
        await validation.run(req);
      }
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          success: false,
        });
      }

      next();
    };
  }
}

export default new AuthMiddleware();
