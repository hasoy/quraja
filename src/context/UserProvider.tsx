"use client";
import { IUser } from "@/types/user.types";
import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToUser } from "./user";
import { AuthContext } from "./AuthProvider";

export const UserContext = createContext({} as IUser);
export function UserProvider({ children }: any) {
  const [userData, setUserData] = useState<IUser | null>(null);
  const authData = useContext(AuthContext);

  useEffect(() => {
    getUserData();
  }, [authData]);

  const getUserData = () => {
    subscribeToUser(authData?.uid, (user) => {
      setUserData(user);
    });
  };
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
