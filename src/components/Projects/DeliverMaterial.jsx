import { InputForm } from "../Input";
import { SaveOrCancelButtons } from "../Button";
import { patchEntregarMaterial } from "../../services/projects";
import { useState } from "react";

export default function DeliverMaterial({
  onClickCancel,
  projectId,
  materialSelected,
  onDelivered,
}) {
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");

  // Datos base del material
  const reservado = Number(materialSelected?.reservado ?? 0);
  const en_obra = Number(materialSelected?.en_obra ?? 0);
  const ofertada = Number(materialSelected?.ofertada ?? 0);

  // Cálculo del máximo que se puede entregar
  const maxEntregable = Math.min(reservado, ofertada - en_obra);

  const handleSubmit = async () => {
    setError("");
    const cant = Number(cantidad);

    // Validaciones
    if (!cant || cant <= 0) {
      setError("Debe ingresar una cantidad válida mayor a 0.");
      return;
    }

    if (cant > maxEntregable) {
      setError(
        `La cantidad supera el máximo permitido (${maxEntregable}). Ajuste la cantidad.`
      );
      return;
    }

    try {
      await patchEntregarMaterial(projectId, materialSelected.id, cant);
      onDelivered(); // Cierra el popup y refresca la vista
    } catch (err) {
      console.error("Error al entregar material:", err);
      setError("Ocurrió un error al procesar la entrega.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[80%] sm:w-[50%] lg:w-[35%] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Entregar material</h2>
        <p className="text-[#709DBB] text-sm">
          Entregar los materiales reservados a la obra
        </p>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="parrafo flex flex-col gap-2 mb-8">
          <p>
            Cantidad reservada: <b>{reservado}</b>
          </p>
          <p>
            En obra actualmente: <b>{en_obra}</b>
          </p>
          <p>
            Ofertado total: <b>{ofertada}</b>
          </p>
          <p className="text-[#046BB1] mt-2">
            Máximo que puedes entregar: <b>{maxEntregable}</b>
          </p>
        </div>

        <InputForm
          type="number"
          label="Cantidad a entregar"
          placeholder="0"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
          required
        />

        {/* Mensaje de error */}
        {error && <p className="errores mt-2">{error}</p>}
      </div>

      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSubmit} />
    </div>
  );
}
