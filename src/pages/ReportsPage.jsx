import Layout from '../components/Layout'; 
import DetailsReportByProject from '../components/Reports/DetailsReport';
import CreateReport from '../components/Reports/CreateReport';
import useProjectsReports from '../hooks/useReports';
import { useState } from 'react';

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

  if (loading) return <Layout><p>Cargando proyectos...</p></Layout>;

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Reportes</h1>
      </div>

      <table className="min-w-full bg-white rounded-lg shadow">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Nombre</th>
            <th className="px-4 py-3 text-left">Cliente</th>
            <th className="px-4 py-3 text-left">Avance</th>
            <th className="px-4 py-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="px-4 py-2">{p.id}</td>
              <td className="px-4 py-2">{p.nombre}</td>
              <td className="px-4 py-2">{p.cliente}</td>
              <td className="px-4 py-2">{p.avanceActual}%</td>
              <td className="px-4 py-2">
                <button
                  className="text-[#046BB1] hover:underline"
                  onClick={() => openReportsPopup(p)} 
                >
                  Ver reportes
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
