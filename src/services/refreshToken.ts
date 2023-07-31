import axios, { AxiosRequestHeaders } from 'axios';
import moment from 'moment';
import { decode } from 'react-native-pure-jwt';
import {
  deleteRefreshToken,
  getRefreshToken,
  saveRefreshToken,
} from '../utils';
import api from './api';
interface TokenResponse {
  id: number;
  username: string;
  dataRegistro: string;
  dataAtualizacao: string;
  dataHoraValidado: string;
  dataExpira: string;
  ativo: true;
  jwtToken: string;
  integraApi: boolean;
  refreshToken: string;
}

const refreshToken = async (tokenHeads: AxiosRequestHeaders) => {
  const { Authorization } = tokenHeads;
  if (typeof Authorization === 'string') {
    const { payload } = await decode(
      Authorization.replace('Bearer ', ''),
      'teste',
      {
        skipValidation: true, // to skip signature and exp verification
      },
    );

    type ObjectKey = keyof typeof payload;

    const myVar = 'exp' as ObjectKey;

    const exp = payload[myVar];

    //console.log(moment.unix(exp).diff(moment(), 'seconds'));

    const expired = moment.unix(exp).diff(moment(), 'seconds') < 100;

    const rfToken: string = await getRefreshToken();

    if (expired) {
      console.log(' ==> token expirado ');
      const {
        data: { jwtToken, refreshToken },
      } = await axios.post<TokenResponse>(
        `https://servicesapp.pronutrir.com.br/usershield/api/v1/Auth/refreshtoken`,
        { token: rfToken },
      );
      api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
      await deleteRefreshToken();
      await saveRefreshToken(refreshToken);
      return jwtToken;
    } else {
      return null;
    }
  }
};

export default refreshToken;
