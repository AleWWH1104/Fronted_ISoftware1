import { useEffect, useState } from "react";
import ReportsView from "../components/Reports/ReportsView";
import Layout from "../components/Layout";

export default function ReportsPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      // Lógica real: Descomenta esto cuando el backend funcione
      const response = await fetch("http://localhost:4000/services/proyectos/reportes");
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const result = await response.json();
      setData(result);

      // Temporal: Comenta o elimina esto cuando uses el fetch real
      // const mockData = [
      //   {"id":3,"nombre":"Jacuzzi Club Náutico del Lago","cliente":"Club Náutico del Lago","ultimoReporte":"2025-11-13","totalReportes":1,"avanceActual":60,"estado":"En Progreso"},
      //   {"id":6,"nombre":"Jacuzzi Jorge Martínez","cliente":"Jorge Martínez","ultimoReporte":null,"totalReportes":0,"avanceActual":0,"estado":"Finalizado"},
      //   // Agrega el resto del JSON
      // ];
      // setData(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleViewReport = (reportId) => {
    console.log("Ver reporte con ID:", reportId);
    // Implementa lógica para ver (e.g., modal o navegación)
  };

  const handleDownloadReport = async (reportId) => {
    try {
      // Lógica real: Descomenta cuando el endpoint de descarga funcione
      const response = await fetch(`http://localhost:4000/services/proyectos/reportes/${reportId}/download`);
      if (!response.ok) {
        throw new Error("No se pudo descargar el reporte");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reporte_${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

      // Temporal: Comenta o elimina esto cuando uses el fetch real
      // alert(`Descargando reporte ${reportId}... (implementa el endpoint real)`);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <Layout>
      <ReportsView
        data={data}
        loading={loading}
        error={error}
        refetch={fetchReports}
        onViewReport={handleViewReport}
        onDownloadReport={handleDownloadReport}
      />
    </Layout>
  );
}