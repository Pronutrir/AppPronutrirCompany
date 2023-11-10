import { useQuery } from 'react-query';
import Api from '../services/api';

const useServerHour = () => {
  return useQuery('serverDataHour', async () => {
    return (await Api.get<string>('ServerConfig/GetDateHourServer')).data;
  });
};

export { useServerHour };
