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
  const [[isLoading, session], setSession] = useStorageState("session");
  const [[isLoadingEmail, sessionEmail], setSessionEmail] = useStorageState("email");

  const signIn = async (email: string, code: number) => {
    try {
      const response = await axios.post(
        "https://8b86-2a0c-5a82-320a-300-f801-6ce8-c914-2be1.ngrok-free.app/api/v1/login",
        { email, code }
      );

      const { token } = response.data;
      if (token) {
        setSession(token);
        setSessionEmail(email);
      } else {
        throw new Error("Invalid code");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      throw error; // Rethrow the error to be handled by the calling function
    }
  };

  const signOut = () => {
    setSession(null);
  };

  const value = {
    signIn,
    signOut,
    session,
    isLoading,
  };

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

// 3. Consume -> useContext(SessionProvider)
export function useSession() {
  const value = useContext(SessionContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}
