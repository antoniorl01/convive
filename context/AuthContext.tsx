import { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios'

interface AuthProps {
    authState?: { token: string | null; authenticated: boolean | null };
    onCreateSession?: ( email: string ) => Promise<any>;
    onSetSession?: ( email: string, code: number ) => Promise<any>;
    onLogOut?: () => Promise<any>;
}

const TOKEN_KEY = 'my_jwt';
export const API_URL = 'mock';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({children}: any) => {
    const [authState, setAuthState] = useState<{
        token: string | null;
        authenticated: boolean | null;
    }>({ token: null, authenticated: null});

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token,
                    authenticated: !!token,
                });
            }
        }
            
        loadToken();
    }, [])

    const createSession = async (email: string) => {
        try {
            return await axios.post(API_URL + '/session/new', { email });
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const setSession = async (email: string, code: number) => {
        try {
            const result = await axios.post(API_URL + '/session/validate', { email, code })



            switch (result.status) {
                // Code matches for the email (successful)
                // Set the token as the default for all request
                case 200:
                    setAuthState({
                        token: result.data.token,
                        authenticated: true,
                    });
                    axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
                    await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
                    break;
                // Code doesn't match the email (failed)
                case 400:
                    console.log('Code doesn\'t match the email');
                    break;
                // Email not found (shouldn't happen)
                case 404:
                    console.log('Email not found');
                    break;
                default:
                    return result;
            }

        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const deleteSession = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        axios.defaults.headers.common['Authorization'] = '';

        setAuthState({
            token: null,
            authenticated: false,
        });
    }

    const value = { 
        authState, 
        onCreateSession: createSession, 
        onSetSession: setSession,
        onLogOut: deleteSession
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// New User or Old User -> Clicks Comenzar -> Enters email -> Click Button -> Email Is Sent With Code -> User Writes Code -> Validates Code Is Correct
// User Wants to Log Out -> Click button log out -> Redirect to index page 