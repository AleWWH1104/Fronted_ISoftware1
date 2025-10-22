import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { SaveOrCancelButtons } from "../Button";
import { getMateriales } from "../../services/inventory";
import { postOfertaProyecto } from "../../services/projects";
import { InputForm } from "../Input";

export default function AsignMaterials({ onClickCancel, onClickSave, project }) {
  const MAX_INT = 2147483647; // límite máximo para INTEGER
  const [materialesOptions, setMaterialesOptions] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [listaMateriales, setLista] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getMateriales();
        setMaterialesOptions(data || []);
      } catch (e) {
        setError(e?.response?.data?.message || "No se pudieron cargar materiales");
      }
    })();
  }, []);

  const handleAdd = () => {
    setError("");
    const idMat = Number(selectedMaterialId);
    const qty = Number(cantidad);

    if (!idMat || !Number.isFinite(qty) || qty <= 0) {
      setError("Selecciona un material y una cantidad válida (> 0).");
      return;
    }

    if (qty > MAX_INT) {
      setError(`*La cantidad excede el límite permitido`);
      return;
    }

    const mat = materialesOptions.find((m) => m.id === idMat);
    if (!mat) {
      setError("Material inválido.");
      return;
    }

    // si ya existe en la lista, sumamos cantidades
    const exists = listaMateriales.find((i) => i.id_material === idMat);
    if (exists) {
      const nuevaCantidad = i.ofertada + qty;
      if (nuevaCantidad > MAX_INT) {
        setError(`La cantidad total para este material supera el límite (${MAX_INT.toLocaleString()}).`);
        return;
      }

      setLista((prev) =>
        prev.map((i) =>
          i.id_material === idMat ? { ...i, ofertada: i.ofertada + qty } : i
        )
      );
    } else {
      setLista((prev) => [
        ...prev,
        {
          id: Date.now(),
          id_material: idMat,
          codigo: mat.codigo,
          nombre: mat.material,
          ofertada: qty,
        },
      ]);
    }

    // limpiar inputs
    setSelectedMaterialId("");
    setCantidad("");
  };

  const handleDelete = (id) => {
    setLista(listaMateriales.filter((item) => item.id !== id));
  };

  const handleSubmit = async () => {
    setError("");

    if (!project?.id) {
      setError("Proyecto no válido.");
      return;
    }

    if (listaMateriales.length === 0) {
      setError("Agrega al menos un material a la lista.");
      return;
    }

    setSubmitting(true);
    try {
      console.log("Datos a enviar:", {
        id_proyecto: project.id,
        materiales: listaMateriales,
      });

      await postOfertaProyecto(
        project.id,
        listaMateriales.map((i) => ({
          id_material: i.id_material,
          ofertada: i.ofertada,
        }))
      );

      onClickSave?.();
    } catch (e) {
      console.error("Error al registrar oferta:", e.response?.data || e.message);
      setError(e?.response?.data?.message || "No se pudo registrar la oferta");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full lg:w-[30%] lg:h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Ofertar materiales</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar la oferta de materiales estimados para el proyecto
        </p>
        {project?.nombre && (
          <p className="text-xs text-gray-500 mt-1">
            Proyecto: <span className="font-medium">{project.nombre}</span>
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div>
            <label className="parrafo font-semibold mb-1 block">Material</label>
            <select
              className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
              value={selectedMaterialId}
              onChange={(e) => setSelectedMaterialId(e.target.value)}
            >
              <option value="">Selecciona un material</option>
              {materialesOptions.map((m) => (
                <option key={m.id} value={String(m.id)}>
                  {m.codigo} — {m.material}
                </option>
              ))}
            </select>
          </div>
          <div>
              <InputForm
            type="number"
            label="Cantidad"
            placeholder="0"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
          {error && <p className="errores mt-2">{error}</p>}
          </div>
          
        </div>

        <button
          onClick={handleAdd}
          className="w-full bg-[#046BB1] flex gap-2 justify-center items-center py-2 px-4 rounded-lg disabled:opacity-60"
          disabled={!selectedMaterialId || Number(cantidad) <= 0}
        >
          <Plus className="text-white" size={15} />
          <p className="parrafo text-white">Añadir material</p>
        </button>

        <div className="border-t border-gray-200 my-6 py-4">
          <h4 className="subtitulo">Materiales ofertados</h4>
          {listaMateriales.length === 0 ? (
            <div className="border border-gray-400 border-dashed flex justify-center items-center py-2 w-full rounded-lg my-4">
              <p className="parrafo">No hay materiales aún</p>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              {listaMateriales.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg"
                >
                  <span className="parrafo">
                    ({item.codigo}) {item.nombre} - {item.ofertada} unidades
                  </span>
                  <button onClick={() => handleDelete(item.id)} title="Quitar">
                    <Trash2 className="text-gray-600" size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <SaveOrCancelButtons
        onClick1={onClickCancel}
        onClick2={handleSubmit}
        disabled2={submitting || listaMateriales.length === 0}
        label2={submitting ? "Guardando..." : "Guardar oferta"}
      />
    </div>
  );
}
