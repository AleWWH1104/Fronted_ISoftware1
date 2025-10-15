import axios from "./axios"

export const getFinishedProjects = async () => {
    try {
      const response = await axios.get(`/projects/finished/count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects/finished:', error);
      throw error;
    }
};

export const getInProgressProjects = async () => {
    try {
      const response = await axios.get(`/projects/in-progress-count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects/in-progress-count:', error);
      throw error;
    }
};

export const getCountCustomers = async () => {
    try {
      const response = await axios.get(`/clients_count`);
      return response.data;
    } catch (error) {
      console.error('Error fetching clients_count:', error);
      throw error;
    }
};

export const getCountProducts = async () => {
    try {
      const response = await axios.get(`/materiales/total-cantidad`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cantidad de productos:', error);
      throw error;
    }
};

export const getProjectsByService = async (estado) => {
  try {
    // codifica espacios u otros caracteres: "En Progreso" → "En%20Progreso"
    const encodedEstado = encodeURIComponent(estado);

    const response = await axios.get(`/projects/${encodedEstado}/count`, {
      withCredentials: true, // si tu backend usa cookies o auth por sesión
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching projects by service:', error);
    throw error;
  }
};
