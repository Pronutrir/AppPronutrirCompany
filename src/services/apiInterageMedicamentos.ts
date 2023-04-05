import axios, { AxiosResponse } from 'axios';

const ApiInterageMd = axios.create({
    baseURL: 'http://medicapi.intmed.com.br/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token 0ec7224e23b7b21bc713b378a7344d64db835d2e',
    },
});

export class CustomErrorResponse extends Error {
    constructor(message?: string) {
        super();
        this.message =
            message || 'Não foi possível acessar, tente novamente mais tarde!';
    }
}

export class InternalServerError extends CustomErrorResponse {
    constructor(message: string) {
        super(message);
    }
}

ApiInterageMd.interceptors.response.use(
    /* eslint-disable */
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
