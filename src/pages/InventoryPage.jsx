import InventoryView from '../components/Inventory/InventoryView'
import Layout from '../components/Layout'
import { CreateButton, RedirectButton } from '../components/Button'
import { useState, useEffect} from "react";
import AddMaterials from '../components/Inventory/AddMaterials';
import MovementMaterialPopUp from '../components/Inventory/MovementPopUp';
import WithPermission from '../components/WithPermission';
import useEstadoMateriales from '../hooks/useInventory';
import { useLocation, useNavigate } from "react-router-dom";

export default function InventoryPage() {
  const { estadoMateriales, loading, error, refetch } = useEstadoMateriales();

  const [isPopUp1, setPopUp1] = useState(false);
  const [isPopUp2, setPopUp2] = useState(false);
  const [materialEnMovimiento, setMaterialEnMovimiento] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSaveAndRefresh = () => {
    refetch(); // 1. Llama a refetch para actualizar la lista de materiales
    setPopUp1(false); // 2. Cierra el primer pop-up
    setPopUp2(false); // 3. Cierra el segundo pop-up
    setMaterialEnMovimiento(null);
  };
  
  useEffect(() => {
    const el = document.body;                 // referencia local
    const prev = el.style.overflow;           // guarda el valor previo
    el.style.overflow = (isPopUp1 || isPopUp2) ? "hidden" : "auto";
    return () => { el.style.overflow = prev; };
  }, [isPopUp1, isPopUp2]);

  useEffect(() => {
    if (location.state?.openCreate) {
      setPopUp1(true);
      // limpia el state para que no se vuelva a abrir al refrescar/volver
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  // Función para agregar material a la lista
  const handleAgregarMaterial = (material) => {
    if (materialEnMovimiento?.id_material === material.id_material) {
      setPopUp2(true);
      return;
    }
    setMaterialEnMovimiento(material);
    setPopUp2(true);
  };

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Inventario</h1>
        <div className='flex gap-4'>
          <RedirectButton label="Ver historial de movimientos" onClick={() => navigate("/movements")}/>
          <WithPermission permissions='crear_material'>
            <CreateButton label="Nuevo material" onClick={() => setPopUp1(true)}/>
          </WithPermission> 
        </div>
        
      </div>
      <InventoryView data={estadoMateriales} refetch={refetch} onAgregarMaterial={handleAgregarMaterial}/>
      {isPopUp1 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <AddMaterials onClickCancel={() => setPopUp1(false)} onClickSave={handleSaveAndRefresh}/>
        </div>
      )}
      {isPopUp2 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <MovementMaterialPopUp 
            material={materialEnMovimiento} 
            onClickCancel={() => {setPopUp2(false); setMaterialEnMovimiento(null);}} 
            onClickSave={handleSaveAndRefresh}/>
        </div>
      )}
    </Layout>
    
  )
}