// services/projects.js
import axios from "./axios";

export const getEstadoProyectos = async () => {
  try {
    const response = await axios.get(`/projects`);
    return response.data;
  } catch (error) {
    console.error('Error fetching estado de proyectos:', error);
    throw error;
  }
};

export const crearProyecto = async (data) => {
  try {
    const response = await axios.post(`/projects/create`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error creando proyecto:', error);
    throw error;
  }
};

export const getProyectoById = async (id) => {
  try {
    const response = await axios.get(`/projects/projectById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching project by id:`, error);
    throw error;
  }
};

//  PARA DASHBOARD: Todos los materiales de proyectos activos
export const getProjectMaterialsForDashboard = async () => {
  try {
    const response = await axios.get(`/projects/materials`);
    console.log(' Service: Dashboard materials loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error(' Service Error in getProjectMaterialsForDashboard:', error.response?.data || error.message);
    throw error;
  }
};

//  PARA VISTA DETALLE: Materiales de un proyecto específico
export const getProjectMaterialsByProject = async (projectId) => {
  if (!projectId) throw new Error("Se requiere projectId");
  try {
    const response = await axios.get(`/proyecto-material/${projectId}`);
    console.log(' Service: Materials for project', projectId, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching project materials by projectId:', error.response?.data || error.message);
    throw error;
  }
};

//  NUEVO: Obtener todos los materiales (código y nombre)
export const getMateriales = async () => {
  try {
    const response = await axios.get(`/materiales`);
    console.log('Service: Materiales loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error(' Service Error in getMateriales:', error.response?.data || error.message);
    throw error;
  }
};

//  NUEVO: Asignar material a proyecto
export const assignMaterialToProject = async (projectId, materialData) => {
  try {
    const response = await axios.post(`/proyecto-material`, {
      id_proyecto: projectId,
      id_material: materialData.id_material,
      ofertada: materialData.cantidad,
      reservado: 0,
      en_obra: 0
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning material to project:', error.response?.data || error.message);
    throw error;
  }
};

// Función para obtener materiales en progreso
export const getMaterialsInProgress = async () => {
  try {
    const response = await axios.get(`/proyecto-material/en-progreso`);
    return response.data;
  } catch (error) {
    console.error(' Error fetching materials in progress:', error.response?.data || error.message);
    throw error;
  }
};