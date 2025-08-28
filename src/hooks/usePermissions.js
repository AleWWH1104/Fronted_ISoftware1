import { useAuth } from "../context/AuthContext";

function usePermissions() {
  const { user, hasAllPermissions, hasAnyPermission} = useAuth();
  
  return {
    user,
    hasAllPermissions,
    hasAnyPermission,
    canViewDashboard: hasAnyPermission(['ver_dashboard']),
    canViewInventory: hasAnyPermission(['ver_inventario']),
    canViewProjects: hasAnyPermission(['ver_proyectos']),
    canViewReports: hasAnyPermission(['ver_reportes']),
    canCreateMaterial: hasAnyPermission(['crear_material']),
    canEditInventory: hasAnyPermission(['editar_inventario']),
    canDeleteMaterial: hasAnyPermission(['eliminar_material']),
    canCreateProject: hasAnyPermission(['crear_proyecto']),
    canEditProject: hasAnyPermission(['editar_proyecto']),
    canDeleteProject: hasAnyPermission(['eliminar_proyecto']),
    canCreateReport: hasAnyPermission(['crear_reporte']),
    canDeleteReport: hasAnyPermission(['eliminar_reporte']),
    canViewAlerts: hasAnyPermission(['ver_alertas']),
    canCreateUser: hasAnyPermission(['crear_usuario']),
    canEditUser: hasAnyPermission(['editar_usuario']),
    canDeleteUser: hasAnyPermission(['eliminar_usuario']),
  };
}

export default usePermissions;