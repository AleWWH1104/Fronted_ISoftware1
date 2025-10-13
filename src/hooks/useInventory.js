import { getEstadoMateriales, getMovimientoMaterial, postMovimientoMaterial } from "../services/inventory";
import { useEffect, useState,useCallback} from 'react';

export default function useEstadoMateriales() {
    const [estadoMateriales, setEstadoMateriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
     // 1. Envuelve la lógica de fetch en una función con useCallback
    const fetchEstadoMateriales = useCallback(() => {
        setLoading(true); // Opcional: mostrar carga en cada refetch
        getEstadoMateriales()
            .then(setEstadoMateriales)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    // 2. Llama a la función en el useEffect inicial
    useEffect(() => {
        fetchEstadoMateriales();
    }, [fetchEstadoMateriales]); // fetchEstadoMateriales es ahora una dependencia

    // 3. Devuelve la función para poder llamarla desde fuera. La renombramos a "refetch"
    return { estadoMateriales, loading, error, refetch: fetchEstadoMateriales };
}

export function useMaterialMovement(initialFilters = {}) {
  const [movimientoMaterial, setMovimientoMaterial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const refetch = useCallback(async (nextFilters) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMovimientoMaterial(nextFilters ?? filters);
      setMovimientoMaterial(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setError(e?.response?.data?.message || 'Error al cargar movimientos');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const createMovimiento = useCallback(async (payload) => {
    // payload: { material_id, tipo: 'Entrada'|'Salida', cantidad, fecha?, observaciones?, proyecto_id? }
    const res = await postMovimientoMaterial(payload);
    await refetch(); // refresca la tabla
    return res;
  }, [refetch]);

  return {
    movimientoMaterial, // array para tu DataTable
    loading,
    error,
    refetch,
    setFilters,
    createMovimiento,   // por si luego agregas formulario de creación
  };
}
