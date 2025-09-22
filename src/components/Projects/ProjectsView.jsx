import DataTable from 'react-data-table-component';
import { Pencil, Trash2, Boxes } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ProjectsView({data, refetch, onEditProject, onAsignMaterials}) {
  
  const [records,  setRecords] = useState([]);

  const ESTADO_OPTS = [
    { value: 'solicitado', label: 'Solicitado' },
    { value: 'en progreso', label: 'En progreso' },
    { value: 'finalizado', label: 'Finalizado' },
    { value: 'cancelado', label: 'Cancelado' },
  ];

  const TIPO_OPTS = [
    { value: 'regulares', label: 'Piscina Regular' },
    { value: 'irregulares', label: 'Piscina Irregular' },
    { value: 'mantenimiento', label: 'Mantenimiento' },
    { value: 'paneles solares', label: 'Paneles Solares' },
    { value: 'remodelaciones', label: 'Remodelación' },
    { value: 'jacuzzis', label: 'Jacuzzi' },
    { value: 'fuentes y cascadas', label: 'Fuentes y Cascadas' },
  ];

  useEffect(() => {
    setRecords(Array.isArray(data) ? data : []);
  }, [data]);

  const handleEliminar = async (id) => {
  };

  const fmtDate = (iso) => {
    if (!iso) return '';
    // mostrar solo YYYY-MM-DD
    return new Date(iso).toISOString().slice(0, 10);
  };

  const updateRecord = (id, field, value) => {
    setRecords(prev =>
      prev.map(r => (r.id === id ? { ...r, [field]: value } : r))
    );
    
  };
  
  const columns = [
      { name: "Fecha inicio", selector: r => r.fecha_inicio, sortable: 'true', format: r => fmtDate(r.fecha_inicio) },
      { name: "Fecha fin", selector: r => r.fecha_fin, sortable: 'true', format: r => fmtDate(r.fecha_fin) },
      { name: "Proyecto", selector: r => r.nombre, sortable: 'true' },
      {
        name: "Tipo",
        sortable: 'true',
        selector: r => r.tipo_servicio,
        cell: (row) => (
          <select
            className="border border-gray-300 rounded-lg px-2 py-1"
            value={row.tipo_servicio}
            onChange={(e) => updateRecord(row.id, 'tipo_servicio', e.target.value)}
            onClick={(e) => e.stopPropagation()} // evita seleccionar fila
          >
            {TIPO_OPTS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ),
      },
      { name: 'Cliente', selector: row => row.cliente_id, sortable: "true", center: "true"},
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
              <option key={opt.value} value={opt.value}>{opt.label}</option>
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
