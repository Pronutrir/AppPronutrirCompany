import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';
export interface IEvolucao {
    dT_EVOLUCAO?: string;
    iE_TIPO_EVOLUCAO?: number;
    iE_SITUACAO?: string;
    cD_MEDICO?: string;
    dT_ATUALIZACAO?: string;
    nM_USUARIO?: string;
    cD_PESSOA_FISICA?: string;
    dS_EVOLUCAO?: string;
}
export interface ITextDefaultResponse {
    result: ITextDefault[];
}
export interface ITextDefault {
    nR_SEQUENCIA: number;
    nR_SEQ_ITEM_PRONT: number;
    dS_TITULO: string;
    nM_USUARIO: string;
    dT_ATUALIZACAO: string;
    iE_PERMITE_ALTERAR_TEXTO: string;
    dS_TEXTO: string;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
}
export interface IEvolucaoHistoryResponse {
    result: IEvolucaoHistory[];
}

export interface IEvolucaoFilterHistoryResponse {
    result: IEvolucaoHistory;
}
export interface IEvolucaoHistory {
    cD_EVOLUCAO: number;
    dT_EVOLUCAO: string;
    iE_TIPO_EVOLUCAO: string;
    cD_PESSOA_FISICA: string;
    nM_PACIENTE: string;
    dT_ATUALIZACAO: string;
    nM_USUARIO: string;
    dS_EVOLUCAO: string;
    cD_MEDICO: string;
    nM_PROFISSIONAL: string;
    dT_LIBERACAO: string;
    qT_SUPERF_CORPORIA: number;
    iE_RECEM_NATO: string;
    iE_SITUACAO: string;
    iE_AVALIADOR_AUX: string;
    iE_RESTRICAO_VISUALIZACAO: string;
    qT_CARACTERES: number;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
    iE_RELEV_RESUMO_ALTA: string;
    iE_NIVEL_ATENCAO: string;
    dS_UTC: string;
    pepImagem: [];
    medicosEvolucao: [];
    especialidadeMedicasEvolucao: [];
}
export interface ItipoNotas {
    cD_TIPO_EVOLUCAO: string;
    iE_ATEND_FECHADO: string;
    dT_ATUALIZACAO: string;
    dS_TIPO_EVOLUCAO: string;
    iE_SITUACAO: string;
    nM_USUARIO: string;
    iE_REGRA_ALTA: string;
    iE_EVOLUCAO_SUSCDS: string;
    iE_NOTACAO_CLINICA_AGEND_GRUPO: string;
    dT_ATUALIZACAO_NREC: string;
    nM_USUARIO_NREC: string;
    dS_LEGENDA: string;
    iE_GERA_LANCTO_AUTO: string;
}
export interface ItipoNotasResponse {
    result: ItipoNotas[];
}
interface IEvolucaoliberacao {
    cD_EVOLUCAO: number;
    nM_USUARIO: string;
}

const useAddEvoluçaoEnfermagem = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useMutation(
        (item: IEvolucao) => {
            return Api.post(`EvolucaoPaciente/PostEvolucaoPaciente`, item);
        },
        {
            onSuccess: () => {
                addAlert({
                    message: 'Evolução adicionada com sucesso!',
                    status: 'sucess',
                });
            },
            onError: () => {
                addAlert({
                    message: 'Error ao adicionar a evolução tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useUpdateEvoluçaoEnfermagem = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useMutation(
        (item: IEvolucaoHistory) => {
            return Api.put(`EvolucaoPaciente/PutEvolucaoPaciente/${item.cD_EVOLUCAO}`, item);
        },
        {
            onSuccess: () => {
                addAlert({
                    message: 'Evolução atualizada com sucesso!',
                    status: 'sucess',
                });
            },
            onError: () => {
                addAlert({
                    message: 'Error ao adicionar a evolução tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useDeleteEvoluçaoEnfermagem = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useMutation(
        (idEvolucao: number) => {
            return Api.delete(
                `EvolucaoPaciente/DeleteEvolucaoPaciente/${idEvolucao}`,
            );
        },
        {
            onSuccess: () => {
                addAlert({
                    message: 'Evolução excluída com sucesso!',
                    status: 'sucess',
                });
            },
            onError: () => {
                addAlert({
                    message: 'Error ao excluir a evolução tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useNotasClinicas = () => {
    return useQuery('tiposNotas', async () => {
        const {
            data: { result },
        } = await Api.get<ItipoNotasResponse>(
            `TipoEvolucao/ListarTiposEvolucoes?pagina=1&rows=100`,
        );
        return result.map((item) => {
            return { label: item.dS_TIPO_EVOLUCAO, itemEvolucao: item };
        });
    });
};

const useEvolucaoTextDefaultReduzidos = (cD_TIPO_EVOLUCAO?: string) => {
    return useQuery(
        'defaltText',
        async () => {
            const {
                data: { result },
            } = await Api.get<ITextDefaultResponse>(
                `TextoPadrao/ListarTextosPadroesInstituicaoReduzidos?codNotasClinicas=${cD_TIPO_EVOLUCAO}&pagina=1&rows=100`,
            );
            return result.map((item) => {
                return { label: item.dS_TITULO, value: item };
            });
        },
        { enabled: Boolean(cD_TIPO_EVOLUCAO) },
    );
};

const useEvolucaoTextDefault = (value: number | null) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        ['defaultTextHtml', value],
        async () => {
            const {
                data: { result },
            } = await Api.get<ITextDefaultResponse>(
                `TextoPadrao/ListarTextosPadroesInstituicao?nrSequencia=${
                    value ? value : 0
                }`,
            );
            return result[0];
        },
        {
            onError: () => {
                addAlert({
                    message:
                        'Error ao listar os textos padroes tenta mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useHistoryEvolucao = (codMedico: string) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        ['historyEvolucao', codMedico],
        async () => {
            const {
                data: { result },
            } = await Api.get<IEvolucaoHistoryResponse>(
                `EvolucaoPaciente/ListarEvolucaoPaciente?codMedico=${codMedico}`,
            );
            return result;
        },
        {
            onError: () => {
                addAlert({
                    message:
                        'Error ao listar os textos padrões tenta mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useFilterHistoryEvolucao = (idEvolucao: number) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        ['FilterHistoryEvolucao', idEvolucao],
        async () => {
            const {
                data: { result },
            } = await Api.get<IEvolucaoFilterHistoryResponse>(
                `EvolucaoPaciente/FiltraEvolucaoPacientePorId/${idEvolucao}`,
            );
            return result;
        },
        {
            onError: () => {
                addAlert({
                    message:
                        'Error ao listar os textos padrões tenta mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

const useLiberarEvolucao = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useMutation(
        (Evolucao: IEvolucaoliberacao) => {
            return Api.put(
                `EvolucaoPaciente/LiberarEvolucaoPaciente/${Evolucao.cD_EVOLUCAO}`, Evolucao,
            );
        },
        {
            onSuccess: () => {
                addAlert({
                    message: 'Evolução Liberar com sucesso!',
                    status: 'sucess',
                });
            },
            onError: () => {
                addAlert({
                    message: 'Error ao Liberar a evolução tente mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export {
    useAddEvoluçaoEnfermagem,
    useUpdateEvoluçaoEnfermagem,
    useEvolucaoTextDefault,
    useHistoryEvolucao,
    useNotasClinicas,
    useEvolucaoTextDefaultReduzidos,
    useDeleteEvoluçaoEnfermagem,
    useLiberarEvolucao,
    useFilterHistoryEvolucao,
};
