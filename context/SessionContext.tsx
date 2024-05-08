import { createContext, useContext, useEffect, useState } from "react";
import { useStorageState } from "@/hooks/useStorageState";

// 1. Create
const SessionContext = createContext<{
    signIn: () => void;
    signOut: () => void;
    session?: string | null;
    isLoading: boolean;
  }>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});

// 2. Provide
export const SessionProvider = ({ children }: any) => {
  const [[isLoading, session], setSession] = useStorageState('session');

  const signIn = () => { setSession('xxx'); }

  const signOut = () => { setSession(null); }

  const value = {
    signIn,
    signOut,
    session,
    isLoading
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

// 3. Consume -> useContext(SessionProvider)
export function useSession() {
  const value = useContext(SessionContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}
