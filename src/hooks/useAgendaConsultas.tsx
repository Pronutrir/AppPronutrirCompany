import moment from 'moment';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';

export interface IFilterConsultas {
    nM_GUERRA?: string | null;
    dS_ESPECIALIDADE?: string | null;
}

export interface IAgendaConsulta {
    nR_SEQUENCIA: number;
    cD_AGENDA: number;
    nM_PACIENTE: string;
    cD_PESSOA_FISICA: string;
    nM_PESSOA_FISICA: string;
    dT_NASCIMENTO: string;
    dT_NASCIMENTO_PAC: string;
    nM_GUERRA: string;
    dS_ESPECIALIDADE: string;
    cD_ESPECIALIDADE: number;
    nR_TELEFONE: string;
    nR_TELEFONE_CELULAR: string;
    endereco: string;
    qtD_DIAS_GERADOS: number;
    qtD_DIAS_BLOQ_FERIADOS: number;
    dT_AGENDA: string;
    nR_MINUTO_DURACAO: number;
    iE_STATUS_AGENDA: string;
    iE_CLASSIF_AGENDA: string;
    dT_ATUALIZACAO: string;
    nM_USUARIO: string;
    cD_TURNO: string;
    cD_CONVENIO: number;
    cD_PLANO: string;
    cD_CATEGORIA: string;
    dS_CONVENIO: string;
    dS_PLANO: string;
    cD_ESTABELECIMENTO: number;
    iE_DIA_SEMANA: number;
    dT_CONFIRMACAO: string;
    dT_CANCELAMENTO: string;
    nR_SEQ_FORMA_CONFIRMACAO: number;
    cD_PROCEDENCIA: number;
    nM_USUARIO_CONFIRM: string;
    counT_SVMP: number;
}

interface IResponseAgendaConsulta {
    result: IAgendaConsulta[] 
}

const useGetAgendaConsultas = (filter?: IFilterConsultas) => {
    const { addAlert } = useContext(NotificationGlobalContext);
    return useQuery(
        ['defaultTextHtml', filter],
        async ({ signal }) => {
            const {
                data: { result },
            } = await Api.get<IResponseAgendaConsulta>(
                `AgendaConsultas/FilterAgendamentosGeral/${moment().format(
                    'YYYY-MM-DD',
                )},${moment().format(
                    'YYYY-MM-DD',
                )}?pagina=1&semStatusAgenda='C'${
                    filter?.nM_GUERRA ? `&nomeMedico=${filter.nM_GUERRA}` : ''
                }${
                    filter?.dS_ESPECIALIDADE
                        ? `&descEspecialidade=${filter.dS_ESPECIALIDADE}`
                        : ''
                }&codEstabelecimento=7&rows=500&cacheKey=true&cacheName=sinaisVitais`,
                {
                    signal,
                },
            );
            return result;
        },
        {
            /* getNextPageParam: (lastPage, pages) => {
                if (lastPage?.length < 10) {
                    return null;
                } else {
                    return pages.length + 1;
                }
            }, */
            enabled: false,
            onError: () => {
                addAlert({
                    message: 'Error ao carregar as agendas, tenta mais tarde!',
                    status: 'error',
                });
            },
        },
    );
};

export { useGetAgendaConsultas };
