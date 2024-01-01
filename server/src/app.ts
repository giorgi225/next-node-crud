import "dotenv/config";
import "tsconfig-paths/register";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// Routes
import authRoutes from "./routes/auth.routes";
// App utils
import App from "@utils/app.utils";
import Database from "@utils/database.utils";
import userRoutes from "./routes/user.routes";

const app = App.getExpressApp();

// start use
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json());
app.use(cookieParser());
// use - routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// end use - routes
// end use

Database.connect().then(() => {
  App.startServer();
});
