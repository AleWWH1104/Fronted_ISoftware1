import React, { useState, useEffect } from "react";
import { InputForm } from "../Input";
import { SaveOrCancelButtons } from "../Button";
import { patchReservarMaterial } from "../../services/projects";
import { useNavigate } from "react-router-dom";


export default function ReserveMaterial({
  onClickCancel,
  projectId,
  materialSelected,
  onReserved,
}) {
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const ofertada = materialSelected?.ofertada ?? 0;
  const reservado = materialSelected?.reservado ?? 0;
  const en_obra = materialSelected?.en_obra ?? 0;
  const disponible_global = materialSelected?.disponible_global ?? 0;

  const maxPorOferta = ofertada - (reservado + en_obra);
  const maxReservable = Math.min(maxPorOferta, disponible_global);

  const handleSubmit = async () => {
    setError("");
    const cant = Number(cantidad);

    if (!cant || cant <= 0) {
      setError("Debe ingresar una cantidad válida mayor a 0.");
      return;
    }

    if (cant > maxReservable) {
      setError(
        `La cantidad supera el máximo permitido (${maxReservable}). Ajuste la cantidad.`
      );
      return;
    }

    try {
      await patchReservarMaterial(projectId, materialSelected.id, cant);
      onReserved();
    } catch (err) {
      console.error("Error al reservar material:", err);
      setError("Ocurrió un error al procesar la reserva.");
    }
  };

  const handleGoToInventory = () => {
    navigate("/inventory");
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[80%] sm:w-[50%] lg:w-[35%] p-6 flex flex-col">
    <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Reservar material</h2>
        <p className="text-[#709DBB] text-sm">
        Reservar materiales disponibles desde bodega
        </p>
    </div>

    {/* Banner si hay inventario insuficiente */}
    {disponible_global < maxPorOferta && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-3 my-4 rounded-md">
        <p className="parrafo">
            ⚠ La cantidad disponible en bodega ({disponible_global}) es menor
            a la cantidad requerida ({maxPorOferta}). Puedes reservar lo
            disponible o{" "}
            <button
            className="text-[#046BB1] underline parrafo"
            onClick={handleGoToInventory}
            >
            reponer inventario
            </button>
            .
        </p>
        </div>
    )}

    <div className="flex-1 overflow-y-auto py-4">
        <div className="parrafo flex flex-col gap-2 mb-8">
        <p>
            Disponible global: <b>{disponible_global}</b>
        </p>
        <p>
            Ofertado total: <b>{ofertada}</b>
        </p>
        <p>
            Ya reservado: <b>{reservado}</b>
        </p>
        <p>
            En obra: <b>{en_obra}</b>
        </p>
        <p className="text-[#046BB1] mt-2">
            Máximo que puedes reservar: <b>{maxReservable}</b>
        </p>
        </div>

        <InputForm
        type="number"
        label="Cantidad a reservar"
        placeholder="0"
        value={cantidad}
        onChange={(e) => setCantidad(e.target.value)}
        required
        />

        {error && <p className="errores mt-2">{error}</p>}
    </div>

    <SaveOrCancelButtons
        onClick1={onClickCancel}
        onClick2={handleSubmit}
    />
    </div>
  );
}
