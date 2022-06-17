import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import AuthContext from '../contexts/auth';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';
export interface IFamiliar {
    cD_PESSOA_FISICA: string;
    iE_TIPO_PESSOA: number;
    nM_USUARIO_ORIGINAL: string;
    nM_USUARIO: string;
    nM_PESSOA_FISICA: string;
    nR_CPF: string;
    nR_SEQ_GRAU_PARENTESCO: number;
    cD_PESSOA_FAMILIA?: string;
    iE_HABITACAO: string;
    cD_PROFESSIONAL: string;
    nM_USUARIO_NREC: string;
    iE_GENDER: string;
    NR_IDENTIDADE: string;
}
interface IResponseFamiliar {
    result: IGetFamiliar[];
}
export interface IPostFamiliar {
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    nR_CPF: string;
    nR_SEQ_GRAU_PARENTESCO: number;
    iE_GENDER: string;
}
export interface IGetFamiliar {
    nR_SEQ_GRAU_PARENTESCO: number;
    cD_PESSOA_FAMILIA: string;
    cD_PESSOA_FISICA: string;
    nR_SEQUENCIA: number;
    iE_HABITACAO: string;
    nM_USUARIO: string;
    dT_ATUALIZACAO: string;
    sI_FAMILIARITY: string;
    sI_SITUATION: string;
    sI_INLAW: string;
    sI_BLOOD_TYPE: string;
    sI_RH_FACTOR: string;
    sI_KEY_PERSON: string;
    nR_SEQ_MEMBER_SUP: number;
    iE_DESCONHECIDA: string;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
    dT_DEATH: string;
    cD_OCCUPATION: number;
    iE_GENDER: string;
    qT_AGE: number;
    cD_PROFESSIONAL: string;
    nM_ACOMPANHANTE: string;
    nM_PACIENTE: string;
    nM_PROFISIONAL: string;
    dS_GRAU_PARENTESCO: string;
}
interface IFamiliarVincular {
    nR_SEQ_GRAU_PARENTESCO: number;
    cD_PESSOA_FAMILIA: string;
    cD_PESSOA_FISICA: string;
    iE_HABITACAO: string;
    iE_GENDER: string;
    nM_USUARIO: string;
    dT_ATUALIZACAO: string;
    cD_PROFESSIONAL: string;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
}

const useGetFamiliar = (codPfPaciente: string) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        'familiares',
        async () => {
            const { result } = (
                await Api.get<IResponseFamiliar>(
                    `PessoaFisicaFamilia/ListPfFamily?codPfPaciente=${codPfPaciente}&distinct=true&page=1&rows=100`,
                )
            ).data;
            return result;
        },
        {
            onError: () => {
                addAlert({
                    message:
                        'Error ao adicionar o acompanhante tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useAddFamiliar = () => {
    const { addAlert } = useContext(NotificationGlobalContext);

    const {
        stateAuth: { usertasy },
    } = useContext(AuthContext);

    return useMutation(
        async (family: IPostFamiliar) => {
            const result = (
                await Api.post<any, AxiosResponse<any, any>, IFamiliar>(
                    `PessoaFisicaFamilia/PostPfEscortFamily`,
                    {
                        cD_PESSOA_FISICA: usertasy.cD_PESSOA_FISICA,
                        iE_TIPO_PESSOA: 2,
                        nM_USUARIO_ORIGINAL: 'AppMobile',
                        nM_USUARIO: 'AppMobile',
                        nM_PESSOA_FISICA: family.nM_PESSOA_FISICA,
                        nR_CPF: family.nR_CPF.replace(/[.-]/g, ''),
                        nR_SEQ_GRAU_PARENTESCO: family.nR_SEQ_GRAU_PARENTESCO,
                        iE_HABITACAO: 'N',
                        iE_GENDER: family.iE_GENDER,
                        cD_PROFESSIONAL: usertasy.cD_PESSOA_FISICA,
                        nM_USUARIO_NREC: 'AppMobile',
                        NR_IDENTIDADE: family.nR_CPF,
                    },
                )
            ).data;
            return result;
        },
        {
            onSuccess: () => {
                addAlert({
                    message:
                        'Acompanhante adicionado com sucesso!',
                    status: 'sucess',
                });
            },
            onError: () => {
                addAlert({
                    message:
                        'Error ao adicionar  os sinais vitais tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useVincularFamiliar = () => {
    const { addAlert } = useContext(NotificationGlobalContext);

    return useMutation(
        async (family: IFamiliarVincular) => {
            const result = (
                await Api.post<any, AxiosResponse<any, any>, IFamiliarVincular>(
                    `PessoaFisicaFamilia/PostPfFamily`,
                    {
                        nR_SEQ_GRAU_PARENTESCO: family.nR_SEQ_GRAU_PARENTESCO,
                        cD_PESSOA_FAMILIA: family.cD_PESSOA_FAMILIA,
                        cD_PESSOA_FISICA: family.cD_PESSOA_FISICA,
                        iE_HABITACAO: family.iE_HABITACAO,
                        iE_GENDER: family.iE_GENDER,
                        nM_USUARIO: family.nM_USUARIO,
                        dT_ATUALIZACAO: family.dT_ATUALIZACAO,
                        cD_PROFESSIONAL: family.cD_PROFESSIONAL,
                        dT_ATUALIZACAO_NREC: family.dT_ATUALIZACAO_NREC,
                        nM_USUARIO_NREC: family.nM_USUARIO_NREC,
                    },
                )
            ).data;
            return result;
        },
        {
            onSuccess: () => {
                addAlert({
                    message:
                        'Acompanhante vinculado com sucesso!',
                    status: 'sucess',
                });
            },
            onError: () => {
                addAlert({
                    message:
                        'Error ao adicionar  os sinais vitais tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useAddFamiliar, useGetFamiliar, useVincularFamiliar };
