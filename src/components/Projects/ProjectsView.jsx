import DataTable from 'react-data-table-component';
import { Pencil, Trash2, Boxes } from 'lucide-react';
import { useEffect, useState } from 'react';
export default function ProjectsView({onEditProject, onAsignMaterials}) {
  
  const [records,  setRecords] = useState([]);

  //data
  const data = [
  { id: 1, fechaInicio: "12/12/12", fechaFin: "12/12/12", proyecto: "Proyecto-1", tipo: "Piscina Regular", cliente: "Jorge Kik", estado: "En progreso", ubicacion: "10" },
  { id: 2, fechaInicio: "05/02/25", fechaFin: "20/02/25", proyecto: "Proyecto-2", tipo: "Mantenimiento", cliente: "Ana López", estado: "Pendiente",   ubicacion: "Zona 15" },
  { id: 3, fechaInicio: "01/03/25", fechaFin: "15/03/25", proyecto: "Proyecto-3", tipo: "Instalación",      cliente: "Piscinas GT", estado: "Completado", ubicacion: "Villa Nueva" },
  ];

  const ESTADO_OPTS = ["Solicitado", "En progreso", "Completado", "Cancelado"];
  const TIPO_OPTS   = ["Piscina Regular","Piscina Irregular", "Mantenimiento", "Paneles Solares", "Remodelación"];

  useEffect(() => {
    setRecords(data);
  }, [data]);

  const handleEliminar = async (id) => {
  };
  
  const columns = [
      { name: "Fecha inicio", selector: r => r.fechaInicio, sortable: 'true' },
      { name: "Fecha fin", selector: r => r.fechaFin, sortable: 'true' },
      { name: "Proyecto", selector: r => r.proyecto, sortable: 'true' },
      {
        name: "Tipo",
        sortable: 'true',
        selector: r => r.tipo,
        cell: (row) => (
          <select
            className="border border-gray-300 rounded-lg px-2 py-1"
            value={row.tipo}
            onChange={row.tipo}
            onClick={(e) => e.stopPropagation()} // evita seleccionar fila
          >
            {TIPO_OPTS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ),
      },
      { name: 'Cliente', selector: row => row.cliente, sortable: "true", center: "true"},
      {
        name: "Estado",
        sortable: true,
        selector: r => r.estado,
        cell: (row) => (
          <select
            className="border border-gray-300 rounded-lg px-2 py-1"
            value={row.estado}
            onChange={(e) => updateRecord(row.id, "estado", e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            {ESTADO_OPTS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ),
      },
      { name: 'Ubicacion', selector: row => row.ubicacion, sortable: "true"},
      {
        name: 'Acciones',
        cell: (row) => (
          <div style={{ display: 'flex', gap: 16 }}>
            <button 
              title="Edit"
              onClick={() => onEditProject(row)} >
              <Pencil size={20} color='#046bb1'/>
            </button>
            <button 
              title="Asign"
              onClick={() => onAsignMaterials(row)} >
              <Boxes size={20} color='#046bb1'/>
            </button>
            <button
              title="Delete"
              onClick={() => handleEliminar(row.id_material)}
            >
              <Trash2 size={20} color='#6E6E71' />
            </button>
          </div>
        ),
        ignoreRowClick: true,
        button: "true",
      }

  ];

  function handleFilter(event){
      const value = event.target.value.toLowerCase();
      const newData = data.filter(row =>
          Object.values(row).some(
          field =>
              String(field).toLowerCase().includes(value)
          )
      );
      setRecords(newData);
  }
    
  const customStyles = {
    rows: {
      style: {
        minHeight: '40px',
      },
    },
    headCells: {
      style:{
        fontWeight: 'bold',
        fontSize: '12px',
      }
    },
  };
    
  return (
  <section className="bg-white p-4 rounded-lg pb-0 shadow-xs">
    <h2 className="subtitulo">Estado general de proyectos</h2>
    <div className='md:justify-end md:mt-0 mb-2 flex justify-start mt-2 items-center gap-1'>
      <span className='parrafo'>Buscar: </span>
      <input type="text" onChange={handleFilter} className='border border-gray-300 rounded-sm px-2 py-1 parrafo'/>
    </div>
    
    <DataTable
      columns={columns}
      data={records}
      fixedHeader
      pagination
      responsive
      highlightOnHover
      pointerOnHover
      customStyles={customStyles}
    />
  </section>
  );
}
