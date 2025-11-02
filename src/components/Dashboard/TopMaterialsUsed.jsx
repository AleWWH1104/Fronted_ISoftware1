// src/components/Dashboard/TopMaterialsUsed.jsx
import React from 'react';
import { useTopMaterialsUsed } from '../../hooks/useKPIs';

export default function TopMaterialsUsed() {
  const { materials: backendMaterials, loading, error } = useTopMaterialsUsed();

  // 🔁 DATOS SIMULADOS (reemplazan los datos reales del backend que vienen en 0)
  // Basado en tu data.sql: suma de 'ofertada' por material en proyectos 'En Progreso'
  const mockMaterials = [
    { id: 3, codigo: 'GRA15', nombre: 'Grava' },
    { id: 2, codigo: 'ARE22', nombre: 'Arena fina' },
    { id: 1, codigo: 'CEM01', nombre: 'Cemento hidráulico' },
    { id: 7, codigo: 'MOR19', nombre: 'Mortero impermeable' },
    { id: 4, codigo: 'VAR33', nombre: 'Varilla de acero' }
  ];

  // Asignamos "uso relativo" arbitrario (solo para calcular porcentajes)
  // Estos números NO se muestran, solo sirven para la proporción
  const usageValues = [90, 85, 70, 70, 30];
  const materials = mockMaterials.map((mat, i) => ({
    ...mat,
    uso: usageValues[i]
  }));

  // Colores para las barras
  const colors = ['#085183', '#046BB1', '#0380D5', '#0697FA', '#89CFFF'];

  // Calcula el total de uso para el porcentaje relativo
  const totalUso = materials.reduce((sum, m) => sum + m.uso, 0);
  
  // Calcula el porcentaje para cada material
  const materialsWithPercentage = materials.map(mat => ({
    ...mat,
    porcentaje: totalUso > 0 ? (mat.uso / totalUso) * 100 : 0
  }));

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
        <h2 className="subtitulo mb-4">Top 5 materiales usados</h2>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
        <h2 className="subtitulo mb-4">Top 5 materiales usados</h2>
        <div className="text-red-600 text-center py-8 parrafo">
          Error al cargar los materiales
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-xs h-full parrafo">
      <h2 className="subtitulo mb-4">Top 5 materiales usados</h2>
      
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
            {materialsWithPercentage.map((material, index) => {
              const color = colors[index % colors.length];
              return (
                <tr key={material.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-900 parrafo font-medium">
                    {material.codigo}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap text-sm text-gray-900 parrafo">
                    {material.nombre}
                  </td>
                  <td className="px-2 py-3 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${material.porcentaje}%`,
                            backgroundColor: color
                          }}
                        ></div>
                      </div>
                      <span 
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors parrafo"
                        style={{
                          backgroundColor: `${color}15`,
                          color: color
                        }}
                      >
                        {Math.round(material.porcentaje)}%
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}