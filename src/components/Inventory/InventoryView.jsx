import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { PackagePlus, Trash2 } from 'lucide-react';

const mockData = [
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 10, reservado: 10, nivelStock: 'Alto' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 1, reservado: 1, nivelStock: 'Bajo' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 4, reservado: 4, nivelStock: 'Medio' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 9, reservado: 9, nivelStock: 'Alto' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 7, reservado: 7, nivelStock: 'Alto' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 2, reservado: 2, nivelStock: 'Bajo' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 15, reservado: 15, nivelStock: 'Alto' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 6, reservado: 6, nivelStock: 'Medio' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 6, reservado: 6, nivelStock: 'Medio' },
  { codigo: '01123', material: 'Lámpara Globrite blanca', enBodega: 11, reservado: 11, nivelStock: 'Alto' },
  { codigo: '02456', material: 'Cable eléctrico 12AWG', enBodega: 50, reservado: 45, nivelStock: 'Alto' },
  { codigo: '02456', material: 'Cable eléctrico 12AWG', enBodega: 25, reservado: 20, nivelStock: 'Medio' },
  { codigo: '03789', material: 'Interruptor simple', enBodega: 3, reservado: 2, nivelStock: 'Bajo' },
  { codigo: '03789', material: 'Interruptor simple', enBodega: 8, reservado: 5, nivelStock: 'Medio' },
  { codigo: '04012', material: 'Tomacorriente doble', enBodega: 12, reservado: 10, nivelStock: 'Alto' },
];

// Helper para badge colorido
const getStockBadge = (nivel) => {
  const styles = {
    Alto: { backgroundColor: '#d1fae5', color: '#065f46' }, // verde
    Medio: { backgroundColor: '#fef3c7', color: '#92400e' }, // amarillo
    Bajo: { backgroundColor: '#fee2e2', color: '#991b1b' },  // rojo
  };
  const style = styles[nivel] || {};
  return (
    <span style={{ padding: '0.25rem 0.5rem', borderRadius: '0.5rem', fontWeight: '600', ...style }}>
      {nivel}
    </span>
  );
};


export default function InventoryView() {
    const columns = [
        { name: 'Código', selector: row => row.codigo, sortable: true },
        { name: 'Material', selector: row => row.material, sortable: true },
        { name: 'En bodega', selector: row => row.enBodega, sortable: true, center: true },
        { name: 'Reservado', selector: row => row.reservado, sortable: true, center: true },
        {
          name: 'Nivel de stock',
          selector: row => row.nivelStock,
          cell: row => getStockBadge(row.nivelStock),
          sortable: true,
        },
        {
          name: 'Acciones',
          cell: () => (
            <div style={{ display: 'flex', gap: 16 }}>
              <button title="Agregar" className="">
                <PackagePlus size={20} color='#046bb1'/>
              </button>
              <button title="Eliminar" className="">
                <Trash2 size={20} color='#6E6E71' />
              </button>
            </div>
          ),
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
    ];

    const [records,  setRecords] = useState(mockData);

    function handleFilter(event){
        const value = event.target.value.toLowerCase();
        const newData = mockData.filter(row =>
            Object.values(row).some(
            field =>
                String(field).toLowerCase().includes(value)
            )
        );
        setRecords(newData);
    }

    return (
    <section className="bg-white p-4 rounded-lg pb-0">
      <h2 className="subtitulo">Estado general de materiales</h2>
      <div className='text-end mb-2'>
        <span className='parrafo'>Buscar: </span>
        <input type="text" onChange={handleFilter} className='border border-gray-300 rounded-sm px-2 py-1 parrafo'/>
      </div>
      <DataTable
        columns={columns}
        data={records}
        selectableRows
        fixedHeader
        pagination
        responsive
        highlightOnHover
        pointerOnHover
      />
    </section>
  );
}
