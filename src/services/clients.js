import axios from "./axios";

export const createClient = async (data) => {
  try {
    const response = await axios.post(`/clients/create`, data, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error creando cliente:', error);
    throw error;
  }
};

/*Json
{
  "nombre": "Cliente demo",
  "telefono": "555-1234"
}
*/

export const getClients = async () => {
  try {
    const response = await axios.get(`/clients`);
    return response.data;
  } catch (error) {
    console.error('Error fetching clientes:', error);
    throw error;
  }
};

/*Json
[
    {
        "id": 1,
        "nombre": "Hotel Costa Azul",
        "telefono": "5515-1001"
    },
    {
        "id": 2,
        "nombre": "Residencial Las Palmas",
        "telefono": "3555-1002"
    }
]
*/