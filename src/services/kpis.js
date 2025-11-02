// src/services/kpis.js
import axios from "./axios";

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
    const encodedEstado = encodeURIComponent(estado);
    const response = await axios.get(`/projects/${encodedEstado}/count`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching projects by service:', error);
    throw error;
  }
};

/**
 * Obtiene los top 5 materiales más usados.
 */
export const getTopMaterialsUsed = async () => {
  try {
    const response = await axios.get(`/top-materiales-usados`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top materiales usados:', error);
    throw error;
  }
};

/**
 * Obtiene los top 5 proyectos con mayor presupuesto.
 */
export const getTopProjectsBudget = async () => {
  try {
    const response = await axios.get(`/top-proyectos-presupuesto`);
    return response.data;
  } catch (error) {
    console.error('Error fetching top proyectos presupuesto:', error);
    throw error;
  }
};

/**
 * Obtiene los datos de entradas y salidas mensuales.
 */
export const getEntriesAndExits = async () => {
  try {
    const response = await axios.get(`/entradas-salidas`);
    return response.data;
  } catch (error) {
    console.error('Error fetching entradas y salidas:', error);
    throw error;
  }
};