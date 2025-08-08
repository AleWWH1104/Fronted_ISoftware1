import { getEstadoMateriales, getMovimientoMaterial } from "../services/inventory";
import { useEffect, useState } from 'react';

export default function useEstadoMateriales() {
    const [estadoMateriales, setEstadoMateriales] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getEstadoMateriales()
            .then(setEstadoMateriales)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    return { estadoMateriales, loading, error };
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