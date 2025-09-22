import { useEffect, useState,useCallback} from 'react';
import { getEstadoProyectos } from '../services/projects';

export default function useEstadoProyectos() {
    const [estadoProyectos, setEstadoProyectos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
     // 1. Envuelve la lógica de fetch en una función con useCallback
    const fetchEstadoProyectos = useCallback(() => {
        setLoading(true); // Opcional: mostrar carga en cada refetch
        getEstadoProyectos()
            .then(setEstadoProyectos)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    // 2. Llama a la función en el useEffect inicial
    useEffect(() => {
        fetchEstadoProyectos();
    }, [fetchEstadoProyectos]); // fetchEstadoProyectos es ahora una dependencia

    // 3. Devuelve la función para poder llamarla desde fuera. La renombramos a "refetch"
    return { estadoProyectos, loading, error, refetch: fetchEstadoProyectos };
}