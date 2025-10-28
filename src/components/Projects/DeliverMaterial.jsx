import { InputForm } from '../Input'
import { SaveOrCancelButtons } from '../Button'

export default function DeliverMaterial({onClickCancel}) {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[80%] sm:w-[50%] lg:w-[35%] p-6 flex flex-col">
        <div id="encabezado" className="border-b border-gray-200 pb-4">
            <h2 className="titulo2">Entregar material</h2>
            <p className="text-[#709DBB] text-sm">
                Entregar los materiales reservados a la obra 
            </p>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
            <div className='parrafo flex flex-col gap-2 mb-8'>
                <p>Cantidad reservada: </p>
            </div>
            <InputForm
            type="number"
            label="Cantidad a entregar"
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
