import { useAuth } from "../context/AuthContext";

function normalize(perms) {
  return Array.isArray(perms) ? perms : [perms];
}

export default function WithPermission({
  children,
  permissions,
  requireAll = true,
  fallback = null,
}) {
  const { hasAllPermissions, hasAnyPermission, loading } = useAuth();

  if (loading) return fallback;

  const list = normalize(permissions);
  const allowed = requireAll
    ? hasAllPermissions(list)
    : hasAnyPermission(list);

  return allowed ? children : fallback;
}
