import { useState } from "react";
import { InputForm } from "../Input";
import { SaveOrCancelButtons } from "../Button";

function MovementMaterialForm({material}){
  const [cantidad, setCantidad] = useState("");
  const [observaciones, setObservaciones] = useState("");
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-2 border-b border-gray-200 py-4">
        <InputForm
        type="text"
        label="Nombre de material"
        placeholder={material.nombre}
        value={material.nombre}
        readOnly
        className="col-span-2"
        />
        <InputForm
        type="number"
        label="Cantidad"
        placeholder="0"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
        required
        className="col-start-3"
        />
        <textarea
          placeholder="Ingrese notas adicionales (opcional)"
          value={observaciones}
          onChange={(e) => setObservaciones(e.target.value)}
          rows={2}
          maxLength={500}
          className="col-span-3 row-start-2 px-4 py-2 rounded-lg  border border-gray-400 parrafo resize-none"
        />
    </div>
  )
}

export default function MovementMaterialPopUp({onClickCancel}) {
    //Mock data
    const materiales = [
        { id: 1, nombre: "Lámpara Globerite blanca" },
        { id: 2, nombre: "Bomba de agua 1HP" },
        { id: 3, nombre: "Filtro de arena 20kg" },
    ];

    const handleAdd = () => {
        
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
        <MovementMaterialForm material={mat}/>
        ))}
      </div>
      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={""}/>
    </div>
  );
}
