import { useContext } from 'react';
import { useQuery } from 'react-query';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';

interface IUnidade {
    cD_CGC: string;
    dS_RAZAO_SOCIAL: string;
    nM_FANTASIA: string;
    cD_CEP: string;
    nR_ENDERECO: string;
    dS_ENDERECO: string;
    dS_BAIRRO: string;
    dS_MUNICIPIO: string;
    sG_ESTADO: string;
    dT_ATUALIZACAO: string;
    nM_USUARIO: string;
    nR_DDD_TELEFONE: string;
    nR_TELEFONE: string;
    cD_TIPO_PESSOA: number;
    iE_PROD_FABRIC: string;
    iE_SITUACAO: string;
    cD_ESTABELECIMENTO: number;
    label: string;
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

    return useQuery(
        'unidades',
        async () => {
            const { result } = (
                await Api.get<IReponseUnidades>(
                    'Estabelecimentos/listarEstabelecimentos',
                )
            ).data;

            const resultFilter = result?.map((item) => {
                return {
                    label: item.nM_FANTASIA.replace('PRONUTRIR ', ''),
                    value: item,
                };
            });

            const orderByResult = resultFilter.sort(function (a, b) {
                return a.value.dS_MUNICIPIO < b.value.dS_MUNICIPIO
                    ? -1
                    : a.value.dS_MUNICIPIO > b.value.dS_MUNICIPIO
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
                    message: 'Error ao carregar as agendas, tenta mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useUnidades };
