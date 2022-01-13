import axios from 'axios';
import { Alert } from 'react-native';

const api = axios.create({
    //producao
    baseURL: 'https://webapppronutrir.com.br:8005/api/v1/',
    //teste
    //baseURL: 'https://webapppronutrir.com.br:9001/api/v1/',
    //ngrok
    //baseURL: 'https://47ae-177-22-36-198.ngrok.io/api/v1/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
})

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        let flag = true;
        if(axios.isCancel(error)){
            return Promise.reject(error)
        }

        if (error.request._hasError === true && error.request._response.includes('connect')) {
            flag = false;
            Alert.alert(
                'Aviso',
                'Não foi possível conectar aos nossos servidores, sem conexão a internet',
                [{ text: 'OK' }],
                { cancelable: false },
            )
            return Promise.reject({ message:  'Não foi possível conectar ao banco de dados. tente mais tarde!'})
        }
        if (error.request._hasError === true && error.request._response.includes('The request timed out')) {
            flag = false;
            Alert.alert(
                'Aviso',
                'Não foi possível conectar aos nossos servidores !',
                [{ text: 'OK' }],
                { cancelable: false },
            )
            return Promise.reject({ message:  'Não foi possível conectar aos nossos servidores!'})
        }
        if(error.response.status === 500){
            if(error.response.data.includes('ORA-00001')){
                flag = false;
                Alert.alert(
                    'Aviso',
                    `Só é permitido adicionar um plano por convênio !`,
                    [{ text: 'OK' }],
                    { cancelable: false },
                )
                return Promise.reject({ message:  'Só é permitido adicionar um plano por convênio!'})
            }
            if(error.response.data.includes('ORA-12570')){
                flag = false;
                Alert.alert(
                    'Aviso',
                    `codigo error : ${error.response.status} Erro ao Processar a sua solicitação! ${error.response.data}`,
                    [{ text: 'OK' }],
                    { cancelable: false },
                )
                return Promise.reject({ message:  'Erro ao Processar a sua solicitação!!'})
            }
            if(error.response.data.includes('ORA-12545')){
                flag = false;
                Alert.alert(
                    'Aviso',
                    `codigo error : ${error.response.status} Não foi possível conectar ao banco de dados. Favor contactar o administrador do sistema. ${error.response.data}`,
                    [{ text: 'OK' }],
                    { cancelable: false },
                )
                return Promise.reject({ message:  'Não foi possível conectar ao banco de dados. tente mais tarde!'})
            }
            if(error.response.data.includes('conexão sofreu timeout')){
                flag = false;
                Alert.alert(
                    'Aviso',
                    `codigo error : ${error.response.status} Não foi possível conectar ao banco de dados. Favor contactar o administrador do sistema. ${error.response.data}`,
                    [{ text: 'OK' }],
                    { cancelable: false },
                )
                return Promise.reject({ message:  'Não foi possível conectar ao banco de dados. tente mais tarde!'})
            }
            return Promise.reject(error)
        }
        if(error.response.status == 400){
            flag = false;
                Alert.alert(
                    'Aviso',
                    `codigo error : ${error.response.status} Error ao processar sua solicitação! ${error.response.data}`,
                    [{ text: 'OK' }],
                    { cancelable: false },
                )
                return Promise.reject({ message:  'Error ao processar sua solicitação!'})
        }
        if (error.response.status == 401) {
            flag = false;
            Alert.alert(
                'Aviso',
                `codigo error : ${error.response.status} token Expirado! ${error.response.data}`,
                [{ text: 'OK' }],
                { cancelable: false },
            )
            //const requestConfig = error.config
            // O token JWT expirou
            /*  async function GetAuth(){
                 getUser().then(dados => {
                     console.log(dados)
                     if (dados == null) {
                         Api.post('Auth/login', credenciais).then(dados => {
                             const { token } = dados.data
                             saveUser(token);
                             console.log(dados);
                         }).catch(error => {
                             console.log(error)
                         })
                     }
                 })
             } */
            /* deleteUser().then(() => {
                GetAuth();
            })
            return axios(requestConfig) */
            //return error
        }
        /* if(flag){
            const { data } = error.response;
            if(data){
                error.message = data;
                Alert.alert(error.message);
            } else{
                Alert.alert(error.message);
            }
        } */
        return Promise.reject(error);
    },
)

api.interceptors.request.use(
    config => {
        return config;
    },

    //console,log(config)

    //return config
    /* return getUser().then(token => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            return Promise.resolve(config)
        }
    }).catch(error => {
        console.log(error)
        return Promise.reject(error)
    }) */
    //}, 
    /* function (error) {
        return Promise.reject(error);
    } */
)

export default api;
