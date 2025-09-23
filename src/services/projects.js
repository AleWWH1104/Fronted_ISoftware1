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