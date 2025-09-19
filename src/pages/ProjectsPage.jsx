import Layout from "../components/Layout"
import { useState, useEffect} from "react";
import CreateProjectPopup from "../components/Projects/CreateProject";
import { CreateButton } from "../components/Button";
import EditProjectPopUp from "../components/Projects/EditProject";
import ProjectsView from "../components/Projects/ProjectsView";

export default function ProjectsPage() {
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

  const mockProject = {
    id: 1,
    name: "Renovación de Piscina Principal",
    serviceType: "Mantenimiento completo",
    location: "Zona 10, Ciudad de Guatemala",
    status: "En progreso",
    budget: 15000,
    client: {
      id: 101,
      name: "Juan Pérez",
      phone: "5555-1234",
    },
  };

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
      <ProjectsView onAsignMaterials={""} onEditProject={() => setPopUp2(true)}/>
      {isPopUp1 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <CreateProjectPopup onClickCancel={() => setPopUp1(false)} onClickSave={handleSaveAndRefresh}/>
        </div>
      )}
      {isPopUp2 && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-end z-50">
          <EditProjectPopUp
            project={mockProject}
            onClickCancel={() => setPopUp2(false)}
            onClickSave={handleSave}
          />
        </div>
      )}
    </Layout>
  )
}
