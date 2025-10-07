import { SaveOrCancelButtons } from "../Button"
import { useForm} from "react-hook-form";
import { InputForm } from "../Input"
import { useEffect, useState } from "react";
import { crearProyecto } from "../../services/projects";

export default function CreateProjectPopup({onClickCancel, onClickSave}) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isCreateClient, setCreateClient] = useState(false);

  const { register, handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
      nombre: "",
      tipo_servicio: "Piscina Regular",
      ubicacion: "",
      estado: "Solicitado",
      presupuesto: "",
    },
  });

  // 1) Enum del backend (exactamente iguales)
  const ESTADO_VALUES = ['Solicitado', 'En Progreso'];
  const TIPO_VALUES = ['Piscina Regular', 'Piscina Irregular', 'Remodelacion', 'Jacuzzi', 'Paneles Solares', 'Fuentes y Cascadas'];

  // 2) Helper para armar {value,label} con el mismo texto
  const makeOpts = (arr) => arr.map(v => ({ value: v, label: v }));

  const ESTADO_OPTS = makeOpts(ESTADO_VALUES);
  const TIPO_OPTS   = makeOpts(TIPO_VALUES);

  const hoy = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'

  const onSubmit = async (form) => {
    setSubmitting(true);
    setError("");

    try {
      const payload = {
        nombre: form.nombre.trim(),
        estado: form.estado,
        presupuesto: Number(form.presupuesto),
        cliente_id: 1,         // temporal
        fecha_inicio: hoy,
        fecha_fin: null,       // siempre null al crear
        ubicacion: form.ubicacion.trim(),
        tipo_servicio: form.tipo_servicio,
      };

      await crearProyecto(payload);
      onClickSave();
    } catch (e) {
      console.error(e);
      setError("No se pudo crear el proyecto. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[30%] h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Crear nuevo proyecto</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar un nuevo proyecto de Pool Center
        </p>
      </div>
      <div className="flex-1">
        <div className="flex gap-2 items-center my-3">
          <span className="bg-[#DBE6EE] px-1.5 py-0.5 rounded-full text-xs">1</span>
          <p className="text-sm">Registrar informacion del proyecto</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 gap-3">
            <div className="col-span-2">
              <label className="parrafo font-semibold mb-1">Nombre del proyecto</label>
              <input
                type="text"
                placeholder="Ingrese el nombre del proyecto"
                {...register("nombre", { required: "El nombre es requerido" })}
                className="w-full parrafo bg-white p-2 rounded-lg  border border-gray-400"
              />
              {errors.nombre && <p className="errores">{errors.nombre.message}</p>}
            </div>
            <div className="col-span-2 md:row-start-2">
              <label className="parrafo font-semibold mb-1">Tipo de servicio</label>
              <select
                className="w-full parrafo bg-white p-2 rounded-lg  border border-gray-400"
                {...register("tipo_servicio", { required: true })}
              >
                {TIPO_OPTS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:row-start-3">
              <label className="parrafo font-semibold mb-1">Ubicación</label>
              <input
                type="text"
                placeholder="Ingrese la ubicación"
                {...register("ubicacion", { required: "La ubicación es requerida" })}
                className="w-full parrafo bg-white p-2 rounded-lg  border border-gray-400"
              />
              {errors.ubicacion && <p className="errores">{errors.ubicacion.message}</p>}
            </div>
            <div className="md:row-start-4">
              <label className="parrafo font-semibold mb-1">Estado</label>
              <select
                className="w-full parrafo bg-white p-2 rounded-lg  border border-gray-400"
                {...register("estado", { required: true })}
              >
                {ESTADO_OPTS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:row-start-4">
              <label className="parrafo font-semibold mb-1">Presupuesto</label>
              <input
                type="number"
                step="0.01"
                placeholder="0"
                {...register("presupuesto", {
                  required: "El presupuesto es requerido",
                  validate: (v) => Number(v) > 0 || "Debe ser mayor a 0",
                })}
                className="w-full parrafo bg-white px-4 py-2 rounded-lg  border border-gray-400"
              />
              {errors.presupuesto && <p className="errores">{errors.presupuesto.message}</p>}
            </div>
          </div>
          <div className="flex gap-2 items-center my-4 border-t border-gray-200 pt-3">
            <span className="bg-[#DBE6EE] px-1.5 py-0.5 rounded-full text-xs">2</span>
            <p className="text-sm">Informacion del cliente</p>
          </div>
          {!isCreateClient ? (
            <div>
              <InputForm
                type="texto"
                label="Nombre del cliente"
                placeholder="Elija un cliente"
                value="1"
                onChange={''}
                required
                className=""
              />
              <button
                type="button"
                className="parrafo bg-gray-100 rounded-lg px-2"
                onClick={() => setCreateClient(true)}
              >
                + Nuevo cliente
              </button>
            </div>
          ) : (
            // div para crear nuevo cliente
            <div>
              <div className="flex flex-col gap-3">
                <InputForm
                  type="texto"
                  label="Nombre del cliente"
                  placeholder="Ingrese el nombre del cliente"
                  value={''}
                  onChange={''}
                  required
                  className=""
                />
                <InputForm
                  type="text"
                  label="Teléfono"
                  placeholder="Ingrese el número telefónico"
                  value={''}
                  onChange={''}
                  required
                  className=""
                />

                
              </div>
              <button
                  type="button"
                  className="parrafo bg-gray-100 rounded-lg px-2 my-3"
                  onClick={() => setCreateClient(false)}
                >
                  ← Volver a elegir cliente
              </button>
            </div>
          )}
        </form>
      </div>

      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSubmit(onSubmit)}/>
    </div>
  )
}
