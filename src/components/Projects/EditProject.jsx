// src/components/Projects/EditProject.jsx
import { SaveOrCancelButtons } from "../Button";
import { InputForm } from "../Input";
import { useEffect, useState } from "react";
import useClients from "../../hooks/useClients";

export default function EditProjectPopUp({ project, onClickCancel, onClickSave }) {
  const ESTADO_VALUES = ['Solicitado', 'En Progreso', 'Finalizado', 'Cancelado'];
  const TIPO_VALUES   = ['Piscina Regular', 'Piscina Irregular', 'Remodelacion', 'Jacuzzi', 'Paneles Solares', 'Fuentes y Cascadas'];
  const makeOpts = (arr) => arr.map(v => ({ value: v, label: v }));
  const ESTADO_OPTS = makeOpts(ESTADO_VALUES);
  const TIPO_OPTS   = makeOpts(TIPO_VALUES);

  // Form proyecto
  const [nombre, setNombre] = useState("");
  const [tipoServicio, setTipoServicio] = useState(TIPO_VALUES[0]);
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState(ESTADO_VALUES[0]);
  const [presupuesto, setPresupuesto] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Clientes (igual que Create)
  const {
    clients, clientsLoading, clientsError,
    selectedClientId, setSelectedClientId,
    isCreateClient, setCreateClient,
    newClientName, setNewClientName,
    newClientPhone, setNewClientPhone,
    error, setError,
    handleCreateClient,
  } = useClients();

  // Precargar datos del proyecto
  useEffect(() => {
    if (!project) return;
    setNombre(project.nombre ?? "");
    setTipoServicio(project.tipo_servicio ?? TIPO_VALUES[0]);
    setUbicacion(project.ubicacion ?? "");
    setEstado(project.estado ?? ESTADO_VALUES[0]);
    setPresupuesto(Number(project.presupuesto ?? 0));

    // cliente actual (acepta cliente_id o client.id según venga)
    const currentClientId = project?.cliente_id ?? project?.client?.id ?? null;
    setSelectedClientId(currentClientId != null ? String(currentClientId) : "");
    setCreateClient(false);
    setError("");
  }, [project]);

  const handleSave = () => {
  setSubmitting(true);
  setError("");

  if (!selectedClientId) {
    setError("Debes seleccionar un cliente.");
    setSubmitting(false);
    return;
  }
  if (!Number.isInteger(Number(selectedClientId))) {
    setError("El cliente seleccionado no es válido. Intenta seleccionarlo de nuevo.");
    setSubmitting(false);
    return;
  }

  // 🔹 Validación de presupuesto
  const presupuestoNum = Number(presupuesto);
  if (isNaN(presupuestoNum) || presupuestoNum < 0) {
    setError("El presupuesto debe ser mayor o igual a 0.");
    setSubmitting(false);
    return;
  }
  if (presupuestoNum > 9999999.99) {
    setError("El presupuesto no puede exceder Q9,999,999.99.");
    setSubmitting(false);
    return;
  }
  // Validar máximo 2 decimales
  if (!/^\d+(\.\d{1,2})?$/.test(presupuesto)) {
    setError("El presupuesto solo puede tener hasta 2 decimales.");
    setSubmitting(false);
    return;
  }


  // validar máximo 2 decimales
  const twoDecimals = /^\d+(\.\d{1,2})?$/;
  if (!twoDecimals.test(presupuesto)) {
    setError("El presupuesto solo puede tener hasta 2 decimales.");
    setSubmitting(false);
    return;
  }

  const updated = {
    id: project?.id ?? null,
    nombre: nombre.trim(),
    tipo_servicio: tipoServicio,
    ubicacion: ubicacion.trim(),
    estado,
    presupuesto: parseFloat(presupuestoNum.toFixed(2)),
    cliente_id: Number(selectedClientId),
  };

  onClickSave?.(updated);
  setSubmitting(false);
};


  return (
    <div className="bg-white rounded-lg shadow-lg w-full lg:w-[30%] lg:h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Editar proyecto</h2>
        <p className="text-[#709DBB] text-sm">Actualiza la información del proyecto de Pool Center</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Sección 1: Proyecto */}
        <div className="flex gap-2 items-center my-3">
          <span className="bg-[#DBE6EE] px-1.5 py-0.5 rounded-full text-xs">1</span>
          <p className="text-sm">Información del proyecto</p>
        </div>

        <div id="inputs" className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-4 gap-3">
          <InputForm
            type="text"
            label="Nombre del proyecto"
            placeholder="Ingrese el nombre del proyecto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="col-span-2"
          />
          <div className="col-span-2 md:row-start-2">
            <label className="parrafo font-semibold mb-1">Tipo de servicio</label>
            <select
              className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
              value={tipoServicio}
              onChange={(e) => setTipoServicio(e.target.value)}
              required
            >
              {TIPO_OPTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <InputForm
            type="text"
            label="Ubicación"
            placeholder="Ingrese la ubicación"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            required
            className="col-span-2 md:row-start-3"
          />
          <div className="md:row-start-4 col-span-2 sm:col-span-1">
            <label className="parrafo font-semibold mb-1">Estado</label>
            <select
              className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              required
            >
              {ESTADO_OPTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
          <InputForm
            type="number"
            label="Presupuesto"
            placeholder="0"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            required
            className="row-start-5 col-span-2 sm:col-span-1 md:row-start-4"
          />
          {error && error.includes("presupuesto") && (
            <p className="errores mt-1 col-span-2">{error}</p>
          )}
        </div>

        {/* Sección 2: Cliente */}
        <div className="flex gap-2 items-center my-4 border-t border-gray-200 pt-3">
          <span className="bg-[#DBE6EE] px-1.5 py-0.5 rounded-full text-xs">2</span>
          <p className="text-sm">Información del cliente</p>
        </div>

        {(clientsError) && <p className="errores mb-2">{clientsError}</p>}

        {!isCreateClient ? (
          <div className="flex flex-col gap-3">
            <label className="parrafo font-semibold">Cliente</label>
            <select
              className="w-full parrafo bg-white p-2 rounded-lg border border-gray-400"
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              required
              disabled={clientsLoading}
            >
              <option value="">{clientsLoading ? "Cargando clientes..." : "Selecciona un cliente"}</option>
              {clients.map(c => (
                <option key={c.id} value={String(c.id)}>{c.nombre}</option>
              ))}
            </select>
            <button
              type="button"
              className="parrafo bg-gray-100 rounded-lg px-2 py-1 w-fit"
              onClick={() => setCreateClient(true)}
            >
              + Nuevo cliente
            </button>
          </div>
        ) : (
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
                onClick={() => { setCreateClient(false); setError(""); }}
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
        )}
      </div>

      <SaveOrCancelButtons
        onClick1={onClickCancel}
        onClick2={handleSave}
        disabled2={submitting || clientsLoading}
      />
    </div>
  );
}
