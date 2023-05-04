import moment from 'moment';
import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import AuthContext from '../contexts/auth';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';
export interface IAgendaQT {
  //DT_PREVISTA: string;
  nR_ATENDIMENTO: number;
  dT_REAL: string;
  cD_PESSOA_FISICA: string;
  nM_PESSOA_FISICA: string;
  dT_NASCIMENTO: string;
  cD_ESTABELECIMENTO: number;
  cD_MEDICO_RESP: number;
  dT_INICIO_ADM: string;
  dT_FIM_ADM: string;
  //DS_DIA_CICLO: string;
  //QT_PESO: string;
  //QT_ALTURA: number;
  //QT_SUPERF_CORPORAL: number;
  //DT_PREVISTA_1: string;
  //DT_REAL_1: string;
  //NR_SEQ_PACIENTE: number;
  //PROTOCOLO: string;
  //NM_MEDICACAO: string;
}
const selectedSetor = (cod_estabelecimento?: number) => {
  switch (cod_estabelecimento) {
    case 7:
      return 75;
    case 8:
      return 78;
    case 12:
      return 87;
    default:
      return 75;
  }
};
interface IResponseAgendaQt {
  result: IAgendaQT[];
}
const useGetAgendasQt = () => {
  const { addAlert } = useContext(NotificationGlobalContext);

  const {
    stateAuth: { UnidadeSelected },
  } = useContext(AuthContext);

  return useQuery(
    'agendaQuimio',
    async () => {
      const { result } = (
        await Api.get<IResponseAgendaQt>(
          `AgendaQuimio/GetAgendaQuimioterapiaGeral/${
            UnidadeSelected?.cD_ESTABELECIMENTO
          },${selectedSetor(
            UnidadeSelected?.cD_ESTABELECIMENTO,
          )},${moment().format('YYYY-MM-DD')},${moment().format(
            'YYYY-MM-DD',
          )}?pagina=1&rows=100`,
        )
      ).data;

      const resultByOrder = result.sort((a, b) => {
        return a.dT_REAL < b.dT_REAL ? -1 : a.dT_REAL > b.dT_REAL ? 1 : 0;
      });

      return resultByOrder;
    },
    {
      //enabled: false,
      staleTime: 60 * 30000, // 30 minuto
      onError: () => {
        addAlert({
          message: 'Error ao carregar as agendas, tentar mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
interface IPropsInitAtendimento {
  NR_ATENDIMENTO: number;
  NM_USUARIO: string;
}
const useInitAtendimento = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IPropsInitAtendimento) => {
      return Api.put(
        `AgendaQuimio/IniciarAtendimentoQuimioterapia/${
          item.NR_ATENDIMENTO
        }/${'wcorreia'}`,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Tratamento iniciado com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao iniciar o tratamento tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

export { useGetAgendasQt, useInitAtendimento };
