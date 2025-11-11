import { useEffect, useState } from "react";
import { SaveOrCancelButtons } from "../Button";
import { InputForm } from "../Input";
import { createReport } from "../../services/reports";

export default function CreateReport({ projectId, onClickCancel, onClickSave }) {

  const [formData, setFormData] = useState({
    avance: 0,
    cambiar_estado: false,
    actividades: '',
    problemas_obs: '',
    proximos_pasos: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSliderChange = (e) => {
    setFormData(prev => ({
      ...prev,
      avance: parseInt(e.target.value)
    }));
  };

  const handleSubmit = async () => {
    try {
      
      const reportData = {
        id_proyecto: projectId,
        avance: formData.avance,
        actividades: formData.actividades,
        problemas_obs: formData.problemas_obs,
        proximos_pasos: formData.proximos_pasos,
        responsable_id: 2 // Por ahora hardcoded, puedes pasarlo como prop
      };

      await createReport(projectId, reportData);
      alert('Reporte creado exitosamente');
      onClickCancel(); // Cerrar el formulario
    } catch (error) {
      console.error('Error al crear el reporte:', error);
      alert('Error al crear el reporte');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full lg:w-[30%] lg:h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Crear nuevo reporte</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar un nuevo avance de proyecto
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <InputForm
          type="text"
          label="Nombre de proyecto"
          placeholder={projectId.nombre}
          value={projectId.nombre}
          readOnly
          className="my-2"
        />
        <div>
          <label className="block parrafo mb-2">
            % de avance
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.avance}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #046BB1 0%, #046BB1 ${formData.avance}%, #E5E7EB ${formData.avance}%, #E5E7EB 100%)`
            }}
          />
          <div className="text-right parrafo text-gray-600">
            {formData.avance}%
          </div>
        </div>
        {/* Actividades completadas */}
        <div>
          <label className="block parrafo mb-1">
            Actividades completadas*
          </label>
          <textarea
            name="actividades"
            value={formData.actividades}
            onChange={handleInputChange}
            placeholder="Describe las actividades completadas durante este periodo..."
            rows="3"
            className="w-full parrafo px-4 py-2 border border-gray-300 rounded-lg resize-none"
          />
        </div>

        {/* Problemas u Observaciones */}
        <div>
          <label className="block parrafo mb-1">
            Problemas u Observaciones*
          </label>
          <textarea
            name="problemas_obs"
            value={formData.problemas_obs}
            onChange={handleInputChange}
            placeholder="Describe cualquier aspecto relevante..."
            rows="3"
            className="w-full parrafo px-4 py-2 border border-gray-300 rounded-lg resize-none"
          />
        </div>

        {/* Proximos Pasos */}
        <div>
          <label className="block parrafo font-medium mb-1">
            Proximos Pasos*
          </label>
          <textarea
            name="proximos_pasos"
            value={formData.proximos_pasos}
            onChange={handleInputChange}
            placeholder="Define las actividades planeadas para el siguiente periodo..."
            rows="3"
            className="w-full parrafo px-4 py-2 border border-gray-300 rounded-lg resize-none"
          />
        </div>

        {/* Fotos del avance */}
        <div>
          <label className="block parrafo font-medium mb-2">
            Fotos del avance
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#046BB1] transition-colors cursor-pointer">
            <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mt-2 parrafo text-gray-600">Subir fotos</p>
          </div>
        </div>

      </div>
      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSubmit} />
    </div>
  )
}
