// hooks/useProjects.js
import { useEffect, useState, useCallback } from 'react';
import { 
  getEstadoProyectos, 
  getProjectMaterialsByProject, 
  getProjectMaterialsForDashboard,
  getDetalleMaterialByProject,
} from '../services/projects';

// Hook para obtener todos los proyectos
export default function useEstadoProyectos() {
  const [estadoProyectos, setEstadoProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEstadoProyectos = useCallback(() => {
    setLoading(true);
    getEstadoProyectos()
      .then(setEstadoProyectos)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchEstadoProyectos();
  }, [fetchEstadoProyectos]);

  return { estadoProyectos, loading, error, refetch: fetchEstadoProyectos };
}

// Hook para obtener materiales para el Dashboard (todos los proyectos activos)
export function useProjectMaterialsForDashboard() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaterials = useCallback(() => {
    setLoading(true);
    setError(null);

    getProjectMaterialsForDashboard()
      .then((data) => {
        console.log('✅ Dashboard Hook: All project materials received:', data);
        setMaterials(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('❌ Dashboard Hook Error:', err.response?.data || err.message);
        setError(err);
        setMaterials([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  return { materials, loading, error, refetch: fetchMaterials };
}

export function useProjectMaterials(projectId) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  const fetchData = useCallback(async () => {
    if (!projectId) return;
    setLoading(true); setError(null);
    try {
      const rows = await getDetalleMaterialByProject(projectId);
      setMaterials(rows);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { materials, loading, error, refetch: fetchData };
}