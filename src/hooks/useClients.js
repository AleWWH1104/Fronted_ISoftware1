import { useEffect, useState } from "react";
import { getClients, createClient } from "../services/clients";

// Si tu createClient devuelve { cliente: { id, ... } } usa esta:
const pickId = (obj) => obj?.cliente?.id ?? obj?.id ?? null;

export default function useClients() {
  const [clients, setClients] = useState([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsError, setClientsError] = useState(null);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [isCreateClient, setCreateClient] = useState(false);
  const [newClientName, setNewClientName] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [error, setError] = useState("");

  // Cargar lista
  const reload = async () => {
    setClientsLoading(true);
    setClientsError(null);
    try {
      const data = await getClients();
      setClients(Array.isArray(data) ? data : []);
    } catch {
      setClientsError("No se pudieron cargar los clientes.");
    } finally {
      setClientsLoading(false);
    }
  };

  useEffect(() => { reload(); }, []);

  // Crear cliente inline
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
      const created = await createClient({ nombre: newClientName.trim(), telefono: cleanedPhone });
      const newId = pickId(created);
      if (!Number.isInteger(Number(newId))) {
        setError("No se pudo obtener el ID del cliente creado.");
        return;
      }
      await reload();
      setSelectedClientId(String(newId));
      setNewClientName("");
      setNewClientPhone("");
      setCreateClient(false);
    } catch (e) {
      console.error(e);
      setError("No se pudo crear el cliente. Intenta de nuevo.");
    }
  };

  return {
    // state
    clients, clientsLoading, clientsError,
    selectedClientId, setSelectedClientId,
    isCreateClient, setCreateClient,
    newClientName, setNewClientName,
    newClientPhone, setNewClientPhone,
    error, setError,
    // actions
    reload, handleCreateClient,
  };
}
