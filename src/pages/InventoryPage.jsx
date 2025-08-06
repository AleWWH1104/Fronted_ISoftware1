import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import InventoryView from '../components/Inventory/InventoryView'

export default function InventoryPage() {
  return (
    <div className='bg-[#EEF3F7] w-full h-screen flex overflow-hidden'>
      <Sidebar /> 
      <main className='flex-1 overflow-hidden flex flex-col'>
        <Topbar/>
        <section className='p-[25px] flex-1 overflow-y-auto'>
          <h1 className='titulo mb-8'>Inventario</h1>
          <InventoryView/>
        </section>
      </main>
    </div>
  )
}