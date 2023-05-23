import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
});

instance.interceptors.response.use(
  (response) => {
    const data = response;
    if (data.erro) {
      return Promise.reject(new Error('CEP inválido'));
    }
    return { data };
  },
  (error) => Promise.reject(error),
);

export const cepInterceptor = async (zip) => {
  try {
    const data = await instance.get(`${zip}/json`);
    return data;
  } catch (error) {
    console.error(error);
    return error;
  }
};