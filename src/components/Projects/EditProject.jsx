// src/components/popups/EditProject.jsx
import { SaveOrCancelButtons } from "../Button";
import { InputForm } from "../Input";
import { useEffect, useState } from "react";

/**
 * Espera props:
 * - project: {
 *     id: string|number,
 *     name: string,
 *     serviceType: string,
 *     location: string,
 *     status: string,
 *     budget: number,
 *     client: { id?: string|number, name: string, phone?: string }
 *   }
 * - onClickCancel: () => void
 * - onClickSave: (updatedProject) => void
 */
export default function EditProjectPopUp({ project, onClickCancel, onClickSave }) {
  // Estado del formulario
  const [name, setName] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [budget, setBudget] = useState(0);

  // Cliente: seleccionar existente o crear nuevo
  const [isCreateClient, setCreateClient] = useState(false);
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientId, setClientId] = useState(null); // por si usas id de cliente

  // Precargar datos cuando llegue/ cambie el proyecto
  useEffect(() => {
    if (!project) return;
    setName(project.name ?? "");
    setServiceType(project.serviceType ?? "");
    setLocation(project.location ?? "");
    setStatus(project.status ?? "");
    setBudget(Number(project.budget ?? 0));

    const c = project.client ?? {};
    setClientName(c.name ?? "");
    setClientPhone(c.phone ?? "");
    setClientId(c.id ?? null);

    // Si ya hay cliente con id, asumimos "elegir cliente"; si no, "nuevo cliente"
    setCreateClient(!c.id && !!c.name);
  }, [project]);

  const handleSave = () => {
    const updated = {
      ...project,
      name: name.trim(),
      serviceType: serviceType.trim(),
      location: location.trim(),
      status: status.trim(),
      budget: Number.isFinite(Number(budget)) ? Number(budget) : 0,
      client: isCreateClient
        ? { name: clientName.trim(), phone: clientPhone.trim() }
        : { id: clientId ?? null, name: clientName.trim(), phone: clientPhone.trim() },
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="col-span-2"
          />

          <InputForm
            type="text"
            label="Tipo de servicio"
            placeholder="Elija una opción"
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
            className="col-span-2 row-start-2"
          />

          <InputForm
            type="text"
            label="Ubicación"
            placeholder="Ingrese la ubicación"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="col-span-2 row-start-3"
          />

          <InputForm
            type="text"
            label="Estado"
            placeholder="Solicitado / En progreso / Completado"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
            className="row-start-4"
          />

          <InputForm
            type="number"
            label="Presupuesto"
            placeholder="0"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            className="row-start-4"
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
