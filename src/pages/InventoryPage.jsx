import InventoryView from '../components/Inventory/InventoryView'
import Layout from '../components/Layout'
import { CreateButton } from '../components/Button'
import { useState, useEffect } from "react";
import AddMaterials from '../components/Inventory/AddMaterials';

export default function InventoryPage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Inventario</h1>
        <CreateButton label="Nuevo material" onClick={() => setIsOpen(true)}/>
      </div>
      <InventoryView/>
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <AddMaterials/>
        </div>
      )}
    </Layout>
    
  )
}