import { useState, useEffect } from "react";
import { getAlertMateriales } from "../services/inventory";

export const useAlerts = () => {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlertas = async () => {
    setLoading(true);
    try {
      const data = await getAlertMateriales();
      setAlertas(data || []);
    } catch (error) {
      console.error("Error cargando alertas de materiales:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlertas();
  }, []);

  return { alertas, loading, refetch: fetchAlertas };
};
