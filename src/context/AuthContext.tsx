import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import firebaseService from "../services/firebase";

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User>(null);
    const [isLoaded, setIsLoaded] = useState<Boolean>(false);

    useEffect(() => {
        firebaseService.auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setIsLoaded(true);
        });
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{currentUser, isLoaded}}>
            {children}
        </AuthContext.Provider>
    )
}