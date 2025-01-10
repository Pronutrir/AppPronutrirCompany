import { useMutation, useQuery } from 'react-query';
import Api from '../services/api';
import { useContext } from 'react';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import ApiNotify from '../services/apiNotify';
import moment from 'moment';
export interface IPropsListStopwatch {
  result: {
    agendados: IAgendaPacientStopWatchH;
    acolhimento: IOptionsStopWatchH;
    recepcao: IOptionsStopWatchH;
    triagem: IOptionsStopWatchH;
    farmacia: IOptionsStopWatchHFarmacia;
    acomodacao: IOptionsStopWatchH;
    pre_Tratamento: IOptionsStopWatchH;
    tratamento: IOptionsStopWatchH;
    durationPatients: IDurationsPatients;
  };
}

export interface IListStopwatch {
  agendados: IAgendaPacientStopWatchH;
  acolhimento: IOptionsStopWatchH;
  recepcao: IOptionsStopWatchH;
  triagem: IOptionsStopWatchH;
  farmacia: IOptionsStopWatchHFarmacia;
  acomodacao: IOptionsStopWatchH;
  pre_Tratamento: IOptionsStopWatchH;
  tratamento: IOptionsStopWatchH;
  durationPatients: IDurationsPatients;
  stopWatchHCancel: AtendimentosStopWatchH[];
}

export interface AtendimentosStopWatchH {
  nR_ATENDIMENTO: number,
  cD_PESSOA_FISICA: string,
  nM_PESSOA_FISICA: string,
  cD_ESTABELECIMENTO: number,
  dT_ENTRADA: string,
  nM_USUARIO: string,
  cD_MEDICO_RESP: number,
  dT_CANCELAMENTO: string,
  nM_USUARIO_CANCELAMENTO: string,
  dS_MOTIVO_CANCEL: string,
}
interface DefaultOptionsStopWatchH {
  count: number;
}
interface IPercentsStopWatchH {
  positive: number;
  negative: number;
}
interface IOptionsStopWatchH extends DefaultOptionsStopWatchH {
  percent: IPercentsStopWatchH;
  patients: IQuimioterapiaStopwatchH[];
}
interface IOptionsStopWatchHFarmacia {
  satelite: IOptionsStopWatchH;
  producao: IOptionsStopWatchH;
}
export interface IAgendaPacientStopWatchH extends DefaultOptionsStopWatchH {
  listAgendaQuimioterapia: AgendaQtItens[];
}

export interface AgendaQtItens {
  nR_SEQUENCIA: number,
  cD_PESSOA_FISICA: string,
  dT_AGENDA: string,
  cD_ESTABELECIMENTO: number,
  dT_CONFIRMACAO: string,
  paciente: string,
  dS_ABREV: string
}
interface IDurationsPatients extends DefaultOptionsStopWatchH {
  patients: PatientsStopWatchH[];
}
export interface IQuimioterapiaStopwatchH {
  nR_SEQ_PACIENTE: number;
  cod: string;
  paciente: string;
  protocolo: string;
  qT_TEMPO_MEDICACAO: number;
  dS_LOCAL: string;
  dT_REAL: string;
  dT_ACOLHIMENTO: string;
  margeM_AC: string;
  miN_ATRASO_AC: number;
  interV_AC_RE: number;
  dT_CHEGADA: string;
  margeM_RE: string;
  miN_ATRASO_RE: number;
  interV_RE_TR: number;
  dT_INICIO_TRIAGEM: string;
  dT_FIM_TRIAGEM: string;
  dT_APTO: string;
  margeM_TR: string;
  miN_ATRASO_TR: number;
  interV_TR_I_AC: number;
  dT_ACOMODACAO: string;
  iE_PRE_MEDICACAO: number;
  margeM_TR_FA_SAT: string;
  miN_ATRASO_TR_FA_SAT: number;
  interV_TR_FA_SAT: number;
  dT_FA_SAT: string;
  margeM_TR_FA: string;
  miN_ATRASO_TR_FA: number;
  interV_TR_FA: number;
  dT_FA_PROD: string;
  margeM_FA_SAT_TT: string;
  miN_ATRASO_FA_SAT_TT: number;
  interV_FA_SAT_TT: number;
  dT_RECEBIMENTO_FAR_SAT: string;
  margeM_FA_TT: string;
  miN_ATRASO_FA_TT: number;
  interV_FA_TT: number;
  dT_FARMACIA: string;
  interV_TR_F_TT: number;
  margeM_TT: string;
  miN_ATRASO_TT: number;
  interV_ENF_TT: number;
  interV_CH_AL: number;
  ac: boolean;
  re: boolean;
  tr: boolean;
  fA_SAT: boolean;
  fa: boolean;
  tt: boolean;
  margem: string;
}
export interface PatientsStopWatchH {
  nR_SEQ_PACIENTE: number;
  paciente: string;
  dT_ACOLHIMENTO: string;
  dT_ALTA: string;
  duration: number;
  protocolo: string;
}
export interface IPostMotivoAtraso {
  cod_PF: number;
  nr_sequencia: number;
  nomePF: string;
  title: string;
  body: string;
  re?: boolean;
  tr?: boolean;
  FaSat?: boolean;
  fa?: boolean;
  PreTt?: boolean;
  tt?: boolean;
  defaultMsn?: boolean;
}

const useListStopwatch = (estabelecimento: number) => {
  return useQuery(
    'ListStopwatch',
    async () => {
      return (
        await Api.get<IPropsListStopwatch>(
          `StopWatchH/ListStopwatchH?estabelecimento=${estabelecimento}&notifySend=true&orderBy=ASC&page=1&rows=1000`,
        )
      ).data.result;
    },
    {
      refetchInterval: 1000 * 10,
    },
  );
};

const useListStopwatchDefaultMsn = (setor: string) => {
  return useQuery('DefaultMsn', async () => {
    return (
      await ApiNotify.get<IPostMotivoAtraso[]>(
        `ReasonDelay/ListarMotivosAtrasosPorSetor?setorParam=${setor}&msnPadrao=true`,
      )
    ).data;
  });
};

const useStopWatchMotivoAtraso = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IPostMotivoAtraso) => {
      return ApiNotify.post('ReasonDelay', item);
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Motivo de atraso enviado com sucesso!',
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

const useListStopwatchAtrados = (setor: string) => {
  return useQuery(setor, async () => {
    return (
      await ApiNotify.get<IPostMotivoAtraso[]>(
        `ReasonDelay/ListarMotivosAtrasosPorSetor?setorParam=${setor}&dataRegistro=${moment().format(
          'YYYY-MM-DD',
        )}`,
      )
    ).data;
  });
};

export {
  useListStopwatch,
  useStopWatchMotivoAtraso,
  useListStopwatchDefaultMsn,
  useListStopwatchAtrados,
};
