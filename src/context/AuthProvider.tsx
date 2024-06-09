"use client";
import { createContext, useEffect, useState } from "react";
import { authListener } from "@/lib/auth";
import LandingPage from "@/components/LandingPage";
import { LoadingElement } from "@/components/LoadingElement";

export const AuthContext = createContext({} as { uid: string });
export function AuthProvider({ children }: any) {
  const [authData, setAuthData] = useState<{ uid: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    authListener((user) => {
      setAuthData(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <LoadingElement></LoadingElement>;
  }

  if (!authData) {
    return <LandingPage></LandingPage>;
  }

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
}
