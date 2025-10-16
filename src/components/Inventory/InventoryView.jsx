import React, { useState, useEffect, useCallback } from 'react';
import DataTable from 'react-data-table-component';
import { CirclePlus, Trash2 } from 'lucide-react';
import WithPermission from '../WithPermission';
import { eliminarMaterial } from '../../services/inventory';
import { useAuth } from '../../context/AuthContext';
import Modal from '../Modal';

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

export default function InventoryView({data, refetch, onAgregarMaterial}) {
  
  const [records,  setRecords] = useState([]);
  const [modalData, setModalData] = useState(null);
  const { hasAnyPermission } = useAuth(); // o tu usePermissions()
  const canEdit = hasAnyPermission(['editar_inventario']);
  const canDelete = hasAnyPermission(['eliminar_material']);

  useEffect(() => {
    setRecords(data);
  }, [data]);

  const handleEliminar = (id) => {
    setModalData({
      title: "Eliminar material",
      message: "¿Estás seguro de eliminar este material?",
      type: "confirm",
      onConfirm: async () => {
        try {
          await eliminarMaterial(id);
          setModalData({
            title: "Éxito",
            message: "Material eliminado correctamente.",
            type: "alert",
            onCancel: () => setModalData(null),
          });
          refetch();
        } catch (error) {
          console.error("Error eliminando material:", error);
          const msg =
            error.response?.data?.message ||
            "Error del servidor al eliminar el material.";
          setModalData({
            title: "Error",
            message: msg,
            type: "alert",
            onCancel: () => setModalData(null),
          });
        }
      },
      onCancel: () => setModalData(null),
    });
  };
  
  const columns = [
      { name: 'Código', selector: row => row.codigo, sortable: "true" },
      { name: 'Material', selector: row => row.nombre_material, sortable: "true" },
      { name: 'En bodega', selector: row => row.en_bodega, sortable: "true", center: "true" },
      { name: 'Reservado', selector: row => row.reservado, sortable: "true", center: "true" },
      { name: 'Disponible', selector: row => row.disponible, sortable: "true", center: "true" },
      {
        name: 'Nivel de stock',
        selector: row => row.nivel_stock,
        cell: row => getStockBadge(row.nivel_stock),
        sortable: true,
      }
  ];

  if (canEdit) {
    columns.push({
      name: 'Acciones',
      cell: (row) => (
        <div style={{ display: 'flex', gap: 12 }}>
          {/* Botón agregar (requiere editar_inventario) */}
          <button title="Agregar" onClick={() => onAgregarMaterial(row)}>
            <CirclePlus size={20} color="#046bb1" />
          </button>

          {/* Botón eliminar (requiere eliminar_material) */}
          {canDelete && (
            <button
              title="Eliminar"
              onClick={() => handleEliminar(row.id_material)}
            >
              <Trash2 size={20} color="#6E6E71" />
            </button>
          )}
        </div>
      ),
      ignoreRowClick: true,
      button: "true",
    });
  }

  function handleFilter(event){
      const value = event.target.value.toLowerCase();
      const newData = data.filter(row =>
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
      fixedHeader
      pagination
      responsive
      highlightOnHover
      pointerOnHover
      customStyles={customStyles}
    />
  
    {modalData && (
      <Modal
        title={modalData.title}
        message={modalData.message}
        onConfirm={modalData.onConfirm}
        onCancel={modalData.onCancel}
        type={modalData.type}
      />
    )}
  </section>
  );
}
