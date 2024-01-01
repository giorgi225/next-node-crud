"use client";
import AuthLayout from "@/components/layouts/AuthLayout";
import { RegisterFormType } from "@/types/form.types";
import { fieldNamesType, responseMessageType } from "@/types/response.types";
import apiUtils from "@/utils/api.utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import Input from "../ui/Input";
import { InputTypes } from "@/types/ui.types";

const RegsterForm = () => {
  const router = useRouter();

  const [errors, setErrors] = useState<responseMessageType["errors"] | null>(
    null
  );
  const [formData, setFormData] = useState<RegisterFormType>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const isFormValid = () => {
    // frontend validation here
    return true;
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (): Promise<void> => {
    if (isFormValid()) {
      const res: responseMessageType = await apiUtils.register(formData);
      if (res.success) {
        setErrors(null);
        router.push("/");
      } else {
        setErrors(res.errors);
      }
    }
  };

  const displayError = (fieldName: InputTypes["name"]) => {
    if (errors) {
      const errorForField = errors.find((error) => error.path === fieldName);

      if (errorForField) {
        return errorForField.msg;
      }
    }

    return null;
  };
  return (
    <AuthLayout title="Sign in to your account" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="text"
          value={formData.name}
          name="name"
          id="name"
          placeholder="name"
          onInput={handleInput}
          displayError={displayError}
          label="Name"
        />

        <Input
          type="text"
          value={formData.lastname}
          name="lastname"
          id="lastname"
          placeholder="lastname"
          onInput={handleInput}
          displayError={displayError}
          label="Lastname"
        />
      </div>

      <Input
        type="text"
        value={formData.email}
        name="email"
        id="email"
        placeholder="email"
        onInput={handleInput}
        displayError={displayError}
        label="Email"
      />
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="password"
          value={formData.password}
          name="password"
          id="password"
          placeholder="password"
          onInput={handleInput}
          displayError={displayError}
          label="Password"
        />
         <Input
          type="password"
          value={formData.password_confirmation}
          name="password_confirmation"
          id="password_confirmation"
          placeholder="password_confirmation"
          onInput={handleInput}
          displayError={displayError}
          label="Confirm Password"
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <a
          href="#"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </a>
      </div>
      <button
        type="submit"
        disabled={!isFormValid()}
        className={`${
          isFormValid()
            ? "bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            : "bg-primary-300 cursor-not-allowed"
        } w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
      >
        Sign in
      </button>
      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account yet?
        <Link
          href="/auth/register"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default RegsterForm;
