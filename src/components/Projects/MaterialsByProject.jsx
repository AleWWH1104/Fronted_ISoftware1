// components/Projects/MaterialsByProject.js
import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useProjectMaterials } from "../../hooks/useProjects";

export default function MaterialsByProjectView({ projectId, onBack, onAsignMaterials }) {
  const { materials, loading, error } = useProjectMaterials(projectId);
  const [records, setRecords] = useState([]);
  const [filterText, setFilterText] = useState("");

  const projectMaterials = materials.map((mat, index) => {
    const ofertada = Number(mat.ofertada) || 0;
    const reservado = Number(mat.reservado) || 0;
    const en_obra = Number(mat.en_obra) || 0;

    const pendiente_compra = ofertada - (reservado + en_obra);
    const pendiente_entrega = reservado;

    return {
      id: `${mat.id_material}-${index}`,
      ...mat,
      ofertada,
      reservado,
      en_obra,
      pendiente_compra,
      pendiente_entrega,
    };
  });

  useEffect(() => {
    setRecords(projectMaterials);
  }, [projectMaterials]);

  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    setFilterText(value);
    
    const filtered = projectMaterials.filter(row =>
      Object.values(row).some(field =>
        String(field).toLowerCase().includes(value)
      )
    );
    setRecords(filtered);
  }

  const columns = [
    { name: "Código", selector: (row) => row.codigo, sortable: true },
    { name: "Material", selector: (row) => row.material, sortable: true },
    { name: "Ofertado", selector: (row) => row.ofertada, sortable: true, center: true },
    { name: "Reservado", selector: (row) => row.reservado, sortable: true, center: true },
    { name: "Pendiente de compra", selector: (row) => row.pendiente_compra, sortable: true, center: true },
    { name: "En obra", selector: (row) => row.en_obra, sortable: true, center: true },
    { name: "Pendiente de entrega", selector: (row) => row.pendiente_entrega, sortable: true, center: true },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-2">
          <button
            className="rounded px-1 py-1 text-xs"
            style={{ border: "1px solid #046BB1", color: "#046BB1" }}
            onClick={() => alert(`Reservar ${row.material}`)}
          >
            Reservar
          </button>
          <button
            className="rounded px-1 py-2 text-xs text-white"
            style={{ backgroundColor: "#046BB1" }}
            onClick={() => alert(`Entregar ${row.material}`)}
          >
            Entregar
          </button>
        </div>
      ),
    },
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

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 md:mb-0" style={{ color: "#046BB1" }}>
          Detalle general de materiales - Proyecto {projectId}
        </h2>
        <button
          className="text-white rounded w-full md:w-auto"
          style={{
            backgroundColor: "#046BB1",
            padding: "0.4rem 0.8rem",
            fontSize: "0.9rem",
          }}
          onClick={() => onAsignMaterials(projectId)}
        >
          + Ofertar materiales
        </button>
      </div>

      {error && <p className="text-red-500">Error cargando materiales</p>}

      <div className="flex flex-wrap justify-start items-center gap-1 mt-2 md:mt-8 mb-2">
        <span className="parrafo">Buscar: </span>
        <input 
          type="text" 
          onChange={handleFilter} 
          className="ml-1 border border-gray-300 rounded-sm px-2 py-1 parrafo w-full md:w-auto"
          placeholder="Buscar material..."
          value={filterText}
        />
      </div>

      <div className="overflow-x-auto">
        <DataTable
          columns={columns}
          data={records}
          progressPending={loading}
          pagination
          highlightOnHover
          striped
          noDataComponent="No hay materiales disponibles"
          customStyles={customStyles}
        />
      </div>

      <div className="mt-4 flex justify-center md:justify-start">
        <button
          onClick={onBack}
          className="text-white rounded w-full md:w-auto"
          style={{
            backgroundColor: "#046BB1",
            padding: "0.4rem 0.8rem",
            fontSize: "0.9rem",
          }}
        >
          Volver a proyectos
        </button>
      </div>
    </div>
  );
}