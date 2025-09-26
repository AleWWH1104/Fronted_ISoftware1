// hooks/useProjects.js
import { useEffect, useState, useCallback } from 'react';
import { 
  getEstadoProyectos, 
  getProjectMaterialsByProject, 
  getProjectMaterialsForDashboard,
  getMateriales,
  assignMaterialToProject 
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

// Hook para obtener materiales de un proyecto específico
export function useProjectMaterials(projectId) {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMaterials = useCallback(() => {
    if (!projectId) {
      setMaterials([]);
      return;
    }

    setLoading(true);
    setError(null);

    getProjectMaterialsByProject(projectId)
      .then((data) => {
        console.log(' Hook: Materials received for project', projectId, ':', data);
        
        // El backend ya nos devuelve solo los materiales del proyecto específico
        const projectMaterials = Array.isArray(data) ? data : [];

        // Transformamos datos para agregar campos calculados
        const transformed = projectMaterials.map((mat, index) => {
          const ofertada = Number(mat.ofertada) || 0;
          const reservado = Number(mat.reservado) || 0;
          const en_obra = Number(mat.en_obra) || 0;

          const pendiente_compra = Math.max(0, ofertada - (reservado + en_obra));
          const pendiente_entrega = reservado;

          return {
            id: `${mat.id_material}-${index}`,
            ...mat,
            ofertada,
            reservado,
            en_obra,
            pendiente_compra,
            pendiente_entrega,
          };
        });

        setMaterials(transformed);
      })
      .catch((err) => {
        console.error(' Hook Error fetching materials:', err.response?.data || err.message);
        setError(err);
        setMaterials([]);
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  return { materials, loading, error, refetch: fetchMaterials };
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
        console.log(' Dashboard Hook: All project materials received:', data);
        setMaterials(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(' Dashboard Hook Error:', err.response?.data || err.message);
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

// NUEVO: Hook para obtener todos los materiales
export function useMateriales() {
  const [materiales, setMateriales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMateriales = useCallback(() => {
    setLoading(true);
    setError(null);

    getMateriales()
      .then((data) => {
        console.log(' Materiales Hook: Materials received:', data);
        setMateriales(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error('Materiales Hook Error:', err.response?.data || err.message);
        setError(err);
        setMateriales([]);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchMateriales();
  }, [fetchMateriales]);

  return { materiales, loading, error, refetch: fetchMateriales };
}

//  NUEVO: Hook para asignar material a proyecto
export function useAssignMaterial() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const assignMaterial = useCallback(async (projectId, materialData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await assignMaterialToProject(projectId, materialData);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  }, []);

  return { assignMaterial, loading, error };
}