import React, { createContext, useEffect, useState } from 'react';
import app from '../firebase/firebase.config';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext();
const auth = getAuth(app)

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email,password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    };

    const updatedName = (userName) => {
        return updateProfile(auth.currentUser, userName)
    };

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password)
    };

    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            setUser(user)
            setLoading(false)
        })
        return () => unsubscribe;
    },[user]);

    const googleLogin = () => {
        const googleProvider =  new GoogleAuthProvider()
         return signInWithPopup(auth,googleProvider)
    }


    const authInfo = {
        user,
        createUser,
        updatedName,
        loginUser,
        logoutUser,
        loading,
        googleLogin
    }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
