import axios from "./axios"

export const getEstadoMateriales = async () => {
    try {
      const response = await axios.get(`/estado_materiales`);
      return response.data;
    } catch (error) {
      console.error('Error fetching estado material:', error);
      throw error;
    }
};

export const getMovimientoMaterial = async () => {
  try {
    const response = await axios.get(`/bodega-materiales`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movimiento de material:', error);
    throw error;
  }
};