import { getEstadoMateriales, getMovimientoMaterial } from "../services/inventory";
import { useEffect, useState, useCallback } from 'react';

export default function useEstadoMateriales() {
    const [estadoMateriales, setEstadoMateriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getEstadoMateriales();
            setEstadoMateriales(data);
            setError(null);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Función para refrescar manualmente
    const refetch = useCallback(() => {
        return fetchData();
    }, [fetchData]);
  
    return { estadoMateriales, loading, error ,refetch};
}


export function useMaterialMovement(){
    const [movimientoMaterial, setMovimientoMaterial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getMovimientoMaterial()
            .then(setMovimientoMaterial)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    return { movimientoMaterial, loading, error };
}