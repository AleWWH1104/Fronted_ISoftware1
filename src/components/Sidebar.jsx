import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home,
  Package,
  FolderOpen,
  FileChartColumn,
  PlusCircle,
  LogOut,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleLogout = async () => {
    if (window.confirm("¿Estás seguro de que quieres cerrar sesión?")) {
      await logout();
    }
  }

  const handleLinkClick = () => {
    if (isOpen) setIsOpen(false)
  }

  const toggleSubMenu = (menu, e) => {
    e.preventDefault()
    e.stopPropagation()
    setOpenMenu(openMenu === menu ? null : menu)
  }

  const getLinkClasses = (isActive) =>
    `w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-colors ${
      isActive
        ? "bg-[#DDF0FC] text-[#046BB1] font-medium"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    }`

  const getSubLinkClasses = (isActive) =>
    `block pl-10 pr-3 py-2 rounded-md text-sm transition-colors ${
      isActive
        ? "bg-[#E9F6FE] text-[#046BB1] font-medium"
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
    }`

  const generalItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
  ]

  const gestionItems = [
    { title: "Nuevo proyecto", url: "/projects", icon: PlusCircle, state: { openCreate: true } },
    { title: "Agregar materiales", url: "/inventory", icon: PlusCircle, state: { openCreate: true } },
  ]

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
              {/* Dashboard */}
              {generalItems.map(({ title, url, icon: Icon }) => {
                const isActive = location.pathname === url
                return (
                  <Link
                    key={title}
                    to={url}
                    onClick={handleLinkClick}
                    className={getLinkClasses(isActive)}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="h-4 w-4" />
                      <span>{title}</span>
                    </div>
                  </Link>
                )
              })}

              {/* INVENTARIO */}
              <div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/inventory"
                    onClick={handleLinkClick}
                    className={getLinkClasses(location.pathname.startsWith("/inventory"))}
                  >
                    <div className="flex items-center gap-3">
                      <Package className="h-4 w-4" />
                      <span>Inventario</span>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => toggleSubMenu("inventory", e)}
                    className="p-1 text-gray-600 hover:text-gray-900"
                  >
                    {openMenu === "inventory" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {openMenu === "inventory" && (
                  <div className="ml-4 mt-1 space-y-1">
                    <Link
                      to="/inventory/movements"
                      className={getSubLinkClasses(location.pathname === "/inventory/movements")}
                      onClick={handleLinkClick}
                    >
                      Movimiento de inventario
                    </Link>
                  </div>
                )}
              </div>

              {/* PROYECTOS */}
              <div>
                <div className="flex items-center justify-between">
                  <Link
                    to="/projects"
                    onClick={handleLinkClick}
                    className={getLinkClasses(location.pathname.startsWith("/projects"))}
                  >
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-4 w-4" />
                      <span>Proyectos</span>
                    </div>
                  </Link>
                  <button
                    onClick={(e) => toggleSubMenu("projects", e)}
                    className="p-1 text-gray-600 hover:text-gray-900"
                  >
                    {openMenu === "projects" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {openMenu === "projects" && (
                  <div className="ml-4 mt-1 space-y-1">
                    <Link
                      to="/projects/details"
                      className={getSubLinkClasses(location.pathname === "/projects/details")}
                      onClick={handleLinkClick}
                    >
                      Detalles de material
                    </Link>
                  </div>
                )}
              </div>

              {/* REPORTES */}
              <Link
                to="/reports"
                onClick={handleLinkClick}
                className={getLinkClasses(location.pathname === "/reports")}
              >
                <div className="flex items-center gap-3">
                  <FileChartColumn className="h-4 w-4" />
                  <span>Reportes</span>
                </div>
              </Link>
            </nav>
          </div>

          {/* Gestión Section */}
          <div className="mb-8">
            <h3 className="parrafo text-[#046BB1] mb-2">GESTIÓN</h3>
            <nav className="space-y-1">
              {gestionItems.map(({ title, url, icon: Icon, state }) => (
                <button
                  key={title}
                  type="button"
                  onClick={() => { navigate(url, { state }); handleLinkClick(); }}
                  className={getLinkClasses(false)}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    <span>{title}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Cerrar Sesión */}
        <div className="border-t border-gray-200 p-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors w-full"
          >
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Fondo oscuro para móvil */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
        />
      )}
    </>
  )
}
