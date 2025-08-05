import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function InventoryPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1 overflow-y-auto">
          <h1 className="text-2xl font-semibold">Inventario</h1>
          <p>Bienvenido a la sección de inventario.</p>
        </main>
      </div>
    </div>
  )
}
