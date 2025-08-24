import { useAuth } from "../context/AuthContext";

function WithPermission({ children, permissions, requireAll = true }) {
  const { hasAllPermissions, hasAnyPermission } = useAuth();
  
  const hasPermission = requireAll 
    ? hasAllPermissions(permissions) 
    : hasAnyPermission(permissions);
  
  return hasPermission ? children : null;
}

export default WithPermission;