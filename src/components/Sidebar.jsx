import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, Package, FolderOpen, FileChartColumn, PlusCircle, LogOut, Menu } from "lucide-react"
import { useAuth } from '../context/AuthContext'

const generalItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Inventario", url: "/inventory", icon: Package },
  { title: "Proyectos", url: "/projects", icon: FolderOpen },
  { title: "Reportes", url: "/reports", icon: FileChartColumn },
]

const gestionItems = [
  { title: "Nuevo proyecto", url: "/nuevo-proyecto", icon: PlusCircle },
  { title: "Agregar materiales", url: "/agregar-materiales", icon: PlusCircle },
]

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false)
  }


  const getLinkClasses = (isActive) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
      isActive
        ? "bg-[#DDF0FC] text-[#046BB1] font-medium"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`
  
  const { logout} = useAuth();
  const handleLogout = async () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      await logout();
    }
  };

  return (
    <>
      {/* Botón hamburguesa - solo visible en móviles */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-[10px] left-4 z-50 p-2"
        aria-label="Toggle menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-white border-r border-gray-200 flex flex-col w-[240px]
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex
          z-40
        `}
      >
        {/* Logo */}
        <div className="py-3 flex justify-center mb-8">
          <img src="/logo.png" alt="PoolCenter" width={160} height={60} className="object-contain" />
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 overflow-y-auto">
          {/* General Section */}
          <div className="mb-8">
            <h3 style={{ color: '#046BB1' }} className="parrafo mb-2 px-2">GENERAL</h3>
            <nav className="space-y-1">
              {generalItems.map(({ title, url, icon: Icon }) => {
                const isActive = location.pathname === url
                return (
                  <Link
                    key={title}
                    to={url}
                    onClick={handleLinkClick}
                    className={getLinkClasses(isActive)}
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
            <h3 className="parrafo text-[#046BB1] mb-2">GESTIÓN</h3>
            <nav className="space-y-1">
              {gestionItems.map(({ title, url, icon: Icon }) => {
                const isActive = location.pathname === url
                return (
                  <Link
                    key={title}
                    to={url}
                    onClick={handleLinkClick}
                    className={getLinkClasses(isActive)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{title}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Cerrar Sesión */}
        <div className=" border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Fondo oscuro para móvil cuando sidebar abierto */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}
    </>
  )
}
