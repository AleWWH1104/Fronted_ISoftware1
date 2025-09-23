import Layout from "../components/Layout"
import { useState, useEffect} from "react";
import CreateProjectPopup from "../components/Projects/CreateProject";
import { CreateButton } from "../components/Button";
import EditProjectPopUp from "../components/Projects/EditProject";
import ProjectsView from "../components/Projects/ProjectsView";
import useEstadoProyectos from "../hooks/useProjects";

export default function ProjectsPage() {
  const { estadoProyectos, loading, error, refetch } = useEstadoProyectos();
  const [selectedProject, setSelectedProject] = useState(null);

  const [isPopUp1, setPopUp1] = useState(false);
  const [isPopUp2, setPopUp2] = useState(false);

  const handleSaveAndRefresh = () => {
    refetch(); // 1. Llama a refetch para actualizar la lista de proyectos
    setPopUp1(false); // 2. Cierra el primer pop-up --crear
    setPopUp2(false); // 3. Cierra el segundo pop-up --editar
  };

  useEffect(() => {
    if (isPopUp1 || isPopUp2) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isPopUp1, isPopUp2]);

  const handleCancel = () => {
    alert("Cancelaste la edición");
  };

  const handleSave = (updatedProject) => {
    console.log("Proyecto actualizado:", updatedProject);
    alert(`Guardado: ${updatedProject.name}`);
    setPopUp1(false); 
    setPopUp2(false);
  };

  return (
    <Layout>
      <div className='flex justify-between items-center mb-8'>
        <h1 className='titulo'>Proyectos</h1>
        {/* <WithPermission permissions={['crear_proyecto']}> */}
          <CreateButton label="Crear proyecto" onClick={() => setPopUp1(true)}/>
        {/* </WithPermission> */}
      </div>
      <ProjectsView data={estadoProyectos} refetch={refetch} onAsignMaterials={""} onEditProject={(row) => {setSelectedProject(row); setPopUp2(true);}}/>
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
            onClickSave={handleSaveAndRefresh}
          />
        </div>
      )}
    </Layout>
  )
}
