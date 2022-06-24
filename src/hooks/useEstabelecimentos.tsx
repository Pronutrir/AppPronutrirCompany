import { useContext } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../contexts/auth';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';

export interface IUnidade {
    cD_ESTABELECIMENTO: number;
    dS_ESTABELECIMENTO: string;
    cD_SETOR_PADRAO: number;
    dT_ATUALIZACAO: string;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO: string;
    nM_USUARIO_NREC: string;
    nM_USUARIO_PARAM: string;
    nR_SEQ_PERFIL: number;
    nR_SEQ_SIGNATURE_ENTITY: number;
}

interface IReponseUnidades {
    result: IUnidade[];
}

interface refactoreUnidades {
    label: string;
    value: IUnidade;
}

const useUnidades = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    const { stateAuth: { usertasy } } = useContext(AuthContext);

    return useQuery(
        'unidades',
        async () => {
            const { result } = (
                await Api.get<IReponseUnidades>(
                    `UsuarioEstabelecimento/FiltrarUsuarioEstabCodUsuarioNumSeqGeral?nomeUsuarioParam=${usertasy.usuariO_FUNCIONARIO_PERFIL[0].nM_USUARIO}&page=1&rows=50`,
                )
            ).data;

            const resultFilter = result?.map((item) => {
                return {
                    label: item.dS_ESTABELECIMENTO.replace('PRONUTRIR ', '').replace('- ', ''),
                    value: item,
                };
            });

            const orderByResult = resultFilter.sort(function (a, b) {
                return a.value.dS_ESTABELECIMENTO < b.value.dS_ESTABELECIMENTO
                    ? -1
                    : a.value.dS_ESTABELECIMENTO > b.value.dS_ESTABELECIMENTO
                    ? 1
                    : 0;
            });

            return orderByResult;
        },
        {
            //enabled: false,
            staleTime: 60 * 30000, // 30 minuto
            onError: () => {
                addAlert({
                    message:
                        'Error ao carregar os estabelecimentos, tenta mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useUnidades };
