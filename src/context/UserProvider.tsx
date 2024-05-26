"use client";
import { IUser } from "@/types/user.types";
import { createContext, useEffect, useState } from "react";
import { getUser, getUserId } from "./user";

export const UserContext = createContext({} as IUser);
export function UserProvider({ children }: any) {
  const [userData, setUserData] = useState<IUser | null>(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const data = await getUser(getUserId());

      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
