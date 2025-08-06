import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

export default function MovementView() {

    const mockData = [
        {
          fecha: '2025-08-01',
          codigo: 'MAT-001',
          material: 'Cemento gris',
          cantidad: 20,
          movimiento: 'Entrada',
        },
        {
          fecha: '2025-08-02',
          codigo: 'MAT-002',
          material: 'Arena fina',
          cantidad: 50,
          movimiento: 'Salida',
        },
        {
          fecha: '2025-08-03',
          codigo: 'MAT-003',
          material: 'Grava',
          cantidad: 35,
          movimiento: 'Entrada',
        },
        {
          fecha: '2025-08-04',
          codigo: 'MAT-004',
          material: 'Varilla 3/8"',
          cantidad: 100,
          movimiento: 'Salida',
        },
        {
          fecha: '2025-08-05',
          codigo: 'MAT-005',
          material: 'Bloque de concreto',
          cantidad: 60,
          movimiento: 'Entrada',
        },
    ];
      
    const columns = [
        { name: 'Fecha', selector: row => row.fecha, sortable: "true" },
        { name: 'Codigo', selector: row => row.codigo, sortable: "true" },
        { name: 'Material', selector: row => row.material, sortable: "true" },
        { name: 'Cantidad', selector: row => row.cantidad, sortable: "true", right: "true" },
        { name: 'Tipo de movimiento', selector: row => row.movimiento, sortable: "true" },
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
            <div className='md:justify-end md:mt-0 mb-2 flex justify-start mt-2 items-center'>
                <span className='parrafo'>Buscar: </span>
                <input type="text" onChange={handleFilter} className='ml-1 border border-gray-300 rounded-sm px-2 py-1 parrafo'/>
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
                customStyles={customStyles}
            />
        </section>
    )
}
