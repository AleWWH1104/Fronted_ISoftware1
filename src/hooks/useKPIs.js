import { useEffect, useState, useMemo } from 'react';
import { getCountCustomers, getFinishedProjects, getInProgressProjects, getCountProducts, getProjectsByService } from '../services/kpis';

export function useCountCustomers() {
  const [countCustomers, setCountCustomers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCountCustomers()
      .then(data => setCountCustomers(Number(data[0]?.total_clientes) || 0))
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return { countCustomers, loading, error };
}


export function useFinishedProjects(){
    const [finishedProjects, setfinishedProjects] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getFinishedProjects()
            .then(data => setfinishedProjects(data.total_finalizados))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    return { finishedProjects, loading, error };
}

export function useInProgressProjects(){
    const [inProgressProjects, setInProgressProjects] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getInProgressProjects()
            .then(data => setInProgressProjects(data.total))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    return { inProgressProjects, loading, error };
}

export function useProductCount(){
    const [productCount, setCountProducts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getCountProducts()
            .then(data => setCountProducts(data))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    return {productCount, loading, error };
}


const SERVICIOS = [
  'Piscina Regular',
  'Piscina Irregular',
  'Remodelacion',
  'Jacuzzi',
  'Paneles Solares',
  'Fuentes y Cascadas',
];

export function useProjectsByService(estado) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const raw = await getProjectsByService(estado);
        // normaliza: cantidad a número y rellena servicios faltantes con 0
        const map = new Map(
          raw.map(r => [r.servicio, Number(r.cantidad ?? 0)])
        );
        const normalized = SERVICIOS.map(s => ({
          servicio: s,
          cantidad: Number(map.get(s) ?? 0),
        }));
        if (alive) setRows(normalized);
      } catch (e) {
        if (alive) setError(e?.response?.data?.message || 'Error al cargar');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, [estado]);

  // ordena desc para la gráfica
  const data = useMemo(
    () => [...rows].sort((a, b) => b.cantidad - a.cantidad),
    [rows]
  );

  return { data, loading, error };
}
