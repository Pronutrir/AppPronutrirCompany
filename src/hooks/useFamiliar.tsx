import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';
export interface IFamiliar {
    cod_Grau_Parentesco: number;
    cod_Pf_Familiar: number;
    cod_Pf_Paciente: string;
    cod_Pf_Profissional: string;
    nm_Usuario: string;
    nm_Usuario_Reg: string;
    desc_Grau_Parentesco: string;
    dt_Atualizacao: string;
    dt_Registro: string;
    id_Familiar: number;
    ie_Sexo: string;
    ie_Situacao: string;
    nm_Paciente: string;
    nm_Profissional: string;
    pessoaFisicaSimplificadoSqlServer: IFamiliarSimples;
}
export interface IFamiliarSimples {
    dt_Atualizacao?: string;
    dt_Registro?: string;
    id_Pessoa_Fisica?: 1;
    nm_Pessoa_Fisica?: string;
    dt_Nascimento?: string;
    nr_CPF?: string;
    nr_Identidade?: string;
}
interface IResponseFamiliar {
    result: IFamiliar[];
    statusCode: number;
    message: string;
}
export interface IPostFamiliar {
    nm_Pessoa_Fisica: string;
    dt_Nascimento: string;
    nr_CPF?: string | null;
    nr_Identidade?: string | null;
    nr_Ddd?: string | null;
    nr_Telefone_Celular?: string | null;
    nm_Usuario?: string | null;
    nm_Usuario_Reg?: string | null;
    cod_Grau_Parentesco?: number | null;
    cod_Pf_Familiar?: number | null;
    cod_Pf_Paciente?: string | null;
    cod_Pf_Profissional?: string | null;
    ie_Sexo?: string | null;
}
interface IFamiliarVincularPost {
    cod_Grau_Parentesco?: number;
    cod_Pf_Familiar: number;
    cod_Pf_Paciente: string;
    cod_Pf_Profissional: string;
    nm_Usuario: string;
    nm_Usuario_Reg?: string;
    dt_Atualizacao?: string;
    dt_Registro?: string;
    ie_Situacao?: string;
    ie_Sexo?: string;
}

const useGetFamiliar = (codPfPaciente: string) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        ['familiares', codPfPaciente],
        async () => {
            const { result } = (
                await Api.get<IResponseFamiliar>(
                    `PessoaFisicaFamiliaSqlServer/ListPfFamilySql?codPfPaciente=${codPfPaciente}&distinct=true&page=1&rows=100`,
                )
            ).data;
            return result;
        },
        {
            /* enabled: false, */
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

    return useMutation(
        async (family: IPostFamiliar) => {
            const result = (
                await Api.post<any, AxiosResponse<any, any>, IPostFamiliar>(
                    `PessoaFisicaFamiliaSqlServer/PostPfEscortFamilySql`,
                    family,
                )
            ).data;
            return result;
        },
        {
            onSuccess: (dataResult) => {
                const { MSG } = dataResult;
                if (
                    MSG ===
                    'A Pessoa fisica já possui cadastro na base de dados!'
                ) {
                    return;
                } else {
                    addAlert({
                        message: 'Acompanhante adicionado com sucesso!',
                        status: 'sucess',
                    });
                }
            },
            onError: (error) => {
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
        async (family: IFamiliarVincularPost) => {
            const result = (
                await Api.post<
                    any,
                    AxiosResponse<any, any>,
                    IFamiliarVincularPost
                >(`PessoaFisicaFamiliaSqlServer/PostPfFamilySql`, family)
            ).data;
            return result;
        },
        {
            onSuccess: () => {
                addAlert({
                    message: 'Acompanhante vinculado com sucesso!',
                    status: 'sucess',
                });
            },
            onError: (error) => {
                console.log(error);
                addAlert({
                    message:
                        'Error ao vincular os sinais vitais tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useAddFamiliar, useGetFamiliar, useVincularFamiliar };
