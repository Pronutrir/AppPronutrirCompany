import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
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
  dS_OBSERVACAO?: string;
}
export interface IFilterSinaisVitais {
  dataInicio?: string | null;
  dataFinal?: string | null;
  pagina?: number | null;
  rows?: number | null;
  status?: string | null;
  nomePaciente?: string | null;
  cdPaciente?: string | null;
}
export interface IFilterSinaisVitaisProfissional {
  dataInicio: string | null;
  dataFinal: string | null;
  pagina?: number | null;
  rows?: number | null;
  cd_pessoa_fisica: string;
}
export interface IPropsEscalaFlebitePost {
  dT_ATUALIZACAO: string;
  nM_USUARIO: string;
  dT_ATUALIZACAO_NREC: string;
  nM_USUARIO_NREC: string;
  dT_AVALIACAO: string;
  nR_ATENDIMENTO: number;
  cD_PROFISSIONAL: string;
  iE_SITUACAO: string;
  iE_INTENSIDADE: string;
}

export interface IRegraSinaisVitais {
  nR_SEQUENCIA: number;
  nM_ATRIBUTO: string;
  qT_MINIMO: number;
  vL_MAXIMO: number;
  dS_MENSAGEM_ALERTA: string;
  dT_ATUALIZACAO: string;
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
        `v1/SinaisVitaisMonitoracaoGeral/RecuperaDadosRecentesSVMGListagem/${moment().format(
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
          message: 'Error ao listar os sinais vitais tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useSinaisVitaisFilter = (filter: IFilterSinaisVitaisProfissional) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useInfiniteQuery(
    ['AlertaPacienteHistory', filter],
    async ({ pageParam = 1 }) => {
      const {
        data: { result },
      } = await Api.get<ResponsePFdados>(
        `v1/SinaisVitaisMonitoracaoGeral/HistoricoSVMPProfissionalGeral/${filter.cd_pessoa_fisica
        }${`,${moment(filter.dataInicio).format(
          'YYYY-MM-DD',
        )}`}${`,${filter.dataFinal}`}?pagina=${pageParam}&rows=${filter.rows ?? 10
        }`,
      );
      return result.filter(item => item.iE_SITUACAO != 'I');
    },
    {
      enabled: true,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length < 10) {
          return null;
        } else {
          return pages.length + 1;
        }
      },
      onError: () => {
        addAlert({
          message: 'Não foi possivel acessar o histórico tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useSinaisVitaisHistory = (filter: IFilterSinaisVitais) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    ['SinaisVitaisHistory', filter.cdPaciente],
    async () => {
      const {
        data: { result },
      } = await Api.get<ResponsePFdados>(
        `v1/SinaisVitaisMonitoracaoGeral/ListarTodosDadosSVMGPaciente?dataInicio${filter.dataInicio ? `=${filter.dataInicio}` : ''
        }&dataFinal${filter.dataFinal ? `=${filter.dataFinal}` : ''}&pagina=${filter.pagina ?? 1
        }&rows=${filter.rows ?? 100}&status${filter.status ? `=${filter.status}` : ''
        }&nomePaciente${filter.nomePaciente ? `=${filter.nomePaciente}` : ''
        }&cdPaciente${filter.cdPaciente ? `=${filter.cdPaciente}` : ''}`,
      );
      return result
        .sort((a, b) => {
          return a?.dT_SINAL_VITAL > b.dT_SINAL_VITAL
            ? -1
            : a.dT_SINAL_VITAL < b.dT_SINAL_VITAL
              ? 1
              : 0;
        })
        .filter(item => item.iE_SITUACAO != 'I');
    },
    {
      onError: error => {
        addAlert({
          message: 'Error ao listar os sinais vitais tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const _useSinaisVitaisHistory = (filter: IFilterSinaisVitais) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useInfiniteQuery(
    ['SinaisVitaisHistory', filter],
    async ({ pageParam = 1 }) => {
      const {
        data: { result },
      } = await Api.get<ResponsePFdados>(
        `v1/SinaisVitaisMonitoracaoGeral/ListarTodosDadosSVMGPaciente?dataInicio${filter.dataInicio
          ? `=${moment(filter.dataInicio).format('YYYY-MM-DD')}`
          : ''
        }&dataFinal${filter.dataFinal ? `=${filter.dataFinal}` : ''
        }&pagina=${pageParam}&rows=${filter.rows ?? 10}&status${filter.status ? `=${filter.status}` : ''
        }&nomePaciente${filter.nomePaciente ? `=${filter.nomePaciente}` : ''
        }&cdPaciente${filter.cdPaciente ? `=${filter.cdPaciente}` : ''}`,
      );
      return result.filter(item => item.iE_SITUACAO != 'I');
    },
    {
      enabled: true,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length < 10) {
          return null;
        } else {
          return pages.length + 1;
        }
      },
      onError: error => {
        addAlert({
          message: 'Error ao listar os sinais vitais tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useScalaFlebitePost = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IPropsEscalaFlebitePost) => {
      return Api.post('v1/EscalaFlebite/PostEscalaFlebite', item);
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Dados enviado com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao enviar tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

const useGetRegraSinaisVitais = () => {
  return useQuery<IRegraSinaisVitais[]>(
    'RegraSinaisVitais',
    async () => {
      const result = (await Api.get('v2/SinaisVitais/GetRegrasSinaisVitais')).data;
      return result;
    },
    {
      onError: () => {
        console.log('Error ao listar as regras sinais vitais tente mais tarde!');
      }
    },
  );
}

export {
  useSinaisVitaisAll,
  useSinaisVitaisHistory,
  _useSinaisVitaisHistory,
  useSinaisVitaisFilter,
  useScalaFlebitePost,
  useGetRegraSinaisVitais
};
