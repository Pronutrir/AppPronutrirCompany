import { useQuery } from 'react-query';
import Api from '../services/api';

const useServerHour = () => {
  return useQuery('serverDataHour', async () => {
    return (await Api.get<string>('v1/ServerConfig/GetDateHourServer')).data;
  });
};

export { useServerHour };
