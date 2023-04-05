import axios, { AxiosResponse } from 'axios';
import { InternalServerError } from './apiInterageMedicamentos';

export interface ResponseToken {
    access_token: string;
    expires_in: number;
    token_type: string;
    scope: null;
    refresh_token: string;
}

const ApiAtendimento = axios.create({
    baseURL: 'http://52.171.215.196:5656/api/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

const refreshTokenAtendimento = async () => {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append(
        'client_id',
        '1_2aawnuk0molc0csso4s8g8kww84gwokwswwow0gcoswco0ko88',
    );
    params.append(
        'client_secret',
        'sg3qa23wo3k08g4so84g88sg4ooo8sk0wggookw0s4kswsoss',
    );
    params.append('username', 'admin');
    params.append('password', 'Pronutrir512355');
    const { access_token } = (
        await ApiAtendimento.post<ResponseToken>('token', params.toString(), {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
        })
    ).data;
    return access_token;
};

export { refreshTokenAtendimento };

ApiAtendimento.interceptors.response.use(
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

/* ApiAtendimento.interceptors.request.use(async (req: any) => { */
/* eslint-disable */
/* if (req.headers?.hasOwnProperty('common')) {
        try {
            const Authorization = req.headers['common'].Authorization;
            if (Authorization) {
                const tokenUpdated = refreshTokenAtendimento();
                if (tokenUpdated) {
                    req.headers.Authorization = `Bearer ${tokenUpdated}`;
                }
            }
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        }
        return req;
    }
}); */

export default ApiAtendimento;
