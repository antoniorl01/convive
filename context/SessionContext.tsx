import { createContext, useContext } from "react";
import { useStorageState } from "@/hooks/useStorageState";
import axios from "axios";

// 1. Create
const SessionContext = createContext<{
    signIn: (email: string, code: number) => void;
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

  const signIn = async (email: string, code: number) => {
    try {
      const response = await axios.post('http://10.0.2.2:8080/api/v1/login', { email, code });

      if (response.data.token != null) {
        const token = response.data.token;  
        setSession(token);
      } else {
        throw Error("not valid code")
      }
    } catch (error) {
      console.error('Error during sign in:', error);
    }
  };

  const signOut = () => {
    setSession(null);
  };


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
