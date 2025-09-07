import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { InputForm } from "../Input";
import { SaveOrCancelButtons } from "../Button";
import { crearMaterial, movimientoMaterial } from "../../services/inventory";

export default function AddMaterials({onClickCancel, onClickSave}) {
  const [material, setMaterial] = useState("");
  const [codigo, setCodigo] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [listaMateriales, setLista] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = () => {
    if (!material || !codigo || cantidad <= 0) return;

    const nuevo = { id: Date.now(), material, codigo, cantidad };
    setLista([...listaMateriales, nuevo]);

    // limpiar inputs
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
      // 1) preparar payload que backend espera: { materiales: [ {codigo, material}, ... ] }
      const payload = {
        materiales: listaMateriales.map(({ codigo, material }) => ({ codigo, material })),
      };

      // 2) crear materiales
      const res = await crearMaterial(payload); 

      const materialesCreados = res.materiales ?? [];
      if (!Array.isArray(materialesCreados) || materialesCreados.length === 0) {
        throw new Error("No se recibieron materiales creados desde el backend");
      }

      // 3) construir un mapa codigo -> cantidad para emparejar
      const cantidadesByCodigo = new Map(
        listaMateriales.map(({ codigo, cantidad }) => [codigo, Number(cantidad)])
      );
      
      // 4) insertar movimientos de bodega uno por uno (tipo 'entrada', fecha hoy, obs null)
      for (const mat of materialesCreados) {
        const cant = cantidadesByCodigo.get(mat.codigo) ?? 0;
        await movimientoMaterial({
          material_id: mat.id,
          tipo: "entrada",
          cantidad: cant,
          fecha: new Date().toISOString(), // YYYY-MM-DD
          observaciones: null,
        });
      }

      console.log("listo: materiales creados y registrados en bodega");
      setLista([]);

      //Refrescar inventario
      // if (onUpdateInventory) {
      //   await onUpdateInventory(); // Usar await si es necesario
      // }

      //Cerrar popup
      onClickSave();
    } catch (err) {
      console.error("Error al crear materiales:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[30%] h-[95%] mx-[25px] p-6">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Agregar materiales</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar la entrada de nuevos materiales al inventario
        </p>
      </div>

      {/* Inputs */}
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
          onChange={(e) => setCodigo(e.target.value)}
          required
        />
        <InputForm
          type="number"
          label="Cantidad"
          placeholder="0"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          required
        />
      </div>

      {/* Botón añadir */}
      <button
        onClick={handleAdd}
        className="w-full bg-[#046BB1] flex gap-2 justify-center items-center py-2 px-4 rounded-lg"
      >
        <Plus className="text-white" size={15} />
        <p className="parrafo text-white">Añadir material</p>
      </button>

      {/* Lista de materiales */}
      <div className="border-t border-gray-200 my-6 py-4 flex flex-col h-120">
        <h4 className="subtitulo">Materiales agregados</h4>
        {listaMateriales.length === 0 && (
            <div className="border border-gray-400 border-dashed flex justify-center items-center py-2 w-full rounded-lg my-4">
                <p className="parrafo">No hay materiales aún</p>
            </div>
        )}
        <div className="flex-1 overflow-y-auto mt-4 space-y-2">
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
        <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSubmit}/>
      </div>
    </div>
  );
}
