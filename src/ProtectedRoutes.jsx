import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

function ProtectedRoutes() {
    const { loading, isAuthenticated, initialCheckDone } = useAuth();
    
    console.log("ProtectedRoutes - loading:", loading);
    console.log("ProtectedRoutes - isAuthenticated:", isAuthenticated);
    console.log("ProtectedRoutes - initialCheckDone:", initialCheckDone);
    
    // Si está cargando y no se ha completado la verificación inicial, mostrar spinner
    if (loading && !initialCheckDone) {
        console.log("Mostrando spinner de carga (verificación inicial)...");
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#046bb1]"></div>
            </div>
        );
    }
    
    // Si ya se completó la verificación inicial y no está autenticado, redirigir al login
    if (initialCheckDone && !isAuthenticated) {
        console.log("Redirigiendo a login...");
        return <Navigate to='/login' replace />;
    }
    
    // Si está autenticado, mostrar el contenido
    console.log("Mostrando contenido protegido...");
    return <Outlet />;
}

export default ProtectedRoutes;