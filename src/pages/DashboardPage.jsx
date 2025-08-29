import MovementView from '../components/Dashboard/MovementView'
import KPICard from "../components/Dashboard/KPI" 
import Layout from '../components/Layout'
import { Boxes, Users, ClockFading, CircleCheckBig } from "lucide-react"
import { useCountCustomers, useFinishedProjects, useInProgressProjects, useProductCount } from '../hooks/useKPIs'
import ServiceChart from '../components/Dashboard/ServiceChart'

export default function DashboardPage() {

  const {countCustomers} =useCountCustomers();
  const {finishedProjects} =useFinishedProjects();
  const {inProgressProjects} =useInProgressProjects();
  const {productCount} = useProductCount();

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Dashboard</h1>
      </div>
      <section id='kpis-section' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        <KPICard titulo="Total de productos" valor={productCount} icono={<Boxes/>}/> {/*Falta*/}
        <KPICard titulo="Proyectos en progreso" valor={inProgressProjects} icono={<ClockFading/>}/> {/*Falta*/}
        <KPICard titulo="Proyectos finalizados" valor={finishedProjects} icono={<CircleCheckBig/>}/>
        <KPICard titulo="Total de clientes" valor={countCustomers} icono={<Users/>}/>
      </section> 
      <section className='flex flex-col w-full gap-4 md:flex-row'>
        <div className='md:w-2/3'>
          <MovementView/>
        </div>
        <div className='md:w-1/3'>
          <ServiceChart/>
        </div>
      </section>

      

    </Layout>
  )
}
