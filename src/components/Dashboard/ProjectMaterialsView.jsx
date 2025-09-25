import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

export default function ProjectMaterialsView({ data }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(Array.isArray(data) ? data : []);
  }, [data]);

  const columns = [
    { name: "Proyecto", selector: (row) => row.proyecto, sortable: true },
    { name: "Código", selector: (row) => row.codigo, sortable: true },
    { name: "Material", selector: (row) => row.material, sortable: true },
    { name: "Ofertado", selector: (row) => row.ofertado, sortable: true, right: true },
    { name: "En obra", selector: (row) => row.en_obra, sortable: true, right: true },
    { name: "Pendiente de compra", selector: (row) => row.pendiente_compra, sortable: true, right: true },
    { name: "Pendiente de entrega a obra", selector: (row) => row.pendiente_entrega, sortable: true, right: true },
  ];

  function handleFilter(event) {
    const value = event.target.value.toLowerCase();
    const newData = data.filter((row) =>
      Object.values(row).some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
    setRecords(newData);
  }

  const customStyles = {
    rows: {
      style: { minHeight: "40px" },
    },
    headCells: {
      style: { fontWeight: "bold", fontSize: "12px" },
    },
  };

  return (
    <section className="bg-white p-4 rounded-lg pb-0 shadow-xs">
      <h2 className="subtitulo">Detalle de materiales en proyectos activos</h2>
      <div className="md:justify-end md:mt-0 mb-2 flex justify-start mt-2 items-center gap-1">
        <span className="parrafo">Buscar: </span>
        <input
          type="text"
          onChange={handleFilter}
          className="ml-1 border border-gray-300 rounded-sm px-2 py-1 parrafo"
        />
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
  );
}

// Mockup temporal para pruebas
ProjectMaterialsView.defaultProps = {
  data: [
    {
      proyecto: 1,
      codigo: "01123",
      material: "Lámpara Globrite blanca",
      ofertado: 10,
      en_obra: 10,
      pendiente_compra: 0,
      pendiente_entrega: 0,
    },
    {
      proyecto: 2,
      codigo: "01124",
      material: "Bomba de agua",
      ofertado: 5,
      en_obra: 3,
      pendiente_compra: 2,
      pendiente_entrega: 1,
    },
  ],
};
