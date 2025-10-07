// src/components/popups/EditProject.jsx
import { SaveOrCancelButtons } from "../Button";
import { InputForm } from "../Input";
import { useEffect, useState } from "react";

export default function EditProjectPopUp({ project, onClickCancel, onClickSave }) {
  // 1) Enum del backend (exactamente iguales)
  const ESTADO_VALUES = ['Solicitado', 'En Progreso', 'Finalizado', 'Cancelado'];
  const TIPO_VALUES = ['Piscina Regular', 'Piscina Irregular', 'Remodelacion', 'Jacuzzi', 'Paneles Solares', 'Fuentes y Cascadas'];

  // 2) Helper para armar {value,label} con el mismo texto
  const makeOpts = (arr) => arr.map(v => ({ value: v, label: v }));

  const ESTADO_OPTS = makeOpts(ESTADO_VALUES);
  const TIPO_OPTS   = makeOpts(TIPO_VALUES);

  // Estado del formulario
  const [nombre, setNombre] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [estado, setEstado] = useState("");
  const [presupuesto, setPresupuesto] = useState(0);

  // Cliente: seleccionar existente o crear nuevo
  const [isCreateClient, setCreateClient] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientId, setClientId] = useState(null); // por si usas id de cliente

  // Precargar datos cuando llegue/ cambie el proyecto
  useEffect(() => {
    if (!project) return;
    setNombre(project.nombre ?? "");
    setTipoServicio(project.tipo_servicio ?? "");
    setUbicacion(project.ubicacion ?? "");
    setEstado(project.estado ?? "");
    setPresupuesto(Number(project.presupuesto ?? 0));

    const c = project.client ?? {};
    setClientName(c.name ?? "");
    setClientPhone(c.phone ?? "");
    setClientId(c.id ?? null);

    // Si ya hay cliente con id, asumimos "elegir cliente"; si no, "nuevo cliente"
    setCreateClient(!c.id && !!c.name);
  }, [project]);

  const handleSave = () => {
    const updated = {
      id: project?.id ?? null,
      nombre: nombre.trim(),
      tipo_servicio: tipoServicio,
      ubicacion: ubicacion.trim(),
      estado,
      presupuesto: Number(presupuesto),
      fecha_inicio: project?.fecha_inicio ?? null,
      cliente_id: project?.cliente_id ?? null,
    };
    onClickSave?.(updated);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-[30%] h-[95%] mx-[25px] p-6 flex flex-col">
      <div id="encabezado" className="border-b border-gray-200 pb-4">
        <h2 className="titulo2">Editar proyecto</h2>
        <p className="text-[#709DBB] text-sm">
          Actualiza la información del proyecto de Pool Center
        </p>
      </div>

      <div className="flex-1">
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

          <div className="md:row-start-4">
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
            className="md:row-start-4"
          />
        </div>

        <div className="flex gap-2 items-center my-4 border-t border-gray-200 pt-3">
          <span className="bg-[#DBE6EE] px-1.5 py-0.5 rounded-full text-xs">2</span>
          <p className="text-sm">Información del cliente</p>
        </div>

        {!isCreateClient ? (
          <div className="flex flex-col gap-3">
            <InputForm
              type="text"
              label="Nombre del cliente"
              placeholder="Elija un cliente"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />

            {/* Si manejas un selector real de clientes, aquí podrías abrir un modal/lista */}
            <button
              type="button"
              className="parrafo bg-gray-100 rounded-lg px-2 py-1 w-fit"
              onClick={() => {
                // Al cambiar a "nuevo cliente", limpiamos id
                setClientId(null);
                setCreateClient(true);
              }}
            >
              + Nuevo cliente
            </button>
          </div>
        ) : (
          <div>
            <div className="flex flex-col gap-3">
              <InputForm
                type="text"
                label="Nombre del cliente"
                placeholder="Ingrese el nombre del cliente"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
              <InputForm
                type="text"
                label="Teléfono"
                placeholder="Ingrese el número telefónico"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                required
              />
            </div>

            <button
              type="button"
              className="parrafo bg-gray-100 rounded-lg px-2 py-1 w-fit my-3"
              onClick={() => setCreateClient(false)}
            >
              ← Volver a elegir cliente
            </button>
          </div>
        )}
      </div>

      <SaveOrCancelButtons onClick1={onClickCancel} onClick2={handleSave} />
    </div>
  );
}
