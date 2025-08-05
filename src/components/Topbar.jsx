import React from "react"
import { Bell, User } from "lucide-react"

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-end px-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Bell className="h-6 w-6" />
          <span className="sr-only">Notifications</span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3 rounded-full bg-[#D1EBFB] px-4 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-400 text-white">
            <User className="h-5 w-5" />
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-medium text-gray-800">Nombre Apellido</span>
            <span className="text-gray-600">Rol</span>
          </div>
        </div>
      </div>
    </header>
  )
}
