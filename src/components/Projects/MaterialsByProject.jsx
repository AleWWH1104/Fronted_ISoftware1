import React from 'react'
import { ArrowLeft} from 'lucide-react'

export default function MaterialsByProjectView({projectId, onBack}) {
  return (
    <section className="bg-white p-4 rounded-lg pb-0 shadow-xs h-100">
        <h2 className="subtitulo">Hola Proyecto: {projectId}</h2>
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 border rounded-md hover:bg-gray-50"
        >
          <ArrowLeft size={16} />
          <span>Volver a proyectos</span>
        </button>
    </section>
  )
}
