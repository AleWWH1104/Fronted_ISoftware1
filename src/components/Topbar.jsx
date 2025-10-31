import { Bell, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Alert from "./Alert";
import { useAlerts } from "../hooks/useAlerts";
import { useState } from "react";

export default function Topbar() {
  const { user } = useAuth();
  const { alertas, loading } = useAlerts();
  const [showAlertas, setShowAlertas] = useState(false);

  const handleToggleAlertas = () => {
    // Evita abrir el pop-up mientras carga
    if (loading) return;
    setShowAlertas((prev) => !prev);
  };

  const safeAlertas = Array.isArray(alertas) ? alertas : [];

  return (
    <header className="flex h-[70px] items-center justify-end px-[25px] py-[5px] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex-shrink-0">
      <div className="flex items-center gap-4">
        {/* Botón campana */}
        <div className="relative">
          <button
            onClick={handleToggleAlertas}
            className="p-2 rounded-full hover:bg-gray-100 relative"
            style={{ backgroundColor: "#F8F8F8" }}
            disabled={loading}
          >
            <Bell className="h-6 w-6" />
            {!loading && safeAlertas.length > 0 && (
              <span className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-2.5 h-2.5"></span>
            )}
          </button>

          {showAlertas && (
            <Alert alertas={safeAlertas} onClose={() => setShowAlertas(false)} />
          )}
        </div>

        {/* Usuario */}
        <div
          className="flex items-center gap-3 rounded-full px-3 py-1 ml-2"
          style={{ backgroundColor: "#ffff" }}
        >
          <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-600 -ml-1 p-2">
            <User className="h-6 w-6 text-white" />
          </div>

          <div className="hidden md:flex flex-col pr-2">
            <span className="text-sm">{user?.Fullname || "Usuario"}</span>
            <span className="text-xs text-gray-700">{user?.roles || "Rol"}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
