import React from 'react';
import { useQuery } from 'react-query';
import Api from '../services/api';

/* const [intervalMs, setIntervalMs] = React.useState(1000);

const { status, data, error, isFetching } = useQuery('serverDataHour', async () => {
    const res = await Api.get<string>('ServerConfig/GetDateHourServer');
    return res.data;
}, {
    refetchInterval: intervalMs
}); */

const useServerHour = () => {
    return useQuery('serverDataHour', async () => {
        return (await Api.get<string>('ServerConfig/GetDateHourServer')).data;
    },);
};

export { useServerHour };
