import DataTable from 'react-data-table-component';
import { Pencil, Trash2, Boxes } from 'lucide-react';
import { useEffect, useState } from 'react';
import { patchProyectoEstado, patchProyectoTipo } from '../../services/projects';
import { useAuth } from '../../context/AuthContext';

export default function ProjectsView({data, refetch, onEditProject, onAsignMaterials}) {
  
  const [records,  setRecords] = useState([]);
  const [saving, setSaving] = useState({}); 
  const { hasAnyPermission } = useAuth();
  const canEdit = hasAnyPermission(['editar_proyecto']);
  const canDelete = hasAnyPermission(['eliminar_proyecto']);

  // 1) Enum del backend (exactamente iguales)
  const ESTADO_VALUES = ['Solicitado', 'En Progreso', 'Finalizado', 'Cancelado'];
  const TIPO_VALUES = ['Piscina Regular', 'Piscina Irregular', 'Remodelacion', 'Jacuzzi', 'Paneles Solares', 'Fuentes y Cascadas'];

  // 2) Helper para armar {value,label} con el mismo texto
  const makeOpts = (arr) => arr.map(v => ({ value: v, label: v }));

  const ESTADO_OPTS = makeOpts(ESTADO_VALUES);
  const TIPO_OPTS   = makeOpts(TIPO_VALUES);


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

  const setSavingFlag = (id, field, v) => {
    const key = `${id}_${field}`;
    setSaving(prev => ({ ...prev, [key]: v }));
  };
  const isSaving = (id, field) => !!saving[`${id}_${field}`];

  const updateRecordOptimistic = async (id, field, nextValue) => {
    const prev = records.find(r => r.id === id);
    if (!prev) return;

    setSavingFlag(id, field, true);
    setRecords(rs => rs.map(r => (r.id === id ? { ...r, [field]: nextValue } : r)));

    try {
      let res;
      if (field === "tipo_servicio") {
        res = await patchProyectoTipo(id, nextValue);
        console.log("[PATCH tipo OK]", { id, send: { tipo_servicio: nextValue }, res });
      } else if (field === "estado") {
        res = await patchProyectoEstado(id, nextValue);
        console.log("[PATCH estado OK]", { id, send: { estado: nextValue }, res });
      }
      await refetch?.();
    } catch (err) {
      console.error(err);
      // rollback
      console.error("[PATCH ERROR]", err);
      setRecords(rs => rs.map(r => (r.id === id ? { ...r, [field]: prev[field] } : r)));
      alert(`No se pudo guardar el cambio.\n${err.response?.data?.message ?? ""}`);
    } finally {
      setSavingFlag(id, field, false);
    }
  };
  
  const columns = [
      { name: "Fecha inicio", selector: r => r.fecha_inicio, sortable: 'true', format: r => fmtDate(r.fecha_inicio) },
      { name: "Fecha fin", selector: r => r.fecha_fin , sortable: 'true', format: r => fmtDate(r.fecha_fin) },
      { name: "Proyecto", selector: r => r.nombre, sortable: 'true' },
      {
        name: "Tipo",
        sortable: 'true',
        selector: r => r.tipo_servicio,
        cell: (row) => (
          
          <select
            className="border border-gray-300 rounded-lg px-2 py-1"
            value={row.tipo_servicio}
            disabled={isSaving(row.id, 'tipo_servicio')}
            onChange={(e) => updateRecordOptimistic(row.id, 'tipo_servicio', e.target.value)}
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
            disabled={isSaving(row.id, 'estado')}
            onChange={(e) => updateRecordOptimistic(row.id, 'estado', e.target.value)}
            onClick={(e) => e.stopPropagation()}
          >
            {ESTADO_OPTS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ),
      },
      { name: 'Ubicacion', selector: row => row.ubicacion, sortable: "true"},
  ];

  if (canEdit) {
      columns.push({
        name: 'Acciones',
        cell: (row) => (
          <div style={{ display: 'flex', gap: 12 }}>
            <button 
              title="Editar"
              onClick={() => onEditProject(row)} >
              <Pencil size={15} color='#046bb1'/>
            </button>
            <button 
              title="Ver materiales"
              onClick={() => onAsignMaterials(row.id)} >
              <Boxes size={15} color='#046bb1'/>
            </button>
            {/* Botón eliminar */}
            {canDelete && (
              <button
                title="Eliminar"
                onClick={() => handleEliminar(row.id_material)}
              >
                <Trash2 size={15} color="#6E6E71" />
              </button>
            )}
          </div>
        ),
        ignoreRowClick: true,
        button: "true",
      });
    }

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
