import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function DashboardPage() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <Topbar />
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p>Hola! 🎉</p>
          {/* Aquí va el contenido adicional del dashboard */}
        </div>
      </div>
    </div>
  )
}
