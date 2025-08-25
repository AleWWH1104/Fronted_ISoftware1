import InventoryView from '../components/Inventory/InventoryView'
import Layout from '../components/Layout'
import { CreateButton } from '../components/Button'
import { useState, useEffect } from "react";
import AddMaterials from '../components/Inventory/AddMaterials';
import MovementMaterialPopUp from '../components/Inventory/MovementPopUp';

export default function InventoryPage() {
  const [isPopUp1, setPopUp1] = useState(false);
  const [isPopUp2, setPopUp2] = useState(false);

  useEffect(() => {
    if (isPopUp1 || isPopUp2) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPopUp1, isPopUp2]);

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Inventario</h1>
        {/* <CreateButton label="Nuevo material" onClick={() => setPopUp1(true)}/> */}
        <CreateButton label="Nuevo material" onClick={() => setPopUp1(true)}/>
        <CreateButton label="Mov" onClick={() => setPopUp2(true)}/>
      </div>
      <InventoryView/>
      {isPopUp1 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <AddMaterials onClickCancel={() => setPopUp1(false)}/>
        </div>
      )}
      {isPopUp2 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <MovementMaterialPopUp onClickCancel={() => setPopUp2(false)}/>
        </div>
      )}
    </Layout>
    
  )
}