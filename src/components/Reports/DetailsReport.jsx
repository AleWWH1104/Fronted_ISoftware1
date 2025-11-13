import { useState } from 'react';
import { CreateButton } from '../Button';
import { useReportsByProject } from '../../hooks/useReports';

export default function DetailsReportByProject({projectId, onClickCancel, onCreateReport}) {
  const [expandedReport, setExpandedReport] = useState(null);
  const { projectData, loading, refetch } = useReportsByProject(projectId);

  if (loading) return <div className="bg-white p-6 rounded-lg shadow">Cargando reportes...</div>;
  if (!projectData) return <div className="bg-white p-6 rounded-lg shadow">Sin datos</div>;

  const { project, reports } = projectData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const toggleReport = (reportId) => {
    setExpandedReport(expandedReport === reportId ? null : reportId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[70%] lg:w-[50%] p-6 flex flex-col max-h-[90vh]">
      <div className="flex items-start justify-between border-b border-gray-200 pb-4">
        <div id="encabezado" className="">
            <h2 className="titulo2">{project.nombre}</h2>
            <p className="text-[#709DBB] text-sm">Historial de reportes de avance</p>
        </div>
        <button onClick={onClickCancel} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="titulo2">{project.avanceActual}%</p>
          <p className="text-gray-600 parrafo">Avance actual</p>
        </div>
        <CreateButton label="Nuevo reporte" onClick={() => onCreateReport(project)}/>
      </div>

      {/* Lista de reportes */}
      <div className="space-y-4 overflow-y-auto">
        {reports.map((reporte) => (
          <div key={reporte.id} className="border border-gray-200 rounded-lg p-4">
            {/* Header del reporte */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col md:flex-row md:items-center md:gap-3">
                <h3 className="text-md font-semibold">Reporte-{formatDate(reporte.fecha)}</h3>
                <span className="bg-blue-100 text-[#046BB1] px-3 py-1 rounded-lg parrafo">
                  {reporte.avance}% completado
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleReport(reporte.id)}
                  className="text-[#046BB1] px-4 py-2 text-sm font-medium"
                >
                  {expandedReport === reporte.id ? 'Ocultar detalle' : 'Ver detalle'}
                </button>
              </div>
            </div>

            {/* Contenido expandido */}
            {expandedReport === reporte.id && (
              <div className="mt-4 space-y-4 border-t pt-4 parrafo">
                {/* Actividades Completadas */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <h4 className="font-semibold text-gray-800">Actividades Completadas</h4>
                  </div>
                  <p className="text-gray-600 ml-7">{reporte.actividadesCompletadas}</p>
                </div>

                {/* Problemas u Observaciones */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h4 className="font-semibold text-gray-800">Problemas u Observaciones</h4>
                  </div>
                  <p className="text-gray-600 ml-7">{reporte.problemas}</p>
                </div>

                {/* Próximos Pasos */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#046BB1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <h4 className="font-semibold text-gray-800">Próximos Pasos</h4>
                  </div>
                  <p className="text-gray-600 ml-7">{reporte.proximosPasos}</p>
                </div>

                {/* Responsable y botón descargar */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="font-semibold text-gray-800">Responsable</p>
                    <p className="text-gray-600 capitalize">{reporte.responsable}</p>
                  </div>
                  <button className="bg-[#046BB1] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Descargar PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}