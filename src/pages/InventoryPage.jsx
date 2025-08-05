
import React from 'react'
import Sidebar from '../components/Sidebar'

export default function InventoryPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">Inventario</h1>
        {/* Aquí puedes agregar el contenido de la página */}
        <p>Bienvenido a la sección de inventario.</p>
      </div>
    </div>
  )
}
