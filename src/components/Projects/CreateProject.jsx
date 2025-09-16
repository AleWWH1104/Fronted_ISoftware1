import { SaveOrCancelButtons } from "../Button"
import { InputForm } from "../Input"
import { useEffect, useState } from "react";

export default function CreateProjectPopup({onClickCancel, onClickSave}) {
  const [isCreateClient, setCreateClient] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg w-[30%] h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Crear nuevo proyecto</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar un nuevo proyecto de Pool Center
        </p>
      </div>
      <div className="flex-1">
        <div className="flex gap-2 items-center my-3">
          <span className="bg-[#DBE6EE] px-1.5 py-0.5 rounded-full text-xs">1</span>
          <p className="text-sm">Registrar informacion del proyecto</p>
        </div>
        <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 gap-3">
          <InputForm
            type="text"
            label="Nombre del proyecto"
            placeholder="Ingrese el nombre del proyecto"
            value={''}
            onChange={''}
            required
            className="col-span-2"
          />
          <InputForm
            type="text"
            label="Tipo de servicio"
            placeholder="Elija una opcion"
            value={''}
            onChange={''}
            required
            className="col-span-2 row-start-2"
          />
          <InputForm
            type="text"
            label="Ubicacion"
            placeholder="Ingrese la ubicacion"
            value={''}
            onChange={''}
            required
            className="col-span-2 row-start-3"
          />
          <InputForm
            type="text"
            label="Estado"
            placeholder="Solicitado"
            value={''}
            onChange={''}
            required
            className="row-start-4"
          />
          <InputForm
            type="number"
            label="Presupuesto"
            placeholder="0"
            value={''}
            onChange={''}
            required
            className="row-start-4"
          />
        </div>
        <div className="flex gap-2 items-center my-4 border-t border-gray-200 pt-3">
          <span className="bg-[#DBE6EE] px-1.5 py-0.5 rounded-full text-xs">2</span>
          <p className="text-sm">Informacion del cliente</p>
        </div>
      {!isCreateClient ? (
        <div>
          <InputForm
            type="texto"
            label="Nombre del cliente"
            placeholder="Elija un cliente"
            value={''}
            onChange={''}
            required
            className=""
          />
          <button
            type="button"
            className="parrafo bg-gray-100 rounded-lg px-2"
            onClick={() => setCreateClient(true)}
          >
            + Nuevo cliente
          </button>
        </div>
      ) : (
        // div para crear nuevo cliente
        <div>
          <div className="flex flex-col gap-3">
            <InputForm
              type="texto"
              label="Nombre del cliente"
              placeholder="Ingrese el nombre del cliente"
              value={''}
              onChange={''}
              required
              className=""
            />
            <InputForm
              type="text"
              label="Teléfono"
              placeholder="Ingrese el número telefónico"
              value={''}
              onChange={''}
              required
              className=""
            />

            
          </div>
          <button
              type="button"
              className="parrafo bg-gray-100 rounded-lg px-2 my-3"
              onClick={() => setCreateClient(false)}
            >
              ← Volver a elegir cliente
          </button>
        </div>
        
      )}

        
      </div>

      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={""}/>
    </div>
  )
}
