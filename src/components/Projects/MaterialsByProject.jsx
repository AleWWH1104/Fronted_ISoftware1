// components/Projects/MaterialsByProject.js
import React from "react";
import DataTable from "react-data-table-component";
import { useProjectMaterials } from "../../hooks/useProjects";

export default function MaterialsByProjectView({ projectId, onBack }) {
  // ✅ CORREGIDO: Pasar projectId al hook
  const { materials, loading, error } = useProjectMaterials(projectId);

  // ✅ Simplificamos - ya no necesitamos filtrar porque el hook lo hace
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

  // ... el resto del código permanece igual
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
            className="rounded px-2 py-1 text-xs"
            style={{ border: "1px solid #046BB1", color: "#046BB1" }}
            onClick={() => alert(`Reservar ${row.material}`)}
          >
            Reservar
          </button>
          <button
            className="rounded px-2 py-1 text-xs text-white"
            style={{ backgroundColor: "#046BB1" }}
            onClick={() => alert(`Entregar ${row.material}`)}
          >
            Entregar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold" style={{ color: "#046BB1" }}>
          Detalle general de materiales - Proyecto {projectId}
        </h2>
        <button
          className="text-white rounded"
          style={{
            backgroundColor: "#046BB1",
            padding: "0.4rem 0.8rem",
            fontSize: "0.9rem",
          }}
          onClick={() => alert("Funcionalidad Asignar materiales aquí")}
        >
          + Asignar materiales
        </button>
      </div>

      {error && <p className="text-red-500">❌ Error cargando materiales</p>}

      <DataTable
        columns={columns}
        data={projectMaterials}
        progressPending={loading}
        pagination
        highlightOnHover
        striped
        noDataComponent="No hay materiales disponibles"
      />

      <div className="mt-4">
        <button
          onClick={onBack}
          className="text-white rounded"
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