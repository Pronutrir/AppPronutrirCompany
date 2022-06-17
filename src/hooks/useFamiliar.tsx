import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import AuthContext from '../contexts/auth';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';

interface IFamiliar {
    cD_PESSOA_FISICA: string;
    iE_TIPO_PESSOA: number;
    nM_USUARIO_ORIGINAL: string;
    nM_USUARIO: string;
    nM_PESSOA_FISICA: string;
    nR_CPF: string;
    nR_SEQ_GRAU_PARENTESCO: 2;
    cD_PESSOA_FAMILIA?: string;
    iE_HABITACAO: string;
    cD_PROFESSIONAL: string;
    nM_USUARIO_NREC: string;
    iE_GENDER: string;
}

export interface IPostFamiliar {
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    nR_CPF: string;
    //cD_PESSOA_FAMILIA: string;
    iE_GENDER: string;
}

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
                        cD_PESSOA_FISICA: '159969',
                        iE_TIPO_PESSOA: 2,
                        nM_USUARIO_ORIGINAL: 'AppMobile',
                        nM_USUARIO: 'AppMobile',
                        //dT_CADASTRO_ORIGINAL: 'string',
                        //dT_ATUALIZACAO: 'string',
                        nM_PESSOA_FISICA: family.nM_PESSOA_FISICA,
                        //dT_NASCIMENTO: 'string',
                        nR_CPF: family.nR_CPF.replace(/[.-]/g, ''),
                        nR_SEQ_GRAU_PARENTESCO: 2,
                        //cD_PESSOA_FAMILIA: "159969",
                        iE_HABITACAO: 'N',
                        iE_GENDER: family.iE_GENDER,
                        cD_PROFESSIONAL: usertasy.cD_PESSOA_FISICA,
                        //dT_ATUALIZACAO_NREC: 'string',
                        nM_USUARIO_NREC: 'AppMobile',
                    },
                )
            ).data;
            return result;
        },
        {
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

export { useAddFamiliar };
