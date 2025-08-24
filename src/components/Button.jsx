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
    <button onClick={onClick} className="bg-[#046BB1] flex gap-2 justify-center items-center py-3 px-4 rounded-lg">
      <Plus className="text-white" size={15}/>
      <p className="boton text-white">{label}</p>
    </button>
  )
  
}