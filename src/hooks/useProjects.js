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

export function useProjectMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock con datos reales de tu data.sql (solo proyectos activos: solicitado/en progreso)
  // Simula el JOIN y cálculos: pendiente_compra = ofertada - en_obra - reservado, pendiente_entrega = reservado
  const mockData = [
    // La Estacion (ID 1, solicitado)
    { proyecto: 'La Estacion', codigo: 'COD001', material: 'Codos 1/2', ofertado: 50, en_obra: 0, pendiente_compra: 40, pendiente_entrega: 10 },
    { proyecto: 'La Estacion', codigo: 'MAC001', material: 'Macho 2 1/2', ofertado: 100, en_obra: 0, pendiente_compra: 70, pendiente_entrega: 30 },
    { proyecto: 'La Estacion', codigo: 'SUP001', material: 'Superflo 5.0', ofertado: 2, en_obra: 0, pendiente_compra: 0, pendiente_entrega: 2 },
    // Metroplaza (ID 2, en progreso)
    { proyecto: 'Metroplaza', codigo: 'COD001', material: 'Codos 1/2', ofertado: 20, en_obra: 15, pendiente_compra: 0, pendiente_entrega: 5 },
    { proyecto: 'Metroplaza', codigo: 'MAC001', material: 'Macho 2 1/2', ofertado: 40, en_obra: 20, pendiente_compra: 10, pendiente_entrega: 10 },
    { proyecto: 'Metroplaza', codigo: 'GLO001', material: 'Globerite Color', ofertado: 10, en_obra: 8, pendiente_compra: 0, pendiente_entrega: 2 }
  ];

  const fetchMaterials = useCallback(() => {
    setLoading(true);
    setError(null);

    // ACTIVADO: Usa mock para que funcione ya (6 filas en tabla, evita error de backend inexistente)
    console.log('🔧 Using MOCK data based on your SQL (6 rows for active projects)');
    setMaterials(mockData);
    setLoading(false);
    return;

    // PARA CUANDO BACKEND ESTÉ LISTO: Descomenta esto y comenta el mock arriba
    // getProjectMaterials()
    //   .then(data => setMaterials(data))
    //   .catch(err => {
    //     console.error('Error fetching materials:', err);
    //     setError(err);
    //     setMaterials(mockData); // Fallback a mock si backend falla
    //   })
    //   .finally(() => setLoading(false));
  }, []);
  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);
  return { materials, loading, error, refetch: fetchMaterials };
}