import mongoose from "mongoose";
// Config
import databaseConfig from "@/config/database.config";
// Models
import User from "@/models/user.model";
// Types
import type { DatabaseConfigTypes } from "@/types/config/config.types";

const { uri } = databaseConfig;
class Database {
  private uri: DatabaseConfigTypes["uri"];
  constructor() {
    this.uri = uri;
  }
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(this.uri);
      console.log("Connected to Database");
    } catch (err) {
      console.log(err);
    }
  }
  public async createTestUser(): Promise<void> {
    try {
      await User.create({
        name: "admin",
        lastname: "admin",
        email: "admin@admin.com",
        password: "Admin123",
        country: "Georgia",
      });
      console.log("Test user created successfully");
    } catch (err) {
      console.log(err);
    }
  }
}
export default new Database();
