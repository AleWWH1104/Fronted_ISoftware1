import { useEffect, useState } from 'react';
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

export function useProjectsByService(){
    const [projectsByService, setProjectsByService] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getProjectsByService()
            .then(setProjectsByService)
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    return {projectsByService, loading, error };
}