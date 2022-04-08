import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
    //producao
    //baseURL: 'https://webapppronutrir.com.br:8005/api/v1/',
    //teste
    baseURL: 'https://webapppronutrir.com.br:9001/api/v1/',
    //ngrok
    //baseURL: 'https://dc8d-177-22-36-198.ngrok.io/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

axios.interceptors.response.use(
    async function (response) {
        try {
            // Request was successful, e.g. HTTP code 200

            const { httpMetric } = response.config.metadata;

            // add any extra metric attributes if needed
            // httpMetric.putAttribute('userId', '12345678');

            httpMetric.setHttpResponseCode(response.status);
            httpMetric.setResponseContentType(response.headers['content-type']);
            await httpMetric.stop();
        } finally {
            return response;
        }
    },
    async function (error) {
        console.log(error)
        try {
            if (axios.isCancel(error)) {
                return Promise.reject(error);
            }

            if (
                error.request._hasError === true &&
                error.request._response.includes('connect')
            ) {
                flag = false;
                Alert.alert(
                    'Aviso',
                    'Não foi possível conectar aos nossos servidores, sem conexão a internet',
                    [{ text: 'OK' }],
                    { cancelable: false },
                );
                return Promise.reject({
                    message:
                        'Não foi possível conectar ao banco de dados. tente mais tarde!',
                });
            }
            if (
                error.request._hasError === true &&
                error.request._response.includes('The request timed out')
            ) {
                flag = false;
                Alert.alert(
                    'Aviso',
                    'Não foi possível conectar aos nossos servidores !',
                    [{ text: 'OK' }],
                    { cancelable: false },
                );
                return Promise.reject({
                    message: 'Não foi possível conectar aos nossos servidores!',
                });
            }
            if (error.response.status === 500) {
                if (error.response.data.includes('ORA-00001')) {
                    flag = false;
                    Alert.alert(
                        'Aviso',
                        `Só é permitido adicionar um plano por convênio !`,
                        [{ text: 'OK' }],
                        { cancelable: false },
                    );
                    return Promise.reject({
                        message:
                            'Só é permitido adicionar um plano por convênio!',
                    });
                }
                if (error.response.data.includes('ORA-12570')) {
                    flag = false;
                    Alert.alert(
                        'Aviso',
                        `codigo error : ${error.response.status} Erro ao Processar a sua solicitação! ${error.response.data}`,
                        [{ text: 'OK' }],
                        { cancelable: false },
                    );
                    return Promise.reject({
                        message: 'Erro ao Processar a sua solicitação!!',
                    });
                }
                if (error.response.data.includes('ORA-12545')) {
                    flag = false;
                    Alert.alert(
                        'Aviso',
                        `codigo error : ${error.response.status} Não foi possível conectar ao banco de dados. Favor contactar o administrador do sistema. ${error.response.data}`,
                        [{ text: 'OK' }],
                        { cancelable: false },
                    );
                    return Promise.reject({
                        message:
                            'Não foi possível conectar ao banco de dados. tente mais tarde!',
                    });
                }
                if (error.response.data.includes('conexão sofreu timeout')) {
                    flag = false;
                    Alert.alert(
                        'Aviso',
                        `codigo error : ${error.response.status} Não foi possível conectar ao banco de dados. Favor contactar o administrador do sistema. ${error.response.data}`,
                        [{ text: 'OK' }],
                        { cancelable: false },
                    );
                    return Promise.reject({
                        message:
                            'Não foi possível conectar ao banco de dados. tente mais tarde!',
                    });
                }
            }
            // Request failed, e.g. HTTP code 500

            const { httpMetric } = error.config.metadata;

            // add any extra metric attributes if needed
            // httpMetric.putAttribute('userId', '12345678');

            httpMetric.setHttpResponseCode(error.response.status);
            httpMetric.setResponseContentType(
                error.response.headers['content-type'],
            );
            await httpMetric.stop();
        } finally {
            // Ensure failed requests throw after interception
            return Promise.reject(error);
        }
    },
);

api.interceptors.request.use(
    config => {
        return config;
    },
)

/* axios.interceptors.request.use(async function (config) {
    try {
        console.log(config);

        const httpMetric = perf().newHttpMetric(config.url, config.method);
        config.metadata = { httpMetric };

        // add any extra metric attributes, if required
        // httpMetric.putAttribute('userId', '12345678');

        await httpMetric.start();
    } finally {
        return config;
    }
}); */

export default api;
