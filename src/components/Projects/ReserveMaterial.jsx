import React from 'react'
import { InputForm } from '../Input'
import { SaveOrCancelButtons } from '../Button'

export default function ReserveMaterial({onClickCancel}) {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[80%] sm:w-[50%] lg:w-[35%] p-6 flex flex-col">
        <div id="encabezado" className="border-b border-gray-200 pb-4">
            <h2 className="titulo2">Reservar material</h2>
            <p className="text-[#709DBB] text-sm">
                Reservar la cantidad de materiales disponibles en bodega
            </p>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
            <div className='parrafo flex flex-col gap-2 mb-8'>
                <p>Cantidad disponible en bodega: </p>
                <p>Maxima cantidad a reservar: </p>
            </div>
            

            <InputForm
            type="number"
            label="Cantidad a reservar"
            placeholder="0"
            value={"cantidad"}
            onChange={""}
            required
            />
        </div>
    <SaveOrCancelButtons onClick1={onClickCancel} onClick2={"handleSubmit"}/>
    </div>
  )
}
