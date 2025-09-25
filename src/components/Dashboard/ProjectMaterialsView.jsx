import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

export default function ProjectMaterialsView({ data, loading: propLoading, error: propError }) {
  const [records, setRecords] = useState([]);

  // Definición columnas para la tabla de materiales, coincidiendo con tu solicitud.
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
    rows: { style: { minHeight: '35px', fontSize: '14px', color: '#4B5563' } },
    headCells: {
      style: {
        fontWeight: '600',
        fontSize: '14px',
        color: '#000000',
        borderBottom: '1px solid #e5e7eb',
        paddingLeft: '10px',
        paddingRight: '10px',
      },
    },
    cells: { style: { paddingLeft: '10px', paddingRight: '10px' } },
    pagination: {
      style: {
        fontSize: '14px',
        color: '#4B5563',
        borderTop: '1px solid #e5e7eb',
      }
    }
  };

  useEffect(() => {
    setRecords(Array.isArray(data) ? data : []);
  }, [data]);

  // Filtro opcional para búsqueda interna (usa 'data' del prop, no 'records' para filtrar sobre el original)
  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    const filtered = (data || []).filter(row => 
      Object.values(row).some(field => String(field).toLowerCase().includes(value))
    );
    setRecords(filtered);
  }

  // Si hay error, mostrar mensaje simple
  if (propError) {
    return (
      <section className="bg-white p-4 rounded-lg shadow-xs">
        <h2 className="text-black font-semibold mb-3">Detalle de materiales en proyectos activos</h2>
        <div className="text-red-500 p-4 border border-red-300 rounded">Error al cargar datos: {propError.message || propError}</div>
      </section>
    );
  }

  // Si está cargando, mostrar spinner simple (puedes mejorar con un componente propio)
  if (propLoading) {
    return (
      <section className="bg-white p-4 rounded-lg shadow-xs">
        <h2 className="text-black font-semibold mb-3">Detalle de materiales en proyectos activos</h2>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2">Cargando materiales...</span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white p-4 rounded-lg shadow-xs">
      <h2 className="text-black font-semibold mb-3">Detalle de materiales en proyectos activos</h2>

      <div className='flex mb-2 items-center gap-2'>
        <span className='parrafo'>Buscar: </span>
        <input 
          type="text" 
          onChange={handleFilter} 
          className='border border-gray-300 rounded-sm px-2 py-1 parrafo' 
          placeholder="Buscar en la tabla..."
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