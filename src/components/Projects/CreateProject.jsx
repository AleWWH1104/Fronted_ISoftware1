import { SaveOrCancelButtons } from "../Button"
import { useForm } from "react-hook-form";
import { InputForm } from "../Input"
import { useEffect, useState } from "react";
import { crearProyecto } from "../../services/projects";
import { getClients, createClient } from "../../services/clients";

export default function CreateProjectPopup({ onClickCancel, onClickSave }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isCreateClient, setCreateClient] = useState(false);

  // clientes
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState("");

  // crear cliente inline
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      tipo_servicio: "Piscina Regular",
      ubicacion: "",
      estado: "Solicitado",
      presupuesto: "",
    },
  });

  const ESTADO_VALUES = ["Solicitado", "En Progreso"];
  const TIPO_VALUES = [
    "Piscina Regular",
    "Piscina Irregular",
    "Remodelacion",
    "Jacuzzi",
    "Paneles Solares",
    "Fuentes y Cascadas",
  ];

  const hoy = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    let mounted = true;
    setClientsLoading(true);
    getClients()
      .then((data) => {
        if (!mounted) return;
        setClients(Array.isArray(data) ? data : []);
      })
      .catch(() => setClientsError("No se pudieron cargar los clientes."))
      .finally(() => setClientsLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const pickId = (obj) => obj?.cliente?.id;

  const handleCreateClient = async () => {
    const cleanedPhone = newClientPhone.trim().replace(/-/g, "");
    if (!newClientName.trim() || !newClientPhone.trim()) {
      setError("El nombre y teléfono del cliente son requeridos.");
      return;
    }
    if (!/^\d{8}$/.test(cleanedPhone)) {
      setError("El número de teléfono debe tener exactamente 8 dígitos.");
      return;
    }

    setError("");
    try {
      const payload = { nombre: newClientName.trim(), telefono: cleanedPhone };
      const created = await createClient(payload);
      const newId = pickId(created);
      if (!Number.isInteger(Number(newId))) {
        setError("No se pudo obtener el ID del cliente creado.");
        return;
      }
      const refreshed = await getClients().catch(() => []);
      setClients(Array.isArray(refreshed) ? refreshed : []);
      setSelectedClientId(String(newId));
      setNewClientName("");
      setNewClientPhone("");
      setCreateClient(false);
    } catch (e) {
      console.error(e);
      setError("No se pudo crear el cliente. Intenta de nuevo.");
    }
  };

  const onSubmit = async (form) => {
    setSubmitting(true);
    setError("");

    try {
      // validar cliente
      if (!selectedClientId) {
        setError("Debes seleccionar un cliente.");
        setSubmitting(false);
        return;
      }

      // validar presupuesto
      const presupuestoNum = Number(form.presupuesto);
      if (isNaN(presupuestoNum) || presupuestoNum < 0) {
        setError("El presupuesto debe ser un número mayor o igual a 0.");
        setSubmitting(false);
        return;
      }

      // 🔹 Validación límite presupuesto
      const MAX_PRESUPUESTO = 9999999.99;
      if (presupuestoNum > MAX_PRESUPUESTO) {
        setError(`El presupuesto no puede exceder Q${MAX_PRESUPUESTO.toLocaleString("es-GT")}.`);
        setSubmitting(false);
        return;
      }

      // validar máximo 2 decimales
      const twoDecimals = /^\d+(\.\d{1,2})?$/;
      if (!twoDecimals.test(form.presupuesto)) {
        setError("El presupuesto solo puede tener hasta 2 decimales.");
        setSubmitting(false);
        return;
      }

      const payload = {
        nombre: form.nombre.trim(),
        estado: form.estado,
        presupuesto: parseFloat(presupuestoNum.toFixed(2)),
        cliente_id: Number(selectedClientId),
        fecha_inicio: hoy,
        fecha_fin: null,
        ubicacion: form.ubicacion.trim(),
        tipo_servicio: form.tipo_servicio,
      };

      console.log("➡️ Payload proyecto:", payload);
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
    <div className="bg-white rounded-lg shadow-lg w-full lg:w-[30%] lg:h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Crear nuevo proyecto</h2>
        <p className="text-[#709DBB] text-sm">
          Registrar un nuevo proyecto de Pool Center
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
            <div className="col-span-2">
              <label className="parrafo font-semibold mb-1">Nombre del proyecto</label>
              <input
                type="text"
                placeholder="Ingrese el nombre del proyecto"
                {...register("nombre", { required: "El nombre es requerido" })}
                className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
              />
              {errors.nombre && <p className="errores">{errors.nombre.message}</p>}
            </div>

            <div>
              <label className="parrafo font-semibold mb-1">Tipo de servicio</label>
              <select
                className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
                {...register("tipo_servicio", { required: true })}
              >
                {TIPO_VALUES.map((tipo) => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="parrafo font-semibold mb-1">Estado</label>
              <select
                className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
                {...register("estado", { required: true })}
              >
                {ESTADO_VALUES.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
              <label className="parrafo font-semibold mb-1">Ubicación</label>
              <input
                type="text"
                placeholder="Ingrese la ubicación"
                {...register("ubicacion", { required: "La ubicación es requerida" })}
                className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
              />
              {errors.ubicacion && <p className="errores">{errors.ubicacion.message}</p>}
            </div>

            <div className="col-span-2">
              <label className="parrafo font-semibold mb-1">Presupuesto</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                {...register("presupuesto", {
                  required: "El presupuesto es requerido",
                  min: { value: 0, message: "Debe ser mayor o igual a 0" },
                  max: {
                    value: 9999999.99,
                    message: "El presupuesto no puede exceder Q9,999,999.99",
                  },
                  validate: (v) =>
                    /^\d+(\.\d{1,2})?$/.test(v) || "Máximo 2 decimales permitidos",
                })}
                className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
              />
              {errors.presupuesto && (
                <p className="errores">{errors.presupuesto.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 items-center my-4 border-t border-gray-200 pt-3">
            <span className="bg-[#DBE6EE] px-1.5 py-0.5 rounded-full text-xs">2</span>
            <p className="text-sm">Información del cliente</p>
          </div>

          {!isCreateClient ? (
            <div>
              <select
                className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
                required
              >
                <option value="">Selecciona un cliente</option>
                {clients.map((c) => (
                  <option key={c.id} value={String(c.id)}>
                    {c.nombre}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="parrafo bg-gray-100 rounded-lg px-2 mt-1"
                onClick={() => setCreateClient(true)}
              >
                + Nuevo cliente
              </button>
            </div>
          ) : (
            <div>
              {error && <p className="errores">{error}</p>}
              <div className="flex flex-col gap-3">
                <InputForm
                  type="text"
                  label="Nombre del cliente"
                  placeholder="Ingrese el nombre del cliente"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  required
                />
                <InputForm
                  type="text"
                  label="Teléfono"
                  placeholder="Ingrese el número telefónico"
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  required
                />
                <div className="flex justify-between items-center gap-3">
                  <button
                    type="button"
                    className="w-1/4 parrafo bg-gray-100 rounded-lg px-2 py-1"
                    onClick={() => setCreateClient(false)}
                  >
                    ← Volver
                  </button>
                  <button
                    type="button"
                    className="w-3/4 parrafo bg-[#DBE6EE] rounded-lg px-2 py-1"
                    onClick={handleCreateClient}
                  >
                    Guardar cliente
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {error && <p className="errores mt-2">{error}</p>}

      <SaveOrCancelButtons
        onClick1={onClickCancel}
        onClick2={handleSubmit(onSubmit)}
        disabled2={submitting}
      />
    </div>
  );
}
