import axios from "./axios"


export const registerRequest = async (user) => {
    const response = await axios.post(
      '/auth/register',
      user,
      { withCredentials: true } // permitir que se vayan las cosas
    );
    return response;
  };

export const loginRequest = async (user) => {
    const response = await axios.post(
      '/auth/login',
      user,
      { withCredentials: true }
    );
    return response;
  };

export const verifyTokenRequest = async () => {
    const response = await axios.get(
      '/auth/verify-token',
      { withCredentials: true }
    );
    return response;
};