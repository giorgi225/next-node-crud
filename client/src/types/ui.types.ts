import { ChangeEvent } from "react";

export type InputTypes = {
  type: "text" | "password" | "email";
  value: string;
  name: string;
  id: string;
  placeholder?: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  displayError: (inputName: InputTypes['name']) => string | null;
  label?: string;
};
