import { UserResponseTypes } from "@/types/response.types";
import apiUtils from "@/utils/api.utils";
import { usePathname } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface UserContextProps {
  user: UserResponseTypes | undefined;
  setUser: Dispatch<SetStateAction<UserResponseTypes | undefined>>;
}
const UserContext = createContext<UserContextProps>(undefined!);

export function UserProvider({ children }: { children: React.ReactNode }) {

  const pathname = usePathname();
  const [currentUser, setUser] = useState<UserResponseTypes | undefined>(
    undefined
  );
  useEffect(() => {
    async function fetchUser() {
      try {
        const user: UserResponseTypes | undefined =
          await apiUtils.getUserData();

        setUser(user);
      } catch (err) {
        setUser(undefined);
      }
    }

    fetchUser();
  }, [pathname]);

  return (
    <UserContext.Provider value={{ user: currentUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext(): UserContextProps {
  const context = useContext(UserContext);

  if (typeof context === "undefined") {
    throw new Error(
      "useUserContext should be used within the UserContext provider!"
    );
  }

  return context;
}
