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

export const getMovimientoMaterial = async (params = {}) => {
  const { data } = await axios.get('/bodega-materiales', {
    params,
    withCredentials: true,
  });
  return data;
};

export const crearMaterial = async (data) => {
  try {
    const response = await axios.post(`/materiales`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error creando materiales:', error);
    throw error;
  }
};

export const postMovimientoMaterial = async (payload) => {
  try {
    const { data } = await axios.post('/bodega-materiales', payload, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error('Error agregando a bodega material:', error);
    throw error;
  }
};

export const eliminarMaterial = async (id) => {
  try {
    const response = await axios.delete(`/materiales/${id}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error(`Error eliminando material:`, error);
    throw error;
  }
};

export const getMaterialById = async (id) => {
  try {
    const response = await axios.get(`/materiales/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching material by id:`, error);
    throw error;
  }
};

export const getMateriales = async () => {
    try {
      const response = await axios.get(`/materiales`);
      return response.data;
    } catch (error) {
      console.error('Error fetching materiales:', error);
      throw error;
    }
};


