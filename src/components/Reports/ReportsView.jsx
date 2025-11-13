import DataTable from "react-data-table-component"
import { Eye, Download} from "lucide-react"
import { useEffect, useState } from "react"

export default function ReportsView({ data, refetch, onViewReport, onDownloadReport }) {
  const [records, setRecords] = useState([])
  const [downloading, setDownloading] = useState({})

  useEffect(() => {
    setRecords(Array.isArray(data) ? data : [])
  }, [data])

  const fmtDate = (iso) => {
    if (!iso) return ""
    return new Date(iso).toISOString().slice(0, 10)
  }

  const handleViewReport = (row) => {
    if (onViewReport) {
      onViewReport(row)
    }
  }

  const handleDownloadReport = async (row) => {
    if (onDownloadReport) {
      setDownloading(prev => ({ ...prev, [row.id]: true }))
      try {
        await onDownloadReport(row)
      } finally {
        setDownloading(prev => ({ ...prev, [row.id]: false }))
      }
    }
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
      selector: (r) => r.ultimoReporte ?? '-',
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
          <div className="flex items-center gap-2">
            <div className="w-12 lg:w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#046BB1] rounded-full transition-all"
                style={{ width: `${Math.min(avance, 100)}%` }}
              />
            </div>
            <span className="parrafo">{avance}%</span>
          </div>
        )
      },
    },
    {
      name: "Total Reportes",
      selector: (r) => r.totalReportes || 0,
      sortable: true,
      center: "true",
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex gap-3">
          <button
            title="Ver reporte"
            onClick={() => handleViewReport(row)}
            className="cursor-pointer hover:opacity-70"
          >
            <Eye size={18} color="#046bb1" />
          </button>
          <button
            title="Descargar reporte"
            onClick={() => handleDownloadReport(row)}
            disabled={downloading[row.id]}
            className="cursor-pointer hover:opacity-70 disabled:opacity-50"
          >
            <Download size={18} color={downloading[row.id] ? "#ccc" : "#046bb1"} />
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: "false",
    }
  ]

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

  return (
    <section className="bg-white p-4 rounded-lg pb-0 shadow-xs">
      <h2 className="subtitulo">Reportes de Avance de Proyectos</h2>
      <div className="md:justify-end md:mt-0 mb-2 flex justify-start mt-2 items-center gap-1">
        <span className="parrafo">Buscar: </span>
        <input
          type="text"
          onChange={handleFilter}
          className="border border-gray-300 rounded-sm px-2 py-1 parrafo"
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
    </section>
  )
}