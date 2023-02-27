import { useContext } from 'react';
import {
    InfiniteData,
    QueryClient,
    useInfiniteQuery,
    useMutation,
} from 'react-query';
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
export interface IPutExame extends IExame {
    id_ref_ged?: number;
    cd_validator: string;
    nm_validator: string;
    observation?: string;
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

export type IvalueStatusExame = 'E' | 'A' | 'C';
export interface IparamsFilterExame {
    statusExame?: IvalueStatusExame;
    nomePacient?: string;
    nomeMedico?: string;
}

const useExames = (paramsFilterExame: IparamsFilterExame) => {
    const { addAlert } = useContext(NotificationGlobalContext);

    return useInfiniteQuery(
        ['exame', paramsFilterExame],
        async ({ signal, pageParam = 1 }) => {
            const { result } = (
                await Api.get<IExameResponse>(
                    `Exames/ListExamesPacientes?${
                        paramsFilterExame.statusExame
                            ? `statusExame=${paramsFilterExame.statusExame}`
                            : ''
                    }${
                        paramsFilterExame.nomePacient
                            ? `nomePaciente=${paramsFilterExame.nomePacient}`
                            : ''
                    }${
                        paramsFilterExame.nomeMedico
                            ? `nomeMedico=${paramsFilterExame.nomeMedico}`
                            : ''
                    }&page=${pageParam}&rows=5`,
                    {
                        signal,
                    },
                )
            ).data;
            return result;
            //return Array<IExame>();
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
                    message: 'Error ao consultar os exames tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useUpdateExame = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useMutation(
        (exames: IPutExame) => {
            return Api.put(
                `Exames/AtualizarExames/${exames.id_examination}`,
                exames,
            );
        },
        {
            onSuccess: () => {
                addAlert({
                    message: 'Exame alterado com sucesso!',
                    status: 'sucess',
                });
            },
            onError: (error) => {
                console.log(error);
                addAlert({
                    message: 'Error ao atualizar o exame tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const findGetExames = (idExame: number, queryClient: QueryClient) => {
    const resultExames = queryClient
        .getQueryData<InfiniteData<IExame[]>>(['exame', 'infinite'])
        ?.pages.map((item) => item)
        .flat()
        .find((elem) => elem.id_examination === idExame);

    return resultExames;
};

const useUpdateCacheExame = (
    item?: InfiniteData<IExame[]>,
    idExame?: string,
    value?: IvalueStatusExame,
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
                    if (value === 'C') {
                        elem.status = value;
                    }
                }
                return elem;
            });
        });
        return { pageParams, pages: updatePages };
    }
};

export { useExames, useUpdateCacheExame, useUpdateExame, findGetExames };
