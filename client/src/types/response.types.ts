export type UserResponseTypes = {
  name: string;
  lastname: string;
  email: string;
  phone?: string | undefined;
  country?: string | undefined;
  profile_image: string;
};

export type InputFieldErrorsType = {
  errors: [
    {
      type: string;
      value: string;
      msg: string;
      path: string;
      location: string;
    }
  ];
  success: boolean;
};
export type responseMessageType = {
  errors?: [
    {
      type: string;
      value: string;
      msg: string;
      path: string;
      location: string;
    }
  ];
  success: boolean;
  msg?: string;
};

export type fieldNamesType = {
  fieldName:
    | "name"
    | "lastname"
    | "email"
    | "password"
    | "password_confirmation";
};
