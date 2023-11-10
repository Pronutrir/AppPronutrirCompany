import axios from 'axios';

const ApiAuth = axios.create({
  //teste
  //baseURL: 'https://servicesapp.pronutrir.com.br/agentauthtest/api/v1/',
  //producao
  baseURL: 'https://servicesapp.pronutrir.com.br/agentauth/api/v1/',
  //testeauth
  //baseURL: 'https://agentauth.pronutrir.com.br/api/v1/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IlVzZXJATW9iaWxlIzAxMTAiLCJyb2xlIjoiTW9iaWxlIiwibmJmIjoxNjY4NjI5NTIzLCJleHAiOjE2Njg2MzMxMjMsImlhdCI6MTY2ODYyOTUyM30._HXbw3tyQNxriRfFWiwAifiV5FjWcCwMuVADZIilcd8',
  },
});

export default ApiAuth;
