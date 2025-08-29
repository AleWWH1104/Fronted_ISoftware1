import { useState } from "react";
import { InputForm } from "../Input";
import { SaveOrCancelButtons } from "../Button";
import { movimientoMaterial } from "../../services/inventory";

function MovementMaterialForm({material,  onChange}){
  const [cantidad, setCantidad] = useState("");
  const [observaciones, setObservaciones] = useState("");

   const handleCantidadChange = (e) => {
    const value = Number(e.target.value);
    setCantidad(value);
    onChange(material.id_material, { cantidad: value, observaciones });
  };

  const handleObsChange = (e) => {
    const value = e.target.value;
    setObservaciones(value);
    onChange(material.id_material, { cantidad, observaciones: value });
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 border-b border-gray-200 py-4">
        <InputForm
        type="text"
        label="Nombre de material"
        placeholder={material.nombre_material}
        value={material.nombre_material}
        readOnly
        className="col-span-2"
        />
        <InputForm
        type="number"
        label="Cantidad"
        placeholder="0"
        value={cantidad}
        onChange={handleCantidadChange}
        required
        className="col-start-3"
        />
        <textarea
          placeholder="Ingrese notas adicionales (opcional)"
          value={observaciones}
          onChange={handleObsChange}
          rows={2}
          maxLength={500}
          className="col-span-3 row-start-2 px-4 py-2 rounded-lg  border border-gray-400 parrafo resize-none"
        />
    </div>
  )
}

export default function MovementMaterialPopUp({onClickCancel, onClickSave, materiales}) {
  const [movimientos, setMovimientos] = useState({}); 

  const handleFormChange = (id, data) => {
    setMovimientos((prev) => ({ ...prev, [id]: data }));
  };

  const handleSubmit = async () => {
  try {
    const cantidadesById = new Map(
      Object.entries(movimientos).map(([id, { cantidad, observaciones }]) => [
        Number(id),
        { cantidad: Number(cantidad), observaciones },
      ])
    );

    console.log("Materiales recibidos en popup:", materiales);
    for (const mat of materiales) {
      const mov = cantidadesById.get(mat.id_material ?? mat.id);
      if (!mov || mov.cantidad <= 0) continue;

      const payload = {
        material_id: mat.id ?? mat.id_material,
        tipo: "entrada",
        cantidad: mov.cantidad,
        fecha: new Date().toISOString(),
        observaciones: mov.observaciones || null,
      };

      console.log("Enviando movimiento:", payload);
      await movimientoMaterial(payload);
    }

    console.log("listo: movimientos registrados en bodega");
    onClickSave();
  } catch (err) {
    console.error("Error al registrar movimientos:", err.response?.data?.message || err.message);
  }
};

  return (
    <div className="bg-white rounded-lg shadow-lg w-[30%] h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Movimiento de materiales</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar la entrada de materiales al inventario
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {materiales.map((mat) => (
        <MovementMaterialForm 
          key={mat.id_material}
          material={mat}
          onChange={handleFormChange}  
        />
        ))}
      </div>
      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSubmit}/>
    </div>
  );
}
