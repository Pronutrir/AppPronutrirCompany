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
interface IEvolucaoHistoryResponse {
    result: IEvolucaoHistory[];
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

const useAddEvoluçaoEnfermagem = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useMutation(
        (item: IEvolucao) => {
            return Api.post(`EvolucaoPaciente/PostEvolucaoPaciente`, item);
        },
        {
            onError: () => {
                addAlert({
                    message: 'Error ao adicionar a evolução tente mais tarde!',
                    status: 'error',
                });
            },
        },
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
                        'Error ao listar os textos padroes tenta mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useAddEvoluçaoEnfermagem, useEvolucaoTextDefault, useHistoryEvolucao };
