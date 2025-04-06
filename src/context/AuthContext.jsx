import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../services/auth";
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};
  

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signUp= async (user) => {
        try {
            const res = await registerRequest(user);
            console.log(res.data);
            setUser(res.data);
            setAuthenticated(true);
        }
        catch (error){
            console.log(error.response);
            setErrors(error.response.data)
        }
    }

    const signIn = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setAuthenticated(true);
            setUser(res.data);
        }catch (error){
            if (Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
        const cookies = Cookies.get();
        if (!cookies.token) {
            setAuthenticated(false);
            setLoading(false);
            return;
        }

        try {
            const res = await verifyTokenRequest(cookies.token);
            if (!res.data) return setAuthenticated(false);
            setAuthenticated(true);
            setUser(res.data);
            setLoading(false);
        } catch (error) {
            setAuthenticated(false);
            setLoading(false);
        }
        };
        checkLogin();
    }, []);

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setAuthenticated(false);
    };

    return(
        <AuthContext.Provider 
            value={{
                signUp,
                signIn,
                logout,
                loading,
                user,
                isAuthenticated,
                errors,
        }}
        >{children}
        </AuthContext.Provider>
    );
};