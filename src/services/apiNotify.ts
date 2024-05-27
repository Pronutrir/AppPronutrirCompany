import axios, { AxiosResponse } from 'axios';
import refreshToken from './refreshToken';
import { InternalServerError } from './apiInterageMedicamentos';

const ApiNotify = axios.create({
  //teste
  baseURL: 'https://servicesapp.pronutrir.com.br/notifytest/api/v1/',
  //producao
  //baseURL: 'https://servicesapp.pronutrir.com.br/notify/api/v1/',
  //testeauth
  //baseURL: 'https://agentauth.pronutrir.com.br/api/v1/',
});

export default ApiNotify;

ApiNotify.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  ({ response }: { response: AxiosResponse<string> }) => {
    console.log('ApiNotify.interceptors.response.use', response);
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

ApiNotify.interceptors.request.use(async req => {
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
