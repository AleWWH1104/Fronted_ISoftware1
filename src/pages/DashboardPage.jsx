import MovementView from '../components/Dashboard/MovementView'
import KPICard from "../components/Dashboard/KPI" 
import Layout from '../components/Layout'
import { Boxes, Users, ClockFading, CircleCheckBig, RefreshCw } from "lucide-react" 
import { useCountCustomers, useFinishedProjects, useInProgressProjects, useProductCount } from '../hooks/useKPIs'
import ServiceChart from '../components/Dashboard/ServiceChart'
import ProjectMaterialsView from '../components/Dashboard/ProjectMaterialsView'
import { useProjectMaterials } from '../hooks/useProjects' 

export default function DashboardPage() {
  const { countCustomers } = useCountCustomers();
  const { finishedProjects } = useFinishedProjects();
  const { inProgressProjects } = useInProgressProjects();
  const { productCount } = useProductCount();

  // Hook para materiales: con fallback para evitar crash si el hook falla
  let materials = [];
  let loading = false;
  let error = null;
  let refetch = () => {}; // Fallback vacío

  try {
    const hookResult = useProjectMaterials();
    materials = hookResult.materials || [];
    loading = hookResult.loading || false;
    error = hookResult.error || null;
    refetch = hookResult.refetch || (() => {});
  } catch (hookError) {
    console.error('Error al usar useProjectMaterials:', hookError);
    error = hookError;
    materials = []; // Evita ReferenceError
  }

  // Debug: Log en consola para verificar
  console.log('Dashboard - Materials loaded:', materials);
  console.log('Dashboard - Loading:', loading, 'Error:', error);

  const handleRefetchMaterials = () => {
    refetch();
  };

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Dashboard</h1>
      </div>
      <section id='kpis-section' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        <KPICard titulo="Total de productos" valor={productCount} icono={<Boxes/>}/> 
        <KPICard titulo="Proyectos en progreso" valor={inProgressProjects} icono={<ClockFading/>}/> 
        <KPICard titulo="Proyectos finalizados" valor={finishedProjects} icono={<CircleCheckBig/>}/>
        <KPICard titulo="Total de clientes" valor={countCustomers} icono={<Users/>}/>
      </section> 

      <section className='flex flex-col w-full gap-4 md:flex-row'>
        <div className='md:w-2/3'>
        
        </div>
        <div className='md:w-1/3'>
          <ServiceChart/>
        </div>
      </section>

      {/* Nueva tabla de materiales con datos del backend */}
      <section className="mt-4">
        <div className="flex justify-between items-center mb-2">
        </div>
      </section>
    </Layout>
  )
}