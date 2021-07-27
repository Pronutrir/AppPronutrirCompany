import axios from 'axios';

const ApiInterageMd = axios.create({
    //baseURL: 'http://medicapi.intmed.com.br/',
    baseURL: 'http://medicapi.intmed.com.br/',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Token 0ec7224e23b7b21bc713b378a7344d64db835d2e'
    }
});

ApiInterageMd.interceptors.request.use(
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

export default ApiInterageMd;