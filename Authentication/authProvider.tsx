import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { Hub } from "@aws-amplify/core";

const AuthContext = createContext<{
    user?: AuthUser | null;
    error: string | null;
}>
({
    user: null,
    error: null,
});

export default function AuthProvider({children}: PropsWithChildren) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = Hub.listen("auth", ({ payload }) => {
          switch (payload.event) {
            case "signedIn":
              getUser();
              break;
            case "signedOut":
              setUser(null);
              setError(null);
              break;
            case "signInWithRedirect":
              getUser();
              break;
            case "signInWithRedirect_failure":
              setError("An error has occurred during the OAuth flow.");
              break;
          }
        });
        getUser();
        return unsubscribe;
    }, [])

    const getUser = async (): Promise<void> => {
        try {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
        } catch (error) {
            console.error(error);
            console.log("Not signed in");
        }
        };

    return (
        <AuthContext.Provider value={{ user, error }}>
            {children}
        </AuthContext.Provider>
    );
    
}

export {AuthContext}