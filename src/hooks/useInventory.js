import { getEstadoMateriales, getMovimientoMaterial } from "../services/inventory";
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