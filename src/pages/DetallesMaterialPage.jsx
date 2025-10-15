import Layout from "../components/Layout";
import ProjectMaterialsView from '../components/Dashboard/ProjectMaterialsView';

export default function DetallesMaterialPage() {
  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Movimiento de materiales</h1>
      </div>
      
     
      <ProjectMaterialsView />
    </Layout>
  );
}
