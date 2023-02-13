import { useContext } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';

export interface IExame {
    id_examination: number;
    id_ref_ged: number;
    cd_doctor_resp: string;
    nm_doctor_resp: string;
    cd_patient: string;
    nm_patient: string;
    cd_validator: string;
    nm_validator: string;
    dt_send: string;
    dt_update: string;
    nm_tag: string;
    status: string;
    observation: string;
    nm_user_reg: string;
    nm_user_update: string;
    id_process_examination: string;
    id_file_examination: string;
    processosExames: IProcessosExames;
    filesExames: IFilesExames[];
}

export interface IProcessosExames {
    id_process_examination: 0;
    ua: null;
    dt_ua: null;
    vt: null;
    dt_vt: null;
    pc: null;
    dt_pc: null;
    duration: null;
    nm_user_reg: null;
    nm_user_update: null;
    exames: null;
}

export interface IFilesExames {
    id_file_examination: 0;
    type: null;
    name: null;
    size: null;
    dt_reg: null;
    dt_update: null;
    nm_user_reg: null;
    nm_user_update: null;
    exames: null;
}

const useExames = (item: string | undefined) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        ['exame', item],
        async ({ signal }) => {
            const { data } = await axios.get<IExame[]>(
                `https://827a-177-22-36-198.ngrok.io/exames`,
                { signal },
            );

            return data;
        },
        {
            onError: () => {
                addAlert({
                    message:
                        'Error ao consultar notas clinicas tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useExames };
