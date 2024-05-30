"use client";
import { createContext, useEffect, useState } from "react";
import { authListener } from "@/lib/auth";
import LandingPage from "@/components/LandingPage";

export const AuthContext = createContext({} as { uid: string });
export function AuthProvider({ children }: any) {
  const [authData, setAuthData] = useState<{ uid: string } | null>(null);

  useEffect(() => {
    authListener((user) => {
      setAuthData(user);
    });
  }, []);

  if (!authData) {
    return <LandingPage></LandingPage>;
  }

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}
