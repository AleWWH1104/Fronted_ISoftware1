import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";

function ProtectedRoutes() {
    const { loading, isAuthenticated } = useAuth();
    const [initialCheckDone, setInitialCheckDone] = useState(false);
    
    useEffect(() => {
        if (!loading) {
            setInitialCheckDone(true);
        }
    }, [loading]);
    
    // Si está cargando y no se ha completado la verificación inicial, mostrar spinner
    if (loading) {
        console.log("Mostrando spinner de carga (verificación inicial)...");
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#046bb1]"></div>
            </div>
        );
    }
    
    // Si ya se completó la verificación inicial y no está autenticado, redirigir al login
    if (!isAuthenticated && initialCheckDone) {
        console.log("Redirigiendo a login...");
        return <Navigate to='/login' replace />;
    }
    
    // Si está autenticado, mostrar el contenido
    console.log("Mostrando contenido protegido...");
    return <Outlet />;
}

export default ProtectedRoutes;