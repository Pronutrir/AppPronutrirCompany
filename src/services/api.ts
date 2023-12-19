import axios, { AxiosResponse } from 'axios';
import refreshToken from './refreshToken';
import { InternalServerError } from './apiInterageMedicamentos';

const Api = axios.create({
  //producao
  baseURL: 'https://servicesapp.pronutrir.com.br/apitasy/api/v1/',
  //teste
  //baseURL: 'https://servicesapp.pronutrir.com.br/apitasytest/api/v1/',
  //ngrok
  //baseURL: 'https://8b4b-177-22-36-198.ngrok-free.app/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

Api.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  ({ response }: { response: AxiosResponse<string> }) => {
    console.log('api.interceptors.response.use', response);
    if (response.status === 409) {
      return Promise.reject(new InternalServerError(response.data));
    }

    if (response.status === 500) {
      return Promise.reject(new InternalServerError(response.data));
    }

    if (response.status === 401) {
      return Promise.reject(new InternalServerError(response.data));
    }

    // Generic Error Response
    return Promise.reject(new InternalServerError(response.data));
  },
);

Api.interceptors.request.use(async req => {
  try {
    // eslint-disable-next-line no-prototype-builtins
    if (req.headers?.hasOwnProperty('common')) {
      const tokenUpdated = await refreshToken(req.headers['common']);
      if (tokenUpdated) {
        req.headers.Authorization = `Bearer ${tokenUpdated}`;
      }
    }
  } catch (error) {
    console.log('erro resquest ==> ', error);
    return Promise.reject(error);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return req;
  }
});

export default Api;
