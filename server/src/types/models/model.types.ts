import mongoose from "mongoose";

export type UserModelType = {
  name: string;
  lastname: string;
  email: string;
  password: string;
  profile_image: string;
  country: string;
};
