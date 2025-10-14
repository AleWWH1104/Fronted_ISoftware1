import Layout from "../components/Layout"
import { useState, useEffect} from "react";
import CreateProjectPopup from "../components/Projects/CreateProject";
import { CreateButton } from "../components/Button";
import EditProjectPopUp from "../components/Projects/EditProject";
import ProjectsView from "../components/Projects/ProjectsView";
import useEstadoProyectos from "../hooks/useProjects";
import MaterialsByProjectView from "../components/Projects/MaterialsByProject";
import { updateProyecto } from "../services/projects";
import { useLocation, useNavigate } from "react-router-dom";
import WithPermission from "../components/WithPermission";

export default function ProjectsPage() {
  const { estadoProyectos, loading, error, refetch } = useEstadoProyectos();
  const [selectedProject, setSelectedProject] = useState(null);
  const [mode, setMode] = useState('projects'); // 'projects' | 'materials'
  const [materialsProjectId, setMaterialsProjectId] = useState(null);

  const [isPopUp1, setPopUp1] = useState(false);
  const [isPopUp2, setPopUp2] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSaveAndRefresh = () => {
    refetch(); // 1. Llama a refetch para actualizar la lista de proyectos
    setPopUp1(false); // 2. Cierra el primer pop-up --crear
    setPopUp2(false); // 3. Cierra el segundo pop-up --editar
  };

  useEffect(() => {
    const el = document.body;                 // referencia local
    const prev = el.style.overflow;           // guarda el valor previo
    el.style.overflow = (isPopUp1 || isPopUp2) ? "hidden" : "auto";
    return () => { el.style.overflow = prev; };
  }, [isPopUp1, isPopUp2]);

  useEffect(() => {
    if (location.state?.openCreate) {
      setPopUp1(true);
      // limpia el state para que no se vuelva a abrir al refrescar/volver
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const handleOpenMaterials = (projectId) => {
    setMaterialsProjectId(projectId);
    setMode('materials');
  };

  const handleBackToProjectView = () => {
    setMode('projects');
    setMaterialsProjectId(null);
  };

  const handleUpdateProject = async (updated) => {
    try {
      
      // arma el payload 
      const payload = {
        nombre: updated.nombre.trim(),
        tipo_servicio: updated.tipo_servicio,
        ubicacion: updated.ubicacion.trim(),
        estado: updated.estado,
        presupuesto: Number(updated.presupuesto),
        cliente_id: Number(updated.cliente_id),
      };

      await updateProyecto(updated.id, payload);
      await handleSaveAndRefresh();
    } catch (e) {
      console.error("PUT updateProyecto ERROR:", e.response?.data || e.message);
      alert(e?.response?.data?.message ?? "No se pudo actualizar el proyecto.");
    }
  };

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Proyectos</h1>
        <WithPermission permissions="crear_proyecto">
        {mode === 'projects' && (
          <CreateButton label="Crear proyecto" onClick={() => setPopUp1(true)}/>
        )}
        </WithPermission>
      </div>
      {mode === 'projects' ? (
        <ProjectsView
          data={estadoProyectos}
          refetch={refetch}
          onAsignMaterials={handleOpenMaterials} // abre la otra view con detalle de materiales
          onEditProject={(row) => { setSelectedProject(row); setPopUp2(true); }}
        />
      ) : (
        <MaterialsByProjectView
          projectId={materialsProjectId}
          onBack={handleBackToProjectView}
        />
      )}
      {isPopUp1 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <CreateProjectPopup onClickCancel={() => setPopUp1(false)} onClickSave={handleSaveAndRefresh}/>
        </div>
      )}
      {isPopUp2 && selectedProject && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <EditProjectPopUp
            project={selectedProject}
            onClickCancel={() => setPopUp2(false)}
            onClickSave={handleUpdateProject}
          />
        </div>
      )}
    </Layout>
  )
}
