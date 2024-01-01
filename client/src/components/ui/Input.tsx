import { InputTypes } from "@/types/ui.types";
import React from "react";

const Input = ({
  type = "text",
  value,
  name,
  id,
  placeholder = "",
  onInput,
  displayError,
  label,
}: InputTypes) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        onInput={onInput}
      />
      <p className="text-sm text-red-500">{displayError(name)}</p>
    </div>
  );
};

export default Input;
