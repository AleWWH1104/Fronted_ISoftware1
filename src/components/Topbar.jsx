import React from "react"
import { Bell, User } from "lucide-react"
import { useAuth } from "../context/AuthContext";

export default function Topbar() {
  const { user } = useAuth();


  return (
    <header className="flex h-[60px] items-center justify-end px-[25px] py-[5px] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] flex-shrink-0">
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-lg bg-[#D1EBFB] px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 ">
            <User className="h-5 w-5" />
          </div>

          {/* Mostrar solo en pantallas medianas o más grandes */}
          <div className="hidden md:flex flex-col py-1">
            <span className="text-sm">{user?.Fullname}</span>
            <span className="text-xs text-gray-700">Rol</span>
          </div>
        </div>
      </div>
    </header>
  )
}
