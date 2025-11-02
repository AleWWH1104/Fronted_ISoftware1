// src/components/Dashboard/TopProjectsBudget.jsx
import React from 'react'; // <-- Esta es la ÚNICA importación necesaria

const TopProjectsBudget = ({ projects = [] }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'terminado':
        return 'bg-red-100 text-red-800';
      case 'en pausa':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
      <h2 className="subtitulo mb-4">Top 5 proyectos con mayor presupuesto</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider parrafo">
                Nombre del proyecto
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider parrafo">
                Presupuesto
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider parrafo">
                Estado
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.length > 0 ? (
              projects.map((project, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-2 py-2 whitespace-nowrap text-sm font-medium text-gray-900 parrafo">
                    {project.nombre || `Proyecto ${index + 1}`}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 parrafo">
                    {project.presupuesto ? `Q${project.presupuesto}` : 'Q0'}
                  </td>
                  <td className="px-2 py-2 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.estado || 'activo')}`}>
                      {project.estado || 'Activo'}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-2 py-2 text-center text-sm text-gray-500 parrafo">
                  No hay proyectos disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProjectsBudget;