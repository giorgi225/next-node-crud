import { Schema, model } from "mongoose";
// Types
import { UserModelType } from "@/types/models/model.types";

const userSchema = new Schema<UserModelType>({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    required: false,
    default: "profile.svg",
  },
  country: {
    type: String,
    required: false,
  },
});

const User = model<UserModelType>("User", userSchema);
export default User;
