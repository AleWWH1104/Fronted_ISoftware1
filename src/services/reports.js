import axios from "./axios"

export const createReport = async (projectId, data) => {
    try {
        const response = await axios.post(`/proyectos/${projectId}/reportes`, data, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error creando reporte:', error);
        throw error;
    }
};

export const getReportsByProject = async (projectId) => {
  try {
    const { data } = await axios.get(`proyectos/${projectId}/reportes`);
    return {
      project: data.proyecto,
      reports: data.reportes
    };
  } catch (error) {
    console.error('Error fetching reports by project:', error.response?.data || error.message);
    throw error;
  }
};



