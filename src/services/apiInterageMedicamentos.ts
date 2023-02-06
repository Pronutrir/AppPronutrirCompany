import axios, { AxiosResponse } from 'axios';
import { InternalServerError } from './api';

const ApiInterageMd = axios.create({
    baseURL: 'http://medicapi.intmed.com.br/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token 0ec7224e23b7b21bc713b378a7344d64db835d2e',
    },
});

ApiInterageMd.interceptors.response.use(
    (response: AxiosResponse<any>) => response,
    ({ response }: { response: AxiosResponse<string> }) => {
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

export default ApiInterageMd;
