import { useState, useEffect, useCallback } from 'react';
import { getReports,  getReportsByProject } from '../services/reports';

export default function useProjectsReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(() => {
    setLoading(true);
    getReports()
      .then(setReports)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { reports, loading, error, refetch: fetchReports };
}

export function useReportsByProject(projectId) {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = useCallback(() => {
    if (!projectId) return;
    setLoading(true);
    getReportsByProject(projectId)
      .then(setProjectData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [projectId]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { projectData, loading, error, refetch: fetchReports };
}
