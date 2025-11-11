import { useState } from 'react';
import Layout from '../components/Layout'
import CreateReport from '../components/Reports/CreateReport';
import { CreateButton } from '../components/Button';

export default function ReportsPage() {
  const [isPopUp1, setPopUp1] = useState(false);

  const handleSaveAndRefresh = () => {
    refetch(); // 1. Llama a refetch para actualizar
    setPopUp1(false); // 2. Cierra el primer pop-up --crear
  };

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Reportes</h1>
        <CreateButton label="Nuevo reporte" onClick={() => setPopUp1(true)}/>
      </div>
      {isPopUp1 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <CreateReport projectId={2} onClickCancel={() => setPopUp1(false)} onClickSave={handleSaveAndRefresh}/>
        </div>
      )}
    </Layout>
  )
}
