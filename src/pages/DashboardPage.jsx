import React from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import MovementView from '../components/Dashboard/MovementView'
import KPICards from "../components/Dashboard/KPI"   // ✅ corregido

export default function DashboardPage() {
  return (
    <div className="bg-[#EEF3F7] w-full h-screen flex overflow-hidden">
      <Sidebar />
      <main className='flex-1 overflow-hidden flex flex-col'>
        <Topbar/>
        <section className='p-[25px] flex-1 overflow-y-auto'>
          <h1 className='titulo mb-8'>Dashboard</h1>
          <KPICards />  
          <MovementView/>
        </section>
      </main>
    </div>
  )
}
