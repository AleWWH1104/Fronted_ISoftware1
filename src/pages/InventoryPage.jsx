import React from 'react'
import InventoryView from '../components/Inventory/InventoryView'

export default function InventoryPage() {
  return (
    <div className='bg-[#EEF3F7] w-full h-screen flex overflow-hidden'>
      <aside>
        <div className='bg-white min-h-screen w-[250px] p-[25px] flex-shrink-0'>Sidebar</div>
      </aside>
      <main className='flex-1 overflow-hidden flex flex-col'>
        <section className='h-[60px] bg-blue-100 flex-shrink-0'></section>
        <section className='p-[25px] flex-1 overflow-y-auto'>
          <h1 className='titulo mb-8'>Inventario</h1>
          <InventoryView/>
        </section>
      </main>
    </div>
  )
}