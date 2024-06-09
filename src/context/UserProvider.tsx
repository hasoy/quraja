"use client";
import { IUser } from "@/types/user.types";
import { createContext, useContext, useEffect, useState } from "react";
import { subscribeToUser } from "./user";
import { AuthContext } from "./AuthProvider";
import { calculateScore } from "@/helpers/score";
import { LoadingElement } from "@/components/LoadingElement";

export const UserContext = createContext({} as IUser);
export function UserProvider({ children }: any) {
  const [userData, setUserData] = useState<IUser | null>(null);
  const authData = useContext(AuthContext);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = () => {
    subscribeToUser(authData?.uid, (user) => {
      user.pageData = user.pageData.map((page) => {
        return {
          ...page,
          score: calculateScore(
            page.totalRevisions,
            page.mistakes,
            page.lastRevised,
          ),
        };
      });
      setUserData(user);
    });
  };
  if (!userData) return <LoadingElement></LoadingElement>;
  return (
    <UserContext.Provider value={userData}>{children}</UserContext.Provider>
  );
}
