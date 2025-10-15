import Layout from "../components/Layout";
import MovementView from '../components/Dashboard/MovementView';  // Ajusta la ruta si es necesario

export default function MovementPage() {
  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Movimiento de materiales</h1>
      </div>
      
      {/* Aquí agregamos el componente MovementView */}
      <MovementView />
    </Layout>
  );
}
