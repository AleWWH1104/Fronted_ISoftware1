// components/Projects/MaterialsByProject.js

import React, { useState, useEffect } from "react";

export default function MaterialsByProjectView({ projectId, onBack }) {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      const data = [
        { codigo: "01123", material: "Lámpara Globrite blanca", ofertado: 10, reservado: 10, pendienteCompra: 10, enObra: 10, pendienteEntrega: 10 },
        { codigo: "01123", material: "Lámpara Globrite blanca", ofertado: 1, reservado: 1, pendienteCompra: 1, enObra: 1, pendienteEntrega: 1 },
        { codigo: "01123", material: "Lámpara Globrite blanca", ofertado: 4, reservado: 4, pendienteCompra: 4, enObra: 4, pendienteEntrega: 4 },
        { codigo: "01123", material: "Lámpara Globrite blanca", ofertado: 9, reservado: 9, pendienteCompra: 9, enObra: 9, pendienteEntrega: 9 },
        { codigo: "01123", material: "Lámpara Globrite blanca", ofertado: 7, reservado: 7, pendienteCompra: 7, enObra: 7, pendienteEntrega: 7 },
      ];

      setMaterials(data);
    };

    fetchMaterials();
  }, [projectId]);

  return (
    <div className="p-4 bg-white rounded shadow w-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold" style={{ color: "#046BB1" }}>
          Detalle general de materiales - Proyecto {projectId}
        </h2>
        <button
          className="text-white rounded"
          style={{ backgroundColor: "#046BB1", padding: "0.25rem 0.5rem", fontSize: "0.8rem" }}
          onClick={() => alert("Funcionalidad Asignar materiales aquí")}
        >
          + Asignar materiales
        </button>
      </div>

      <input
        type="search"
        placeholder="Buscar..."
        className="mb-3 border rounded p-1 max-w-[150px]"
        style={{ fontSize: "0.85rem" }}
      />

      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border border-gray-300 p-2">Codigo</th>
            <th className="border border-gray-300 p-2">Material</th>
            <th className="border border-gray-300 p-2">Ofertado</th>
            <th className="border border-gray-300 p-2">Reservado</th>
            <th className="border border-gray-300 p-2">Pendiente de compra</th>
            <th className="border border-gray-300 p-2">En obra</th>
            <th className="border border-gray-300 p-2">Pendiente de entrega</th>
            <th className="border border-gray-300 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((mat, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border border-gray-300 p-2">{mat.codigo}</td>
              <td className="border border-gray-300 p-2">{mat.material}</td>
              <td className="border border-gray-300 p-2">{mat.ofertado}</td>
              <td className="border border-gray-300 p-2">{mat.reservado}</td>
              <td className="border border-gray-300 p-2">{mat.pendienteCompra}</td>
              <td className="border border-gray-300 p-2">{mat.enObra}</td>
              <td className="border border-gray-300 p-2">{mat.pendienteEntrega}</td>
              <td className="border border-gray-300 p-2 flex gap-2">
                <button
                  className="rounded"
                  style={{
                    border: "1px solid #046BB1",
                    color: "#046BB1",
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.4rem"
                  }}
                >
                  Reservar
                </button>
                <button
                  className="rounded text-white"
                  style={{
                    backgroundColor: "#046BB1",
                    fontSize: "0.7rem",
                    padding: "0.2rem 0.4rem"
                  }}
                >
                  Entregar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <button
          onClick={onBack}
          className="text-white rounded"
          style={{ backgroundColor: "#046BB1", padding: "0.25rem 0.5rem", fontSize: "0.85rem" }}
        >
          Volver a proyectos
        </button>
      </div>
    </div>
  );
}
