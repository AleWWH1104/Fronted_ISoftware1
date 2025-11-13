"use client"

import DataTable from "react-data-table-component"
import { Eye, Download, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import Modal from "../Modal"

export default function ReportsView({ data, loading, error, refetch, onViewReport, onDownloadReport }) {
  const [records, setRecords] = useState([])
  const [downloading, setDownloading] = useState({})
  const [modalData, setModalData] = useState(null)
  const { hasAnyPermission } = useAuth()
  const canViewReports = hasAnyPermission(["ver_reportes"])
  const canDownloadReports = hasAnyPermission(["descargar_reportes"])

  // Debug: Muestra permisos en consola (puedes quitarlo si ya no lo necesitas)
  console.log("Permisos - Ver:", canViewReports, "Descargar:", canDownloadReports)

  useEffect(() => {
    setRecords(Array.isArray(data) ? data : [])
  }, [data])

  const handleViewReport = (reportId) => {
    if (onViewReport) {
      onViewReport(reportId)
    }
  }

  const handleDownloadReport = async (reportId) => {
    setDownloading((prev) => ({ ...prev, [reportId]: true }))
    try {
      if (onDownloadReport) {
        await onDownloadReport(reportId)
      }
    } catch (error) {
      setModalData({
        type: "message",
        title: "Error",
        message: error.message || "No se pudo descargar el reporte.",
        onCancel: () => setModalData(null),
      })
    } finally {
      setDownloading((prev) => ({ ...prev, [reportId]: false }))
    }
  }

  const fmtDate = (iso) => {
    if (!iso) return ""
    return new Date(iso).toISOString().slice(0, 10)
  }

  const columns = [
    {
      name: "Proyecto",
      selector: (r) => r.nombre,
      sortable: true,
      grow: 2,
    },
    {
      name: "Cliente",
      selector: (r) => r.cliente,
      sortable: true,
      grow: 1.5,
    },
    {
      name: "Último Reporte",
      selector: (r) => r.ultimoReporte,
      sortable: true,
      format: (r) => fmtDate(r.ultimoReporte),
    },
    {
      name: "Avance Actual",
      selector: (r) => r.avanceActual || 0,
      sortable: true,
      cell: (row) => {
        const avance = row.avanceActual || 0
        return (
          <div className="w-24 flex items-center gap-2">
            <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min(avance, 100)}%` }}
              />
            </div>
            <span className="text-xs font-medium">{avance}%</span>
          </div>
        )
      },
    },
    {
      name: "Total Reportes",
      selector: (r) => r.totalReportes || 0,
      sortable: true,
    },
  ]

  if (canViewReports || canDownloadReports) {
    columns.push({
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-3">
          {canViewReports && (
            <button
              title="Ver reporte"
              onClick={() => handleViewReport(row.id)}
              className="cursor-pointer hover:opacity-70"
            >
              <Eye size={18} color="#046bb1" />
            </button>
          )}
          {/* Modificación: Siempre mostrar el icono de descarga (quita la condición canDownloadReports &&) */}
          <button
            title="Descargar reporte"
            onClick={() => handleDownloadReport(row.id)}
            disabled={downloading[row.id]}
            className="cursor-pointer hover:opacity-70 disabled:opacity-50"
          >
            <Download size={18} color={downloading[row.id] ? "#ccc" : "#046bb1"} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: false,
    })
  }

  function handleFilter(event) {
    const value = event.target.value.toLowerCase()
    const newData = data.filter((row) =>
      Object.values(row).some((field) => String(field).toLowerCase().includes(value)),
    )
    setRecords(newData)
  }

  const customStyles = {
    rows: {
      style: {
        minHeight: "40px",
      },
    },
    headCells: {
      style: {
        fontWeight: "bold",
        fontSize: "12px",
      },
    },
  }

  if (loading) {
    return <div className="text-center py-4">Cargando reportes...</div>
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">Error al cargar reportes: {error}</div>
  }

  return (
    <section className="bg-white p-4 rounded-lg pb-0 shadow-xs">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={20} color="#046bb1" />
        <h2 className="subtitulo">Reportes de Avance de Proyectos</h2>
      </div>

      <div className="md:justify-end md:mt-0 mb-2 flex justify-start mt-2 items-center gap-1">
        <span className="parrafo">Buscar: </span>
        <input
          type="text"
          onChange={handleFilter}
          className="border border-gray-300 rounded-sm px-2 py-1 parrafo"
          placeholder="Proyecto, cliente..."
        />
      </div>

      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        responsive
        highlightOnHover
        customStyles={customStyles}
      />

      {modalData && (
        <Modal
          title={modalData.title}
          message={modalData.message}
          onConfirm={modalData.onConfirm}
          onCancel={modalData.onCancel}
          type={modalData.type}
        />
      )}
    </section>
  )
}
