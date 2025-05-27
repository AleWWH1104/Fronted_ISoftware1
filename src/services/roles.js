import axios from "./axios"

export const getRoles = async () => {
    try {
      const response = await axios.get('/roles'); 
      return response.data.data
    } catch (error) {
      console.error('Error al obtener todos los roles:', error);
      throw error;
    }
}