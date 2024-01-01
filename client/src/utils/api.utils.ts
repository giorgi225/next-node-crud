"use client";
import { handleUndefinedUserData } from "@/actions/apiActions";
import { LoginFormType, RegisterFormType } from "@/types/form.types";
import { UserResponseTypes, responseMessageType } from "@/types/response.types";
import { usePathname } from "next/navigation";
import { Router } from "next/router";
class RestApi {
  public async getUserData(): Promise<UserResponseTypes | undefined> {
    try {
      const response = await fetch("http://localhost:8080/api/user/get-user", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        const currentPathname = window.location.pathname;
        await handleUndefinedUserData(currentPathname);
        return undefined;
      }
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  public async login(formData: LoginFormType): Promise<responseMessageType> {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      return await response.json();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }

  public async register(
    formData: RegisterFormType
  ): Promise<responseMessageType> {
    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      return await response.json();
    } catch (err: any) {
      console.log(err);
      return err;
    }
  }
}

export default new RestApi();
