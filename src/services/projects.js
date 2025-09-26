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

// ✅ CORREGIDO: Usar el endpoint correcto para obtener materiales por proyecto
export const getProjectMaterialsByProject = async (projectId) => {
  if (!projectId) throw new Error("Se requiere projectId");

  try {
    const response = await axios.get(`/proyecto-material/${projectId}`);
    console.log('✅ Service: Materials for project', projectId, response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching project materials by projectId:', error.response?.data || error.message);
    throw error;
  }
};

// Esta función ya no es necesaria, pero la dejo por si la usas en otro lugar
export const getProjectMaterials = async () => {
  try {
    const response = await axios.get(`/projects/materials`);
    console.log('✅ Service: All project materials loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Service Error in getProjectMaterials:', error.response?.data || error.message);
    throw error;
  }
};

// Función adicional para asignar materiales a un proyecto (si la necesitas)
export const assignMaterialToProject = async (projectId, materialData) => {
  try {
    const response = await axios.post(`/proyecto-material`, {
      id_proyecto: projectId,
      ...materialData
    });
    return response.data;
  } catch (error) {
    console.error('❌ Error assigning material to project:', error.response?.data || error.message);
    throw error;
  }
};

// Función para obtener materiales en progreso (si la necesitas)
export const getMaterialsInProgress = async () => {
  try {
    const response = await axios.get(`/proyecto-material/en-progreso`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching materials in progress:', error.response?.data || error.message);
    throw error;
  }
};