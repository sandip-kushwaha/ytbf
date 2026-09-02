import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, loginAdmin, logoutAdmin } from "../api/auth.api";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkCurrentUser = async () =>{
        try {
            const response = await getCurrentUser();

            setUser(response.data)
            
        } catch (err) {
            setUser(null)
        }finally{
            setLoading(false);
        }
    };

    const login = async (username, password) => {

        const response = await loginAdmin({ username, password });

        setUser(response.data.user);

        return response;
    };

    const logout = async () => {
        try{
            await logoutAdmin();
        }finally{
            setUser(null);
        }
    };

     //Check authentication when app starts
    useEffect(() => {
       checkCurrentUser();
    }, [])

    const value = {
        user,
        loading,
        login,
        logout,
        getCurrentUser: checkCurrentUser,
        isAuthenticated: !!user,
    };

    return <AuthProvider.Provider value={value}>{children}</AuthProvider.Provider>
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context){
        throw new Error("useAuth must be used inside AuthProvider")
    };

    return context;
};