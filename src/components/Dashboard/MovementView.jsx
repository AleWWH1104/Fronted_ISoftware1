import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { useMaterialMovement } from '../../hooks/useInventory';

export default function MovementView() {

  const {movimientoMaterial} = useMaterialMovement()
    
  const columns = [
      { name: 'Fecha', selector: row => row.fecha, sortable: "true" },
      { name: 'Codigo', selector: row => row.material_codigo, sortable: "true" },
      { name: 'Material', selector: row => row.material_nombre, sortable: "true" },
      { name: 'Cantidad', selector: row => row.cantidad, sortable: "true", right: "true" },
      { name: 'Tipo de movimiento', selector: row => row.tipo, sortable: "true" },
      { name: 'Observaciones', selector: row => row.observaciones, sortable: "true" }
  ];

  useEffect(() => {
      setRecords(movimientoMaterial);
  }, [movimientoMaterial]);

  const [records,  setRecords] = useState([]);
  
  function handleFilter(event){
      const value = event.target.value.toLowerCase();
      const newData = movimientoMaterial.filter(row =>
          Object.values(row).some(
          field =>
              String(field).toLowerCase().includes(value)
          )
      );
      setRecords(newData);
  }

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

  return (
    <section className="bg-white p-4 rounded-lg pb-0">
      <h2 className="subtitulo">Movimiento de materiales</h2>
      <div className='md:justify-end md:mt-0 mb-2 flex justify-start mt-2 items-center gap-1'>
        <span className='parrafo'>Buscar: </span>
        <input type="text" onChange={handleFilter} className='ml-1 border border-gray-300 rounded-sm px-2 py-1 parrafo'/>
      </div>  
      <DataTable
          columns={columns}
          data={records}
          fixedHeader
          pagination
          responsive
          highlightOnHover
          pointerOnHover
          customStyles={customStyles}
      />
    </section>
  )
}
