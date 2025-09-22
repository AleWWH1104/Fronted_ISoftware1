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
