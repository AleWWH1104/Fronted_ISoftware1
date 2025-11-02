// src/pages/DashboardPage.jsx
import React from 'react';
import KPICard from "../components/Dashboard/KPI";
import Layout from '../components/Layout';
import { Boxes, Users, ClockFading, CircleCheckBig } from "lucide-react";
import { useCountCustomers, useFinishedProjects, useInProgressProjects, useProductCount } from '../hooks/useKPIs';
import ServiceChart from '../components/Dashboard/ServiceChart';
import TopProjectsBudget from '../components/Dashboard/TopProjectsBudget';
import TopMaterialsUsed from '../components/Dashboard/TopMaterialsUsed';
import MonthlyEntriesVsExitsChart from '../components/Dashboard/MonthlyEntriesVsExitsChart';

export default function DashboardPage() {
  const { countCustomers } = useCountCustomers();
  const { finishedProjects } = useFinishedProjects();
  const { inProgressProjects } = useInProgressProjects();
  const { productCount } = useProductCount();

  // Datos simulados para los nuevos componentes
  const mockTopProjects = [
    { nombre: 'Construcción Edificio A', presupuesto: 150000, estado: 'Activo' },
    { nombre: 'Remodelación Oficinas B', presupuesto: 120000, estado: 'En pausa' },
    { nombre: 'Instalación Parque C', presupuesto: 95000, estado: 'Terminado' },
    { nombre: 'Ampliación Fábrica D', presupuesto: 87500, estado: 'Activo' },
    { nombre: 'Diseño Interiores E', presupuesto: 75000, estado: 'Activo' },
  ];

  const mockTopMaterials = [
    { codigo: '01123', nombre: 'Lámpara Globrite blanca', popularidad: 55 },
    { codigo: '01123', nombre: 'Lámpara Globrite blanca', popularidad: 45 },
    { codigo: '01123', nombre: 'Lámpara Globrite blanca', popularidad: 35 },
    { codigo: '01123', nombre: 'Lámpara Globrite blanca', popularidad: 25 },
    { codigo: '01123', nombre: 'Lámpara Globrite blanca', popularidad: 15 },
  ];

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Dashboard</h1>
      </div>

      {/* Sección de KPIs */}
      <section id='kpis-section' className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
        <KPICard titulo="Total de productos" valor={productCount} icono={<Boxes />} />
        <KPICard titulo="Proyectos en progreso" valor={inProgressProjects} icono={<ClockFading />} />
        <KPICard titulo="Proyectos finalizados" valor={finishedProjects} icono={<CircleCheckBig />} />
        <KPICard titulo="Total de clientes" valor={countCustomers} icono={<Users />} />
      </section>

      {/* Segunda fila: Gráficos */}
      <section className="flex flex-col w-full gap-4 md:flex-row mb-6">
        {/* Gráfico de Entradas vs Salidas */}
        <div className="md:w-1/2 w-full">
          <MonthlyEntriesVsExitsChart />
        </div>

        {/* Gráfico de Proyectos por Servicio */}
        <div className="md:w-1/2 w-full">
          <ServiceChart />
        </div>
      </section>

      {/* Tercera fila: Top 5 - CORREGIDO */}
      <section className="flex flex-col w-full gap-4 md:flex-row">
        {/* Top 5 Materiales Usados (va a la IZQUIERDA) */}
        <div className="md:w-1/2 w-full">
          <TopMaterialsUsed materials={mockTopMaterials} />
        </div>

        {/* Top 5 Proyectos con Mayor Presupuesto (va a la DERECHA) */}
        <div className="md:w-1/2 w-full">
          <TopProjectsBudget projects={mockTopProjects} />
        </div>
      </section>
    </Layout>
  );
}