// components/Projects/AssignMaterialsPopup.jsx
import React, { useState } from 'react';
import { useMateriales, useAssignMaterial } from '../../hooks/useProjects';

export default function AssignMaterialsPopup({ projectId, onClose, onAssign }) {
  const { materiales, loading: loadingMateriales, error } = useMateriales();
  const { assignMaterial, loading: loadingAssign } = useAssignMaterial();
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [cantidad, setCantidad] = useState('');

  const handleAssign = async () => {
    if (!selectedMaterial || !cantidad) {
      alert('Por favor selecciona un material y ingresa la cantidad');
      return;
    }

    if (cantidad <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    try {
      const material = materiales.find(m => m.id == selectedMaterial);
      await assignMaterial(projectId, {
        id_material: selectedMaterial,
        cantidad: parseInt(cantidad)
      });
      
      onAssign({
        id_material: selectedMaterial,
        material: material.material,
        codigo: material.codigo,
        cantidad: parseInt(cantidad)
      });
      
      onClose();
    } catch (err) {
      console.error('Error asignando material:', err);
    }
  };

  if (loadingMateriales) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2">Cargando materiales...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg w-96">
          <div className="text-red-500">Error cargando materiales: {error.message}</div>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-300 rounded"
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#046BB1" }}>
          Asignar Material al Proyecto
        </h3>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Material:</label>
          <select 
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar material</option>
            {materiales.map((mat) => (
              <option key={mat.id} value={mat.id}>
                {mat.codigo} - {mat.material}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Cantidad Ofertada:</label>
          <input 
            type="number" 
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ingresa la cantidad"
            min="1"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
            disabled={loadingAssign}
          >
            Cancelar
          </button>
          <button 
            onClick={handleAssign}
            className="px-4 py-2 text-white rounded hover:bg-blue-700"
            style={{ backgroundColor: "#046BB1" }}
            disabled={loadingAssign}
          >
            {loadingAssign ? 'Asignando...' : 'Asignar'}
          </button>
        </div>
      </div>
    </div>
  );
}