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

export const getProjectsByService = async () => {
    try {
      const response = await axios.get(`/projects/Total-Projects-ByService`);
      return response.data;
    } catch (error) {
      console.error('Error fetching projects by service:', error);
      throw error;
    }
};