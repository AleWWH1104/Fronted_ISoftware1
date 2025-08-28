import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { PackagePlus, Trash2 } from 'lucide-react';
import useEstadoMateriales from '../../hooks/useInventory';
import { eliminarMaterial } from '../../services/inventory';

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

const handleEliminar = async (id) => {
  if (!confirm("¿Seguro que deseas eliminar este material?")) return;

  try {
    await eliminarMaterial(id);
    alert("Material eliminado correctamente");
    //reload(); // vuelve a cargar la lista después de eliminar
  } catch (error) {
    alert("Error eliminando el material");
    console.error(error);
  }
};

const handleAgregar = async (id) => {
  try {
    // Evitar duplicados en la lista
    if (materialesEnMovimiento.some(mat => mat.id_material === id)) {
      alert("Este material ya está en la lista.");
      setIsPopupOpen(true); // Abrir el popup por si estaba cerrado
      return;
    }

    const materialData = await getMaterialById(id);
    // Añadimos el nuevo material a la lista existente
    setMaterialesEnMovimiento(prevMateriales => [...prevMateriales, materialData]);
    setIsPopupOpen(true); // Abrimos el popup
  } catch (error) {
    console.error("Error al obtener el material:", error);
    alert("No se pudo agregar el material.");
  }
};

export default function InventoryView({onAgregarMaterial}) {
  const {estadoMateriales, refetch} = useEstadoMateriales();
  const [records,  setRecords] = useState([]);

  useEffect(() => {
    setRecords(estadoMateriales);
  }, [estadoMateriales]);

  const handleRefreshInventory = useCallback(() => {
    refetch();
  }, [refetch]);

  
  const columns = [
      { name: 'Código', selector: row => row.codigo, sortable: "true" },
      { name: 'Material', selector: row => row.nombre_material, sortable: "true" },
      { name: 'En bodega', selector: row => row.en_bodega, sortable: "true", center: "true" },
      { name: 'Reservado', selector: row => row.reservado, sortable: "true", center: "true" },
      {
        name: 'Nivel de stock',
        selector: row => row.nivel_stock,
        cell: row => getStockBadge(row.nivel_stock),
        sortable: true,
      },
      {
        name: 'Acciones',
        cell: (row) => (
          <div style={{ display: 'flex', gap: 16 }}>
            <button 
              title="Agregar"
              onClick={() => onAgregarMaterial(row)} >
              <PackagePlus size={20} color='#046bb1'/>
            </button>
            <button
              title="Eliminar"
              onClick={() => handleEliminar(row.id_material)}
            >
              <Trash2 size={20} color='#6E6E71' />
            </button>
          </div>
        ),
        ignoreRowClick: true,
        button: "true",
      }

  ];

  function handleFilter(event){
      const value = event.target.value.toLowerCase();
      const newData = estadoMateriales.filter(row =>
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
  <section className="bg-white p-4 rounded-lg pb-0 shadow-xs">
    <h2 className="subtitulo">Estado general de materiales</h2>
    <div className='md:justify-end md:mt-0 mb-2 flex justify-start mt-2 items-center gap-1'>
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
      customStyles={customStyles}
    />
  </section>
  );
}
