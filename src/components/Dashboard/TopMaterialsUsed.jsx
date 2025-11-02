// src/components/Dashboard/TopMaterialsUsed.jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TopMaterialsUsed = ({ materials = [] }) => {
  // Si no hay datos, mostramos un mensaje
  if (materials.length === 0) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
        <h2 className="subtitulo mb-4">Top 5 materiales más usados</h2>
        <p className="text-center text-sm text-gray-500 parrafo">No hay datos disponibles.</p>
      </div>
    );
  }

  // Transformamos los datos para recharts
  const chartData = materials.map((material, index) => ({
    ...material,
    nombre: material.nombre || `Material ${index + 1}`,
    codigo: material.codigo || `0000${index + 1}`,
    popularidad: material.popularidad || 0, // Asumimos que el dato viene como un número entre 0 y 100
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
      <h2 className="subtitulo mb-4">Top 5 materiales más usados</h2>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider parrafo">
                Código
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider parrafo">
                Material
              </th>
              <th className="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider parrafo">
                Popularidad
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {chartData.map((material, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 parrafo">
                  {material.codigo}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 parrafo">
                  {material.nombre}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  {/* Contenedor de la barra y el porcentaje */}
                  <div className="flex items-center space-x-2">
                    {/* Barra de progreso */}
                    <div className="w-32 bg-blue-100 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${material.popularidad}%` }}
                      ></div>
                    </div>
                    {/* Badge con el porcentaje */}
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {material.popularidad}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopMaterialsUsed;