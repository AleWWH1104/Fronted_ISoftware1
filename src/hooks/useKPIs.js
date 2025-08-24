import { useEffect, useState } from 'react';
import { getCountCustomers, getFinishedProjects, getInProgressProjects } from '../services/kpis';

export function useCountCustomers(){
    const [countCustomers, setcountCustomers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getCountCustomers()
            .then(data => setcountCustomers(data.total_clientes))
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
    const [InProgressProjects, setInProgressProjects] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        getInProgressProjects()
            .then(data => setInProgressProjects(data.total_clientes))
            .catch(setError)
            .finally(() => setLoading(false));
    }, []);
  
    return { InProgressProjects, loading, error };
}