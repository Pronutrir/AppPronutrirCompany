import moment from 'moment';
import { useContext } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../contexts/auth';
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
  nR_SEQ_FILA_SENHA: string;
  seQ_FILAS_SENHA: number[];
  Medicos: IMedico[];
}
interface IResponseAgendaConsulta {
  result: IAgendaConsulta[];
}
export interface IMedico {
  cD_ESPECIALIDADE: number;
  dS_ESPECIALIDADE: string;
  nM_GUERRA: string;
}
export interface IResultAgendaConsultas {
  result: IAgendaConsulta[];
  medicos: IMedico[];
}

export interface IResponseAgendasPaciente {
  result: IAgendaPaciente[];
}

export interface IAgendaPaciente {
  origem: string;
  seQ_FILAS_SENHA: number[];
  cD_PESSOA_FISICA: string;
  nM_PESSOA_FISICA: string;
  dT_NASCIMENTO: string;
  dT_AGENDA: string;
  cD_MEDICO: number;
  nM_GUERRA_MEDICO: string;
  cD_ESPECIALIDADE_CD_PROTOCOLO: number;
  especialidadE_PROTOCOLO: string;
  cD_ESTABELECIMENTO: number;
  counT_SVMP: number;
}

const useAgendasPaciente = () => {
  return useQuery('agendasFullPaciente', async () => {
    const result = (
      await Api.get<IAgendaPaciente[]>('v2/AgendaConsulta/GetAgendasPaciente')
    ).data;

    console.log('result', result);

    return result;
  });
};

const useGetAgendaConsultas = (filter?: IFilterConsultas) => {
  const { addAlert } = useContext(NotificationGlobalContext);

  const {
    stateAuth: { UnidadeSelected },
  } = useContext(AuthContext);

  return useQuery(
    'agendasConsultas',
    async () => {
      const { result } = (
        await Api.get<IResponseAgendaConsulta>(
          `v1/AgendaConsultas/FilterAgendamentosGeral/${moment().format(
            'YYYY-MM-DD',
          )},${moment().format('YYYY-MM-DD')}?${filter?.nM_GUERRA ? `&nomeMedico=${filter.nM_GUERRA}` : ''
          }${filter?.dS_ESPECIALIDADE
            ? `&descEspecialidade=${filter.dS_ESPECIALIDADE}`
            : ''
          }&semStatusAgenda='C'&codEstabelecimento=${UnidadeSelected?.cD_ESTABELECIMENTO
          }&rows=500`,
        )
      ).data;

      return {
        result,
        medicos: result
          ?.map(item => {
            return {
              nM_GUERRA: item?.nM_GUERRA,
              dS_ESPECIALIDADE: item?.dS_ESPECIALIDADE,
              cD_ESPECIALIDADE: item.cD_ESPECIALIDADE,
            };
          })
          .filter(
            (item, index, array) =>
              array.findIndex(t => t.nM_GUERRA === item.nM_GUERRA) === index,
          )
          .sort((a, b) => {
            return a.nM_GUERRA < b.nM_GUERRA
              ? -1
              : a.nM_GUERRA > b.nM_GUERRA
                ? 1
                : 0;
          }),
      };
    },
    {
      //enabled: false,
      staleTime: 60 * 30000, // 1H
      onError: () => {
        addAlert({
          message: 'Error ao carregar as agendas, tentar mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

export { useGetAgendaConsultas, useAgendasPaciente };
