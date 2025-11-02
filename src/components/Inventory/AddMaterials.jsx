import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { InputForm } from "../Input";
import { SaveOrCancelButtons } from "../Button";
import { crearMaterial, postMovimientoMaterial } from "../../services/inventory";

export default function AddMaterials({ onClickCancel, onClickSave }) {
  const MAX_INT = 2147483647;
  const MAX_CODIGO_LENGTH = 10;

  const [material, setMaterial] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [listaMateriales, setLista] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const isFormValid =
    material.trim() !== "" &&
    codigo.trim() !== "" &&
    cantidad !== "" &&
    Number(cantidad) > 0 &&
    Number(cantidad) <= MAX_INT;

  const handleAdd = () => {
    if (!isFormValid) return;

    const nuevo = {
      id: Date.now(),
      material: material.trim(),
      codigo: codigo.trim().toUpperCase(),
      cantidad: Number(cantidad),
    };

    setLista([...listaMateriales, nuevo]);
    setMaterial("");
    setCodigo("");
    setCantidad("");
  };

  const handleDelete = (id) => {
    setLista(listaMateriales.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
    if (listaMateriales.length === 0) return;
    setSubmitting(true);

    try {
      const payload = {
        materiales: listaMateriales.map(({ codigo, material }) => ({
          codigo,
          material,
        })),
      };

      const res = await crearMaterial(payload);
      const materialesCreados = res.materiales ?? [];

      if (!Array.isArray(materialesCreados) || materialesCreados.length === 0) {
        throw new Error("No se recibieron materiales creados desde el backend");
      }

      const cantidadesByCodigo = new Map(
        listaMateriales.map(({ codigo, cantidad }) => [codigo, Number(cantidad)])
      );

      const todayLocal = (() => {
        const d = new Date();
        const y = d.getFullYear();
        const m = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${y}-${m}-${day}`;
      })();

      for (const mat of materialesCreados) {
        const cant = cantidadesByCodigo.get(mat.codigo) ?? 0;
        await postMovimientoMaterial({
          material_id: mat.id,
          tipo: "Entrada",
          cantidad: cant,
          fecha: todayLocal,
          observaciones: null,
        });
      }

      console.log("✅ Materiales creados y registrados en bodega");
      setLista([]);
      onClickSave();
    } catch (err) {
      console.error("Error al crear materiales:", err.response?.data?.message || err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full lg:w-[30%] lg:h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Agregar materiales</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar la entrada de nuevos materiales al inventario
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div
          id="inputs"
          className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 my-6"
        >
          <InputForm
            type="text"
            label="Nombre de material"
            placeholder="Ingrese el nombre del material"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            required
            className="col-span-2"
          />
          <InputForm
            type="text"
            label="Código"
            placeholder="Ingrese el código"
            value={codigo}
            onChange={(e) => {
              let value = e.target.value.toUpperCase();
              if (value.length > MAX_CODIGO_LENGTH) value = value.slice(0, MAX_CODIGO_LENGTH);
              setCodigo(value);
            }}
            required
          />
          <InputForm
            type="number"
            label="Cantidad"
            placeholder="0"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>

        {/* Botón añadir */}
        <button
          onClick={handleAdd}
          className="w-full bg-[#046BB1] flex gap-2 justify-center items-center py-2 px-4 rounded-lg disabled:opacity-60"
          disabled={!isFormValid || submitting}
        >
          <Plus className="text-white" size={15} />
          <p className="parrafo text-white">Añadir material</p>
        </button>

        {/* Lista de materiales */}
        <div className="border-t border-gray-200 my-6 py-4">
          <h4 className="subtitulo">Materiales agregados</h4>
          {listaMateriales.length === 0 && (
            <div className="border border-gray-400 border-dashed flex justify-center items-center py-2 w-full rounded-lg my-4">
              <p className="parrafo">No hay materiales aún</p>
            </div>
          )}
          <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
            {listaMateriales.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
              >
                <span className="parrafo">
                  ({item.codigo}) {item.material} - {item.cantidad} unidades
                </span>
                <button onClick={() => handleDelete(item.id)}>
                  <Trash2 className="text-gray-600" size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSubmit} />
    </div>
  );
}
