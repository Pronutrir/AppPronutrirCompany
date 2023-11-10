import { useQuery } from 'react-query';
import Api from '../services/api';

export interface IPropsListStopwatch {
  result: {
    agendados: IPropsAgendaStopwatch[];
    total: number;
    acolhimento: IPropsInforStopwatch;
    recepcao: IPropsInforStopwatch;
    triagem: IPropsInforStopwatch;
    farmacia_Interno: {
      satelite: IPropsInforStopwatch;
      producao: IPropsInforStopwatch;
    };
    farmacia: {
      satelite: IPropsInforStopwatch;
      producao: IPropsInforStopwatch;
    };
    acomodacao: IPropsInforStopwatch;
    tratamento: IPropsInforStopwatch;
    durationPatients: {
      values: IPropsPacienteInfor[];
    };
    statusCode: number;
    message: string;
  };
}

export interface IPropsAgendaStopwatch {
  nR_SEQUENCIA: number;
  cD_PESSOA_FISICA: string;
  dT_AGENDA: string;
  cD_ESTABELECIMENTO: number;
  paciente: string;
  dS_ABREV: string;
}

export interface IPropsInforStopwatch {
  count: number;
  percent: {
    positive: number;
    negative: number;
  };
  patients: IPropsPacienteStopwatch[];
}

export interface IPropsPacienteInfor {
  nR_SEQ_PACIENTE: number;
  cod: string;
  paciente: string;
  dT_ACOLHIMENTO: string;
  dT_ALTA: string;
  duration: number;
  protocolo: string;
}

export interface IPropsPacienteStopwatch {
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

const useListStopwatch = () => {
  return useQuery('serverDataHour', async () => {
    return (
      await Api.get<IPropsListStopwatch>(
        'StopWatchH/ListStopwatchH?estabelecimento=7&notifySend=true&orderBy=ASC&page=1&rows=1000',
      )
    ).data;
  });
};

export { useListStopwatch };
