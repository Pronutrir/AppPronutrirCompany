import { useContext } from 'react';
import { InfiniteData, useInfiniteQuery } from 'react-query';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';
interface IExameResponse {
    result: IExame[];
    statusCode: number;
    message: string;
}
export interface IExame {
    id_examination: number;
    cd_doctor_resp: string;
    nm_doctor_resp: string;
    cd_patient: string;
    nm_patient: string;
    dt_send: string;
    dt_update: string;
    nm_tag: string;
    status: string;
    nm_user_reg: string;
    nm_user_update: string;
    processosExames: IProcessosExames;
    filesExames: IFilesExames[];
}
export interface IProcessosExames {
    id_process_examination: number;
    ua: true;
    dt_ua: string;
    nm_user_reg: string; //AppMobile
    nm_user_update: string; //AppMobile
    id_examination: 1;
}
export interface IFilesExames {
    id_file_examination: number;
    type: string; //'image/png'
    name: string;
    size: number;
    guidFileStorage: string;
    status: string;
    dt_reg: string;
    dt_update: string;
    nm_user_reg: string; //AppMobile
    nm_user_update: string; //AppMobile
    id_examination: number;
}

const useExames = (item: string | undefined) => {
    const { addAlert } = useContext(NotificationGlobalContext);

    return useInfiniteQuery(
        ['exame', 'infinite'],
        async ({ signal, pageParam = 1 }) => {
            const { result } = (
                await Api.get<IExameResponse>(
                    `Exames/ListExamesPacientes?page=${pageParam}&rows=5`,
                    {
                        signal,
                    },
                )
            ).data;
            return result;
        },
        {
            getNextPageParam: (lastPage, pages) => {
                if (lastPage?.length < 5) {
                    return null;
                } else {
                    return pages.length + 1;
                }
            },
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

type Ivalue = 'E' | 'A' | 'I';

const updateCacheExame = (
    item?: InfiniteData<IExame[]>,
    idExame?: string,
    value?: Ivalue,
) => {
    if (item) {
        const { pageParams, pages } = item;

        const updatePages = pages.map((element) => {
            return element.map((elem) => {
                const findExame = elem.filesExames.findIndex(
                    (exameIndex) => exameIndex.guidFileStorage === idExame,
                );

                if (findExame != -1) {
                    elem.filesExames[findExame].status = value ?? 'A';
                }

                return elem;
            });
        });
        return { pageParams, pages: updatePages };
    }
};

export { useExames, updateCacheExame };
