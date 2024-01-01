"use client";

import { FormEvent, FormEventHandler } from "react";

const AuthLayout = ({
  children,
  title,
  onSubmit,
}: {
  children: React.ReactNode;
  title: string;
  onSubmit: ()=> void;
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit()
  };
  return (
    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {title}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 md:space-y-6"
        action="#"
      >
        {children}
      </form>
    </div>
  );
};

export default AuthLayout;
