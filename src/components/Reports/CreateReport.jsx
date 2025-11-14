import { useEffect, useState } from "react";
import { SaveOrCancelButtons } from "../Button";
import { InputForm } from "../Input";
import { createReport, uploadPhoto } from "../../services/reports"; // Asegúrate de importar la función de subida
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
  const [selectedFiles, setSelectedFiles] = useState([]); // Para almacenar las imágenes seleccionadas
  const [uploading, setUploading] = useState(false); // Para mostrar estado de carga
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    if (project) {
      setFormData((prev) => ({
        ...prev,
        avance: project.avanceActual || 0,
      }));
    }
    setErrors({});
    setSelectedFiles([]);
    setPreviews(prev => {
      // Limpiar previews anteriores
      prev.forEach(preview => URL.revokeObjectURL(preview.url));
      return [];
    });
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
    // Evitar que el usuario baje el valor debajo del avance actual
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

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validImages = files.filter(file => file.type.startsWith('image/'));
    
    if (files.length !== validImages.length) {
      alert('Solo se permiten archivos de imagen (jpg, png, etc.)');
    }
    
    const newPreviews = validImages.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setSelectedFiles(prev => [...prev, ...validImages]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const removeFile = (index) => {
    // Liberar la URL del objeto para evitar fugas de memoria
    URL.revokeObjectURL(previews[index].url);
    
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async (reportId) => {
    if (selectedFiles.length === 0) {
      return;
    }

    setUploading(true);

    try {
      // Enviar los archivos directamente (no URLs)
      await uploadPhoto(reportId, selectedFiles);
      console.log('Fotos subidas exitosamente');
      return true;
    } catch (error) {
      console.error('Error al subir fotos:', error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setUploading(true);

    try {
      const reportData = {
        id_proyecto: project.id,
        avance: formData.avance,
        actividades: formData.actividades,
        problemas_obs: formData.problemas_obs,
        proximos_pasos: formData.proximos_pasos,
        responsable_id: user.id, 
      };

      // Crear el reporte
      const reportResponse = await createReport(project.id, reportData);
      // El ID está en reportResponse.data.id, no en reportResponse.id
      const reportId = reportResponse.data?.id;

      if (!reportId) {
        throw new Error('No se pudo obtener el ID del reporte recién creado');
      }

      // Subir las fotos al reporte recién creado
      if (selectedFiles.length > 0) {
        await uploadFiles(reportId);
      }
      previews.forEach(preview => URL.revokeObjectURL(preview.url));

      onClickSave?.(); 
    } catch (error) {
      console.error("Error al crear el reporte:", error);
      if (error.response?.data?.message) {
        alert(`Error al crear el reporte: ${error.response.data.message}`);
      } else {
        alert("Error al crear el reporte");
      }
    } finally {
      setUploading(false);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-lg w-full lg:w-[30%] h-[90vh] max-h-[90vh] lg:h-[95%] lg:max-h-[95%] mx-[25px] p-6 flex flex-col">
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
        <div className="mb-4">
          <label className="block parrafo font-medium mb-2">Fotos del avance</label>
          
          {/* Contenedor de subida de archivos */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#046BB1] transition-colors cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />
            <label htmlFor="file-upload" className="cursor-pointer">
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
              <p className="mt-2 parrafo text-gray-600">Haz clic para subir fotos</p>
              <p className="text-xs text-gray-500">Solo imágenes (JPG, PNG)</p>
            </label>
          </div>

          {/* Vista previa de archivos seleccionados */}
          {previews.length > 0 && (
            <div className="mt-4">
              <p className="parrafo mb-2">Archivos seleccionados ({previews.length}):</p>
              <div className="grid grid-cols-2 gap-2">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview.url}
                      alt={`Preview ${index}`}
                      className="w-full h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <SaveOrCancelButtons 
          onClick1={onClickCancel} 
          onClick2={handleSubmit} 
          disabled2={uploading} // Deshabilitar botón mientras se suben fotos
      />
    </div>
  );
}