"use client";
import { useUserContext } from "@/providers/UserProvider";

const Welcome = () => {
  const { user, setUser } = useUserContext();
  return (
    <h1 className="text-base">
      Welcome {user && user?.name + " " + user?.lastname}
      <br /> <span>{user && 'your email is: ' +  user?.email}</span>
    </h1>
  );
};

export default Welcome;
