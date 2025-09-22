import InventoryView from '../components/Inventory/InventoryView'
import Layout from '../components/Layout'
import { CreateButton } from '../components/Button'
import { useState, useEffect} from "react";
import AddMaterials from '../components/Inventory/AddMaterials';
import MovementMaterialPopUp from '../components/Inventory/MovementPopUp';
import usePermissions from '../hooks/usePermissions';
import WithPermission from '../components/WithPermission';
import useEstadoMateriales from '../hooks/useInventory';

export default function InventoryPage() {
  const { estadoMateriales, loading, error, refetch } = useEstadoMateriales();

  const [isPopUp1, setPopUp1] = useState(false);
  const [isPopUp2, setPopUp2] = useState(false);
  const [materialesEnMovimiento, setMaterialesEnMovimiento] = useState([]);

  const handleSaveAndRefresh = () => {
    refetch(); // 1. Llama a refetch para actualizar la lista de materiales
    setPopUp1(false); // 2. Cierra el primer pop-up
    setPopUp2(false); // 3. Cierra el segundo pop-up
  };
  
  //Permisos
  
  const {canCreateMaterial} = usePermissions();

  useEffect(() => {
    if (isPopUp1 || isPopUp2) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPopUp1, isPopUp2]);

  // Función para agregar material a la lista
  const handleAgregarMaterial = (material) => {
    // Verificar si el material ya está en la lista
    if (!materialesEnMovimiento.some(mat => mat.id_material === material.id_material)) {
      setMaterialesEnMovimiento(prev => [...prev, material]);
      setPopUp2(true); // Abrir el popup
    } else {
      alert('Este material ya ha sido agregado a la lista');
    }
  };

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Inventario</h1>
        <WithPermission permissions={['ver_inventario']}>
          <CreateButton label="Nuevo material" onClick={() => setPopUp1(true)}/>
        </WithPermission>
      </div>
      <InventoryView data={estadoMateriales} refetch={refetch} onAgregarMaterial={handleAgregarMaterial}/>
      {isPopUp1 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <AddMaterials onClickCancel={() => setPopUp1(false)} onClickSave={handleSaveAndRefresh}/>
        </div>
      )}
      {isPopUp2 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <MovementMaterialPopUp materiales={materialesEnMovimiento} onClickCancel={() => setPopUp2(false)} onClickSave={handleSaveAndRefresh}/>
        </div>
      )}
    </Layout>
    
  )
}