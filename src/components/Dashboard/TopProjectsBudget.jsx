// src/components/Dashboard/TopProjectsBudget.jsx
import React from 'react';
import { useTopProjectsBudget } from '../../hooks/useKPIs';

const TopProjectsBudget = () => {
  const { projects, loading, error } = useTopProjectsBudget();

  const getStatusColor = (status) => {
    const normalizedStatus = status.toLowerCase().trim();
    switch (normalizedStatus) {
      case 'activo':
        return 'bg-green-100 text-green-800';
      case 'finalizado':
        return 'bg-red-100 text-red-800';
      case 'en progreso':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
        <h2 className="subtitulo mb-4">Top 5 proyectos con mayor presupuesto</h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
        <h2 className="subtitulo mb-4">Top 5 proyectos con mayor presupuesto</h2>
        <div className="text-red-600 text-center py-8 parrafo">
          Error al cargar los proyectos
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
        <h2 className="subtitulo mb-4">Top 5 proyectos con mayor presupuesto</h2>
        <div className="text-gray-500 text-center py-8 parrafo">
          No hay proyectos disponibles.
        </div>
      </div>
    );
  }

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
            {projects.map((project, index) => (
              <tr key={project.id} className="hover:bg-gray-50">
                <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900 parrafo">
                  {project.nombre}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-900 parrafo">
                  {project.presupuesto ? `Q${project.presupuesto}` : 'Q0'}
                </td>
                <td className="px-2 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.estado || 'activo')}`}>
                    {project.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopProjectsBudget;