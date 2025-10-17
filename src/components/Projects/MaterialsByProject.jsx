import React, { useState, useEffect, useMemo } from "react";
import DataTable from "react-data-table-component";
import { useProjectMaterials } from "../../hooks/useProjects";

export default function MaterialsByProjectView({ projectId, onBack, onAsignMaterials, refreshKey }) {
  const { materials, loading, error, refetch } = useProjectMaterials(projectId);
  const [records, setRecords] = useState([]);
  const [filterText, setFilterText] = useState("");

  const projectMaterials = useMemo(() => {
    return (materials || []).map((mat, index) => {
      const ofertada = Number(mat.ofertado ?? mat.ofertada ?? 0);
      const reservado = Number(mat.reservado ?? 0);
      const en_obra   = Number(mat.en_obra ?? 0);

      const pendiente_entrega = Number(mat.pendiente_entrega ?? (ofertada - en_obra));
      const disponible_global = Number(
        mat.disponible_global ?? ((Number(mat.en_bodega ?? 0)) - (Number(mat.reservado_total ?? 0)))
      );
      const pendiente_compra = Number(
        mat.pendiente_compra ?? Math.max(0, (ofertada - en_obra) - disponible_global)
      );

      return {
        id: `${mat.material_id ?? mat.id_material ?? index}`,
        codigo: mat.codigo,
        material: mat.material,
        ofertada,
        reservado,
        en_obra,
        pendiente_entrega,
        pendiente_compra,
        en_bodega: Number(mat.en_bodega ?? 0),
        reservado_total: Number(mat.reservado_total ?? 0),
        disponible_global,
      };
    });
  }, [materials]);

  useEffect(() => {
    setRecords(projectMaterials);
  }, [projectMaterials]);

  useEffect(() => {
    if (projectId) refetch();
  }, [refreshKey, projectId, refetch]);

  function handleFilter(e) {
    const value = e.target.value.toLowerCase();
    setFilterText(value);
    const filtered = projectMaterials.filter((row) =>
      Object.values(row).some((field) => String(field).toLowerCase().includes(value))
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
            disabled={row.disponible_global <= 0 || (row.ofertada - row.reservado - row.en_obra) <= 0}
          >
            Reservar
          </button>
          <button
            className="rounded px-0 py-2 text-xs text-white"
            style={{ backgroundColor: "#046BB1" }}
            onClick={() => alert(`Entregar ${row.material}`)}
            disabled={row.reservado <= 0}
          >
            Entregar
          </button>
        </div>
      ),
    },
  ];

  // --- NUEVA LÓGICA DE RENDERIZADO ---
  if (error) {
    return (
      <div className="p-4 bg-white rounded shadow w-full max-w-7xl mx-auto text-center">
        <p className="text-red-600 font-semibold text-lg">
          Ocurrió un error al cargar los materiales.
        </p>
        <button
          onClick={onBack}
          className="mt-4 text-white rounded px-4 py-2"
          style={{ backgroundColor: "#046BB1" }}
        >
          Volver a proyectos
        </button>
      </div>
    );
  }

  if (!loading && projectMaterials.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow w-full max-w-7xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4" style={{ color: "#046BB1" }}>
          Detalle general de materiales - Proyecto {projectId}
        </h2>
        <p className="text-gray-600 text-lg mb-4">
          Este proyecto no tiene materiales asignados.
        </p>
        <button
          className="text-white rounded"
          style={{ backgroundColor: "#046BB1", padding: "0.5rem 1rem" }}
          onClick={() => onAsignMaterials(projectId)}
        >
          + Asignar materiales
        </button>
        <div className="mt-4">
          <button
            onClick={onBack}
            className="text-white rounded px-4 py-2"
            style={{ backgroundColor: "#046BB1" }}
          >
            Volver a proyectos
          </button>
        </div>
      </div>
    );
  }

  // --- VISTA NORMAL CON TABLA ---
  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold" style={{ color: "#046BB1" }}>
          Detalle general de materiales - Proyecto {projectId}
        </h2>
        <button
          className="text-white rounded"
          style={{ backgroundColor: "#046BB1", padding: "0.4rem 0.8rem", fontSize: "0.9rem" }}
          onClick={() => onAsignMaterials(projectId)}
        >
          + Ofertar materiales
        </button>
      </div>

      <div className="mb-2 flex justify-start items-center gap-1">
        <span className="parrafo">Buscar: </span>
        <input
          type="text"
          onChange={handleFilter}
          className="ml-1 border border-gray-300 rounded-sm px-2 py-1 parrafo"
          placeholder="Buscar material..."
          value={filterText}
        />
      </div>

      <DataTable
        columns={columns}
        data={records}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        noDataComponent="Este proyecto no tiene materiales asignados."
      />

      <div className="mt-4">
        <button
          onClick={onBack}
          className="text-white rounded"
          style={{ backgroundColor: "#046BB1", padding: "0.4rem 0.8rem", fontSize: "0.9rem" }}
        >
          Volver a proyectos
        </button>
      </div>
    </div>
  );
}


