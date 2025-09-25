import axios from "./axios"

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

export const getProjectMaterials = async () => {
  try {
    const response = await axios.get(`/projects/materials`); // Ajusta URL correcta
    return response.data;
  } catch (error) {
    console.error('Error fetching detalles de materiales:', error);
    throw error;
  }
};