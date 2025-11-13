import Layout from '../components/Layout'; 
import DetailsReportByProject from '../components/Reports/DetailsReport';
import CreateReport from '../components/Reports/CreateReport';
import useProjectsReports from '../hooks/useReports';
import { useState } from 'react';
import ReportsView from '../components/Reports/ReportsView';

export default function ReportsPage() {
  const { reports, loading, refetch } = useProjectsReports();
  const [selectedProject, setSelectedProject] = useState(null); 
  const [isPopUp1, setPopUp1] = useState(false);
  const [isPopUp2, setPopUp2] = useState(false);

  const handleSaveAndRefresh = () => {
    refetch(); 
    setPopUp2(false);
    setPopUp1(true);
  };

  const openReportsPopup = (project) => {
    setSelectedProject(project); 
    setPopUp1(true);
  };

  const handleViewReport = (project) => {
    openReportsPopup(project);
  };

  const handleDownloadReport = async (project) => {
    // Implementar lógica de descarga de reporte
    console.log("Descargando reporte del proyecto:", project);
    // Aquí iría la lógica para descargar el reporte
    // Por ejemplo, llamar a un endpoint de descarga
  };

  if (loading) return <Layout><p>Cargando reportes...</p></Layout>;

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Reportes</h1>
      </div>

      <ReportsView
        data={reports}
        refetch={refetch}
        onViewReport={handleViewReport}
        onDownloadReport={handleDownloadReport}
      />
      
      {/* Popup 1 → detalles del proyecto */}
      {isPopUp1 && selectedProject && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 py-8 overflow-y-auto">
          <DetailsReportByProject
            projectId={selectedProject.id} // para el hook interno
            onClickCancel={() => setPopUp1(false)}
            onCreateReport={() => {
              setPopUp1(false);
              setPopUp2(true);
            }}
          />
        </div>
      )}

      {/* Popup 2 → crear nuevo reporte */}
      {isPopUp2 && selectedProject && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <CreateReport
            project={selectedProject} 
            onClickCancel={() => {
              setPopUp2(false);
              setPopUp1(true);
            }}
            onClickSave={handleSaveAndRefresh}
          />
        </div>
      )}
    </Layout>
  );
}