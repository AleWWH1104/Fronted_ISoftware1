import InventoryView from '../components/Inventory/InventoryView'
import Layout from '../components/Layout'
import { CreateButton } from '../components/Button'
import { useState, useEffect } from "react";
import AddMaterials from '../components/Inventory/AddMaterials';
import MovementMaterialPopUp from '../components/Inventory/MovementPopUp';
import { getMaterialById } from '../services/inventory';
import usePermissions from '../hooks/usePermissions';
import WithPermission from '../components/WithPermission';

export default function InventoryPage() {
  const [isPopUp1, setPopUp1] = useState(false);
  const [isPopUp2, setPopUp2] = useState(false);
  const [materialesEnMovimiento, setMaterialesEnMovimiento] = useState([]);

  //Permisos
  const {canCreateMaterial} = usePermissions();

  useEffect(() => {
    if (isPopUp1 || isPopUp2) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPopUp1, isPopUp2]);

  const handleAgregarMaterial = async (id) => {
    try {
      // Evitar que se agreguen duplicados a la lista
      if (materialesEnMovimiento.some(mat => mat.id_material === id)) {
        alert("Este material ya fue agregado a la lista.");
        setPopUp2(true); // Solo nos aseguramos de que el popup esté visible
        return;
      }

      // Llamamos a la API para obtener los datos completos del material
      const materialData = await getMaterialById(id);
      
      // Añadimos el nuevo material al estado, manteniendo los anteriores
      setMaterialesEnMovimiento(prev => [...prev, materialData]);
      
      // Abrimos el popup
      setPopUp2(true);
    } catch (error) {
      console.error("Error al obtener el material:", error);
      alert("No se pudo agregar el material a la lista.");
    }
  };

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Inventario</h1>
        <WithPermission permissions={['ver_inventario']}>
          <CreateButton label="Nuevo material" onClick={() => setPopUp1(true)}/>
        </WithPermission>
        
        {/* <CreateButton label="Mov" onClick={() => setPopUp2(true)}/> */}
      </div>
      <InventoryView onAgregarMaterial={handleAgregarMaterial}/>
      {isPopUp1 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <AddMaterials onClickCancel={() => setPopUp1(false)} onClickSave={() => setPopUp1(false)}/>
        </div>
      )}
      {isPopUp2 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <MovementMaterialPopUp materiales={materialesEnMovimiento} onClickCancel={() => setPopUp2(false)}/>
        </div>
      )}
    </Layout>
    
  )
}