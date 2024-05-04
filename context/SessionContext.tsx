import { createContext, useContext, useEffect, useState } from "react";
import { useStorageState } from "@/hooks/useStorageState";

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


export function useSession() {
    const value = useContext(SessionContext);
    if (process.env.NODE_ENV !== 'production') {
      if (!value) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
      }
    }
  
    return value;
}

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

// New User or Old User -> Clicks Comenzar -> Enters email -> Click Button -> Email Is Sent With Code -> User Writes Code -> Validates Code Is Correct
// User Wants to Log Out -> Click button log out -> Redirect to index page
