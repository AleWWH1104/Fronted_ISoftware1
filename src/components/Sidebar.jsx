import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Home, Package, FolderOpen, FileText, Plus, PlusCircle, LogOut, Menu } from "lucide-react"

const generalItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Inventario", url: "/inventario", icon: Package },
  { title: "Proyectos", url: "/proyectos", icon: FolderOpen },
  { title: "Reportes", url: "/reportes", icon: FileText },
]

const gestionItems = [
  { title: "Nuevo proyecto", url: "/nuevo-proyecto", icon: PlusCircle },
  { title: "Agregar materiales", url: "/agregar-materiales", icon: Plus },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Función para cerrar sidebar en móvil al hacer click en link
  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false)
  }

  return (
    <>
      {/* Botón hamburguesa - solo visible en móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col w-64
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
          z-40
        `}
      >
        {/* Logo */}
        <div className="p-6 flex justify-center border-b border-gray-200">
          <img src="/logo.png" alt="PoolCenter" width={140} height={60} className="object-contain" />
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 overflow-y-auto">
          {/* General Section */}
          <div className="mb-8">
            <h3 style={{ color: '#046BB1' }} className="font-medium text-sm mb-4 px-2">General</h3>

            <nav className="space-y-1">
              {generalItems.map(({ title, url, icon: Icon }) => {
                const isActive = location.pathname === url
                return (
                  <Link
                    key={title}
                    to={url}
                    onClick={handleLinkClick}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Gestión Section */}
          <div className="mb-8">
           <h3 style={{ color: '#046BB1' }} className="font-medium text-sm mb-4 px-2">Gestión</h3>
            <nav className="space-y-1">
              {gestionItems.map(({ title, url, icon: Icon }) => (
                <Link
                  key={title}
                  to={url}
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Cerrar Sesión */}
        <div className="p-4 border-t border-gray-200">
          <a
            href="/logout"
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </aside>

      {/* Fondo oscuro para móvil cuando sidebar abierto */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        />
      )}
    </>
  )
}
