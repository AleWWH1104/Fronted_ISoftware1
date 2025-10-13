// components/Dashboard/ProjectMaterialsView.jsx
import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useProjectMaterialsForDashboard } from '../../hooks/useProjects';

export default function ProjectMaterialsView() {
  const { materials: data, loading: propLoading, error: propError } = useProjectMaterialsForDashboard();
  const [records, setRecords] = useState([]);

  // Definición columnas para la tabla de materiales
  const columns = [
    { name: 'Proyecto', selector: row => row.proyecto, sortable: true },
    { name: 'Codigo', selector: row => row.codigo, sortable: true },
    { name: 'Material', selector: row => row.material, sortable: true },
    { name: 'Ofertado', selector: row => row.ofertado, sortable: true, right: true },
    { name: 'En obra', selector: row => row.en_obra, sortable: true, right: true },
    { name: 'Pendiente de comprar', selector: row => row.pendiente_compra, sortable: true, right: true },
    { name: 'Pendiente de entrega a obras', selector: row => row.pendiente_entrega, sortable: true, right: true }
  ];

  const customStyles = {
    rows: {
      style: {
        minHeight: '40px',
      },
    },
    headCells: {
      style:{
        fontWeight: 'bold',
        fontSize: '12px',
      }
    },
  };


  useEffect(() => {
    setRecords(Array.isArray(data) ? data : []);
  }, [data]);

  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    const filtered = (data || []).filter(row => 
      Object.values(row).some(field => String(field).toLowerCase().includes(value))
    );
    setRecords(filtered);
  }

  if (propError) {
    return (
      <section className="bg-white p-4 rounded-lg shadow-xs">
        <div className="text-red-500 p-4 border border-red-300 rounded">Error al cargar datos: {propError.message || propError}</div>
      </section>
    );
  }

  if (propLoading) {
    return (
      <section className="bg-white p-4 rounded-lg shadow-xs">
        <div className="flex justify-center items-center h-64">
          <div 
            className="animate-spin rounded-full h-8 w-8 border-b-2" 
            style={{ borderColor: '#046BB1' }}
          ></div>
          <span className="ml-2">Cargando materiales...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white p-4 rounded-lg shadow-xs">
      <h2 className="subtitulo">Detalle de materiales en proyectos activos</h2>

      <div className='md:justify-end md:mt-0 mb-2 flex justify-start mt-2 items-center gap-1'>
        <span className='parrafo'>Buscar: </span>
        <input 
          type="text" 
          onChange={handleFilter} 
          className='ml-1 border border-gray-300 rounded-sm px-2 py-1 parrafo'
        />
      </div>

      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        responsive
        highlightOnHover
        pointerOnHover
        pagination
        customStyles={customStyles}
        noDataComponent={<div className="p-4 text-gray-500">No hay datos de materiales disponibles.</div>}
      />
    </section>
  );
}