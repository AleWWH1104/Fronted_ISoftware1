import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../services/auth";
import Cookies from "js-cookie";

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

    // Función para verificar si el usuario tiene todos los permisos requeridos
    const hasAllPermissions = (requiredPermissions = []) => {
        if (!user || !user.permisos) return false;
        return requiredPermissions.every(permission => 
            user.permisos.includes(permission)
        );
    };

    // Función para verificar si el usuario tiene al menos uno de los permisos requeridos
    const hasAnyPermission = (requiredPermissions = []) => {
        if (!user || !user.permisos) return false;
        return requiredPermissions.some(permission => 
            user.permisos.includes(permission)
        );
    };

    const signUp = async (userData) => {
        try {
            const res = await registerRequest(userData);
            console.log("Registro exitoso:", res);
            if (res.data.token) {
                Cookies.set("token", res.data.token);
            }
            setAuthenticated(true);
            setUser(res.data.user || res.data);
            setErrors([]);
        } catch (error) {
            console.error("Error en registro:", error);
            if (error.response) {
                if (Array.isArray(error.response.data)) {
                    setErrors(error.response.data);
                } else {
                    setErrors([error.response.data.message || JSON.stringify(error.response.data)]);
                }
            } else if (error.request) {
                setErrors(["No se pudo conectar con el servidor"]);
            } else {
                setErrors([error.message || "Error desconocido"]);
            }
            setAuthenticated(false);
            setUser(null);
        }
    };

    const signIn = async (userData) => {
        try {
            const res = await loginRequest(userData);
            console.log("Respuesta login:", res.data);

            // if (res.data.token) {
            //     Cookies.set("token", res.data.token);
            // } else {
            //     console.warn("No se recibió token en la respuesta de login");
            // }

            setAuthenticated(true);
            setUser(res.data.user || res.data);
            setErrors([]);
        } catch (error) {
            console.error("Error en login completo:", error);
            if (error.response) {
                if (Array.isArray(error.response.data)) {
                    setErrors(error.response.data);
                } else {
                    setErrors([error.response.data.message || JSON.stringify(error.response.data)]);
                }
            } else if (error.request) {
                setErrors(["No se pudo conectar con el servidor"]);
            } else {
                setErrors([error.message || "Error desconocido"]);
            }
            setAuthenticated(false);
            setUser(null);
        }
    };

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await verifyTokenRequest();
                setUser(res.data.user || res.data);
                setAuthenticated(true);
            } catch (error) {
                setAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    const logout = async () => {
        try {
            // Llamar al endpoint de logout del backend para limpiar la cookie
            await logoutRequest();
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            // Limpiar el estado igualmente
            Cookies.remove("token");
            setUser(null);
            setAuthenticated(false);
        }
    };

    return(
        <AuthContext.Provider 
            value={{
                signUp,
                signIn,
                logout,
                hasAllPermissions,
                hasAnyPermission,
                loading,
                user,
                isAuthenticated,
                errors,
        }}
        >{children}
        </AuthContext.Provider>
    );
};
