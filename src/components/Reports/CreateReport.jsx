import { useEffect, useState } from "react";
import { SaveOrCancelButtons } from "../Button";
import { InputForm } from "../Input";
import { createReport } from "../../services/reports";
import { useAuth } from "../../context/AuthContext";

export default function CreateReport({ project, onClickCancel, onClickSave }) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    avance: project.avanceActual || 0,
    cambiar_estado: false,
    actividades: "",
    problemas_obs: "",
    proximos_pasos: "",
  });

  const [errors, setErrors] = useState({});

  // 🔁 Si el proyecto cambia (por ejemplo, al abrir otro popup)
  useEffect(() => {
    if (project) {
      setFormData((prev) => ({
        ...prev,
        avance: project.avanceActual || 0,
      }));
    }
    // Limpiar errores cuando cambia el proyecto
    setErrors({});
  }, [project]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    // 🧠 Evitar que el usuario baje el valor debajo del avance actual
    if (value >= project.avanceActual) {
      setFormData((prev) => ({ ...prev, avance: value }));
      // Limpiar error si existe
      if (errors.avance) {
        setErrors(prev => ({ ...prev, avance: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.actividades.trim()) {
      newErrors.actividades = "Las actividades completadas son obligatorias";
    }

    if (!formData.problemas_obs.trim()) {
      newErrors.problemas_obs = "Los problemas u observaciones son obligatorios";
    }

    if (!formData.proximos_pasos.trim()) {
      newErrors.proximos_pasos = "Los próximos pasos son obligatorios";
    }

    // Validar que el avance no sea menor al avance actual del proyecto
    if (formData.avance < (project.avanceActual || 0)) {
      newErrors.avance = `El avance no puede ser menor al avance actual del proyecto (${project.avanceActual || 0}%)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const reportData = {
        id_proyecto: project.id,
        avance: formData.avance,
        actividades: formData.actividades,
        problemas_obs: formData.problemas_obs,
        proximos_pasos: formData.proximos_pasos,
        responsable_id: user.id, // temporal
      };

      await createReport(project.id, reportData);
      onClickSave?.(); // 🔁 para refrescar tabla o cerrar popup
    } catch (error) {
      console.error("Error al crear el reporte:", error);
      // Mostrar mensaje de error más específico si está disponible
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Error al crear el reporte: ${error.response.data.message}`);
      } else {
        alert("Error al crear el reporte");
      }
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
          value={project.nombre}
          readOnly
          className="my-2"
        />
        
        {/* 🔹 Slider de avance */}
        <div className="mb-2">
          <label className="block parrafo mb-2">% de avance</label>
          <input
            type="range"
            min={project.avance_actual ?? 0}
            max="100"
            value={formData.avance}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#046BB1]"
            style={{
              background: `linear-gradient(to right, #046BB1 0%, #046BB1 ${(formData.avance / 100) * 100}%, #E5E7EB ${(formData.avance / 100) * 100}%, #E5E7EB 100%)`,
            }}
          />
          <div className="text-right parrafo text-gray-600">
            {formData.avance}%
          </div>

          {errors.avance && (
            <p className="errores">{errors.avance}</p>
          )}

          <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #046BB1;
              cursor: pointer;
              box-shadow: 0 0 2px rgba(0,0,0,0.3);
              margin-top: -7px; /* centra el thumb */
            }

            input[type="range"]::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: #046BB1;
              cursor: pointer;
              box-shadow: 0 0 2px rgba(0,0,0,0.3);
            }
          `}</style>
        </div>

        {/* Actividades completadas */}
        <div className="mb-2">
          <label className="block parrafo mb-1">Actividades completadas*</label>
          <textarea
            name="actividades"
            value={formData.actividades}
            onChange={handleInputChange}
            placeholder="Describe las actividades completadas durante este periodo..."
            rows="3"
            className={`w-full parrafo px-4 py-2 border border-gray-400 rounded-lg resize-none`}
          />
          {errors.actividades && (
            <p className="errores">{errors.actividades}</p>
          )}
        </div>

        {/* Problemas u Observaciones */}
        <div className="mb-2">
          <label className="block parrafo mb-1">Problemas u Observaciones*</label>
          <textarea
            name="problemas_obs"
            value={formData.problemas_obs}
            onChange={handleInputChange}
            placeholder="Describe cualquier aspecto relevante..."
            rows="3"
            className={`w-full parrafo px-4 py-2 border border-gray-400 rounded-lg resize-none`}
          />
          {errors.problemas_obs && (
            <p className="errores">{errors.problemas_obs}</p>
          )}
        </div>

        {/* Próximos Pasos */}
        <div className="mb-2">
          <label className="block parrafo mb-1">Próximos Pasos*</label>
          <textarea
            name="proximos_pasos"
            value={formData.proximos_pasos}
            onChange={handleInputChange}
            placeholder="Define las actividades planeadas para el siguiente periodo..."
            rows="3"
            className={`w-full parrafo px-4 py-2 border border-gray-400 rounded-lg resize-none`}
          />
          {errors.proximos_pasos && (
            <p className="errores">{errors.proximos_pasos}</p>
          )}
        </div>

        {/* Fotos del avance */}
        <div>
          <label className="block parrafo font-medium mb-2">Fotos del avance</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#046BB1] transition-colors cursor-pointer">
            <svg
              className="mx-auto h-10 w-10 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="mt-2 parrafo text-gray-600">Subir fotos</p>
          </div>
        </div>
      </div>

      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSubmit} />
    </div>
  );
}