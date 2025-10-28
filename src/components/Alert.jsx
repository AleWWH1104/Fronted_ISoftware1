import React from "react";

export default function Alert({ alertas = [], onClose }) {
  if (alertas.length === 0) {
    return (
      <div className="absolute right-4 top-16 w-80 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
        <p className="text-gray-500 text-sm">No hay alertas de materiales 🎉</p>
      </div>
    );
  }

  return (
    <div className="absolute right-4 top-16 w-96 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="subtitulo">Alertas de Materiales</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-sm font-medium"
        >
          ✕
        </button>
      </div>

      <ul className="space-y-2 max-h-60 overflow-y-auto">
        {alertas.map((a) => (
          <li
            key={a.id}
            className="p-3 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center"
          >
            <div>
              <p className="font-medium text-sm text-gray-800">{a.material}</p>
              <p className="parrafo text-gray-600">
                Código: <span className="font-mono">{a.codigo}</span>
              </p>
              <p className="parrafo text-gray-700">
                Stock actual: <b>{a.cantidad_actual}</b> / Necesario: <b>{a.cantidad_necesaria}</b>
              </p>
            </div>
            <span className="text-red-800 font-semibold text-sm">Bajo stock</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
