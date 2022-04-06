import { useQuery } from 'react-query';
import moment from 'moment';
import Api from '../services/api';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import { useContext } from 'react';
interface ResponsePFdados {
    result: ISinaisVitais[];
}

export interface ISinaisVitais {
    nR_SEQUENCIA: number;
    nR_ATENDIMENTO?: number;
    dT_SINAL_VITAL: string;
    dT_ATUALIZACAO?: string;
    iE_PRESSAO?: string;
    iE_MEMBRO?: string;
    iE_MANGUITO?: string;
    iE_APARELHO_PA?: string;
    iE_PA_INAUDIVEL?: string;
    qT_PA_SISTOLICA?: number;
    qT_PA_DIASTOLICA?: number;
    qT_PAM?: number;
    qT_FREQ_CARDIACA?: number;
    qT_FREQ_RESP?: number;
    cD_ESCALA_DOR?: string;
    qT_ESCALA_DOR?: number;
    cD_PACIENTE?: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO?: string;
    cD_PESSOA_FISICA?: string;
    qT_SATURACAO_O2?: number;
    iE_COND_SAT_O2?: string;
    iE_MEMBRO_SAT_O2?: string;
    iE_RITMO_ECG?: string;
    iE_DECUBITO?: string;
    qT_TEMP?: number;
    qT_PESO?: number;
    iE_UNID_MED_PESO?: string;
    qT_ALTURA_CM?: number;
    iE_UNID_MED_ALTURA?: string;
    qT_SUPERF_CORPORIA?: number;
    qT_IMC?: number;
    dS_UTC?: string;
    dS_UTC_ATUALIZACAO?: string;
    dT_LIBERACAO?: string;
    iE_SITUACAO?: string;
    cD_ESTABELECIMENTO?: number;
    nM_USUARIO?: string;
    nM_USUARIO_NREC?: string;
    dT_ATUALIZACAO_NREC?: string;
}

const initialSinaisVitais: ISinaisVitais[] = [
    {
        nR_SEQUENCIA: 101676,
        nR_ATENDIMENTO: 136070,
        dT_SINAL_VITAL: '2022-04-06T08:31:27',
        dT_ATUALIZACAO: '2022-04-06T08:31:27',
        iE_PRESSAO: 'D',
        iE_MEMBRO: 'MSE',
        iE_MANGUITO: 'C',
        iE_APARELHO_PA: 'C',
        qT_PA_SISTOLICA: 130,
        qT_PA_DIASTOLICA: 80,
        qT_PAM: 97,
        qT_FREQ_CARDIACA: 67,
        qT_FREQ_RESP: 20,
        cD_ESCALA_DOR: 'FEVA',
        qT_ESCALA_DOR: 0,
        cD_PACIENTE: '216046',
        nM_PESSOA_FISICA: 'ADALBERTO DE JESUS DOREA',
        dT_NASCIMENTO: '0001-01-01T00:00:00',
        cD_PESSOA_FISICA: '214920',
        qT_SATURACAO_O2: 99,
        iE_COND_SAT_O2: 'AA',
        iE_MEMBRO_SAT_O2: 'MSE',
        iE_RITMO_ECG: '1',
        iE_DECUBITO: 'DDH',
        qT_PESO: 74.4,
        iE_UNID_MED_PESO: 'Kg',
        qT_ALTURA_CM: 170,
        iE_UNID_MED_ALTURA: 'cm',
        qT_SUPERF_CORPORIA: 1.85,
        qT_IMC: 25.7,
        dS_UTC: '06/04/2022T08:31:27-03:00',
        dS_UTC_ATUALIZACAO: '06/04/2022T08:31:27-03:00',
        dT_LIBERACAO: '2022-04-06T08:31:27',
        iE_SITUACAO: 'A',
        nM_USUARIO: 'AppMobile',
    },
];

const useSinaisVitaisAll = () => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        'SinaisVitaisAll',
        async () => {
            const {
                data: { result },
            } = await Api.get<ResponsePFdados>(
                `SinaisVitaisMonitoracaoGeral/RecuperaDadosRecentesSVMGListagem/${moment().format(
                    'YYYY-MM-DD',
                )},${moment().format('YYYY-MM-DD')}`,
            );
            return result.sort((a, b) => {
                return a?.dT_SINAL_VITAL < b.dT_SINAL_VITAL
                    ? -1
                    : a.dT_SINAL_VITAL > b.dT_SINAL_VITAL
                    ? 1
                    : 0;
            });
        },
        {
            placeholderData: initialSinaisVitais,
            onError: () => {
                addAlert({
                    message: 'Error ao Atualizar os sinais vitais',
                    status: 'error',
                });
            },
        },
    );
};

const useSinaisVitaisHistory = (paciente: string) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        'SinaisVitaisHistory',
        async () => {
            const {
                data: { result },
            } = await Api.get<ResponsePFdados>(
                `SinaisVitaisMonitoracaoGeral/ListarTodosDadosSVMGPaciente/${paciente}`,
            );
            return result.sort((a, b) => {
                return a?.dT_SINAL_VITAL < b.dT_SINAL_VITAL
                    ? -1
                    : a.dT_SINAL_VITAL > b.dT_SINAL_VITAL
                    ? 1
                    : 0;
            });
        },
        {
            onError: () => {
                addAlert({
                    message: 'Error ao Atualizar os sinais vitais',
                    status: 'error',
                });
            },
        },
    );
};

export { useSinaisVitaisAll, useSinaisVitaisHistory };
