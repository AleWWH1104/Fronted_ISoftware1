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

export const getReports = async () => {
  try {
    const response = await axios.get(`/proyectos/reportes`);
    return response.data;
  } catch (error) {
    console.error('Error fetching reportes:', error);
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

// services/reports.js

export const uploadPhoto = async (reportId, files) => {
    try {
        const formData = new FormData();
        
        // Asegúrate de usar el nombre correcto del campo ('fotos' según tu multer)
        files.forEach(file => {
            formData.append('fotos', file); 
        });

        const response = await axios.post(
            `/${reportId}/fotos`, // Asegúrate que la ruta coincida con tu backend
            formData,
            { 
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        
        return response.data;
    } catch (error) {
        console.error('Error subiendo fotos a reporte:', error);
        throw error;
    }
};

export const getReportForPDF = async (reportId) => {
  try {
    const response = await axios.get(`/reportes/${reportId}/pdf`, { withCredentials: true }); 
    return response.data;
  } catch (error) {
    console.error('Error fetching report data for PDF:', error);
    throw error; // Re-lanzar para que el hook pueda manejarlo
  }
};


