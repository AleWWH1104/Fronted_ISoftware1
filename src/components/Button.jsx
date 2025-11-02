import {Plus} from "lucide-react"
export function Button({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#8dcdf4] text-white p-2.5 rounded-md my-2 w-full hover:bg-blue-900 transition-colors font-semibold"
    >
      {children}
    </button>
  )
}

export function CreateButton ({onClick, label}){
  return(
    <button onClick={onClick} className="bg-[#046BB1] flex gap-2 justify-center items-center py-2.5 px-4 rounded-lg cursor-pointer">
      <Plus className="text-white" size={15}/>
      <p className="boton text-white">{label}</p>
    </button>
  )
}

export function RedirectButton ({onClick, label}){
  return(
    <button onClick={onClick} className="border border-[#046BB1] flex gap-2 justify-center items-center py-2.5 px-4 rounded-lg cursor-pointer">
      <p className="boton text-[#046BB1]">{label}</p>
    </button>
  )
}

export function SaveOrCancelButtons ({onClick1, onClick2}){
  return(
    <div className="flex items-center gap-4 w-full parrafo border-t border-gray-200 pt-4">
      <button onClick={onClick1} className="bg-white border-2 border-[#046BB1] text-center py-2 px-4 rounded-lg w-full">
        Cancelar
      </button>
      <button onClick={onClick2} className="bg-[#046BB1] text-center py-2 px-4 rounded-lg w-full text-white">
        Guardar
      </button>
    </div>
    
  )
}