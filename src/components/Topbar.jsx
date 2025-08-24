import { Bell, User, SunMedium } from "lucide-react"
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();


  return (
    <header className="flex h-[70px] items-center justify-end px-[25px] py-[5px] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex-shrink-0">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100" style={{ backgroundColor: "#F8F8F8" }}>
          <SunMedium className="h-6 w-6" />
          <span className="sr-only">Toggle theme</span>
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100" style={{ backgroundColor: "#F8F8F8" }}>
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </button>

        <div className="flex items-center gap-3 rounded-full px-3 py-1 ml-2" style={{ backgroundColor: "#ffff" }}>
          <div className="flex h-9.5 w-9.5 items-center justify-center rounded-full bg-gray-600 -ml-1 p-2">
            <User className="h-6 w-6, text-white" />
          </div>

          {/* Mostrar solo en pantallas medianas o más grandes */}
          <div className="hidden md:flex flex-col pr-2">
            <span className="text-sm">Gerardo Bran</span>
            {/* <span className="text-sm">{user?.Fullname}</span> */}
            <span className="text-xs text-gray-700">Rol</span>
          </div>
        </div>
      </div>
    </header>
  )
}
