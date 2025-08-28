import { useAuth } from "../context/AuthContext";

function WithPermission({ children, permissions, requireAll = true, fallback = null }) {
  const { hasAllPermissions, hasAnyPermission, loading, user } = useAuth();

   // Mostrar el fallback mientras se carga la autenticación
  if (loading) {
    return fallback;
  }
  
  const hasPermission = requireAll 
    ? hasAllPermissions(permissions) 
    : hasAnyPermission(permissions);
  
  return hasPermission ? children : fallback;
}

export default WithPermission;