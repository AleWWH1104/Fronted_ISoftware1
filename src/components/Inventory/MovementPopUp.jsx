import { useState } from "react";
import { InputForm } from "../Input";
import { SaveOrCancelButtons } from "../Button";
import { postMovimientoMaterial } from "../../services/inventory";

function MovementMaterialForm({material, onChange, showErrors}){
  if (!material) {
    return <div className="p-4 text-sm text-gray-500">Cargando material…</div>;
  }

  const nombreMaterial = material.nombre_material ?? material.nombre ?? "";
  const [cantidad, setCantidad] = useState("");
  const [observaciones, setObservaciones] = useState("");

   const handleCantidadChange = (e) => {
    const value = Number(e.target.value);
    setCantidad(value);
    onChange({ cantidad: value, observaciones });
  };

  const handleObsChange = (e) => {
    const value = e.target.value;
    setObservaciones(value);
    onChange( { cantidad, observaciones: value });
  };

  const isInvalid = showErrors && (!cantidad || cantidad <= 0);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 border-b border-gray-200 py-4">
        <InputForm
          type="text"
          label="Nombre de material"
          placeholder={material.nombre_material}
          value={material.nombre_material}
          readOnly
          className="md:col-span-2"
        />
        <div>
          <InputForm
          type="number"
          label="Cantidad"
          placeholder="0"
          value={cantidad}
          onChange={handleCantidadChange}
          required
          className= "md:col-start-3"
          />
          {isInvalid && (
            <p className="mt-1 errores w-full">*Cantidad no válida</p>
          )}
        </div>
        <textarea
          placeholder="Ingrese notas adicionales (opcional)"
          value={observaciones}
          onChange={handleObsChange}
          rows={3}
          maxLength={500}
          className="md:col-span-3 md:row-start-2 px-4 py-2 rounded-lg  border border-gray-400 parrafo resize-none"
        />
    </div>
  )
}

export default function MovementMaterialPopUp({onClickCancel, onClickSave, material}) {
  const [movimiento, setMovimiento] = useState({ cantidad: 0, observaciones: "" });
  const [showErrors, setShowErrors] = useState(false);

  const handleFormChange = (data) => {
    setMovimiento(data);
  };

  const todayLocal = (() => {
    const d = new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  })();

  const handleSubmit = async () => {
    try {
      const cantidadNum = Number(movimiento.cantidad);
      if (!cantidadNum || cantidadNum <= 0) {
        setShowErrors(true);
        console.log("No se puede")
        return;
      }

      const materialId = material.id ?? material.id_material;
      const payload = {
        material_id: materialId,
        tipo: "Entrada",
        cantidad: cantidadNum,
        fecha: todayLocal,
        observaciones: movimiento.observaciones || null,
      };

      console.log("Enviando movimiento:", payload);
      await postMovimientoMaterial(payload);

      console.log("Listo: movimiento registrado en bodega");
      onClickSave();
    } catch (err) {
      console.error(
        "Error al registrar movimiento:",
        err.response?.data?.message || err.message
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[80%] sm:w-[50%] lg:w-[35%] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Entrada de material</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar movimiento de entrada de material al inventario
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <MovementMaterialForm 
          material={material}
          onChange={handleFormChange} 
          showErrors={showErrors} 
        />
      </div>
      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSubmit}/>
    </div>
  );
}
