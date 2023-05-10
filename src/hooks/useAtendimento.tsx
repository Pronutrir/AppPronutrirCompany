import { useContext } from 'react';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import { useMutation, useQuery } from 'react-query';
import Api from '../services/api';

interface IPropsInitAtendimento {
  NR_ATENDIMENTO: number;
  NM_USUARIO: string;
}

interface IPropsEndAtendimento {
  cD_PERFIL: number;
  nR_SEQ_ATENDIMENTO: number;
  nR_ATENDIMENTO: number;
  nR_PRESCRICAO: number;
  nM_USUARIO: string;
  cD_ESTABELECIMENTO: number;
}

interface IResponseAtendimentosAptosEnfermagem {
  result: IAtendimentosAptosEnfermagem[];
}

export interface IAtendimentosAptosEnfermagem {
  nR_SEQ_ATENDIMENTO: number;
  nR_ATENDIMENTO: number;
  nR_SEQ_PACIENTE: number;
  nR_PRESCRICAO: number;
  nM_PESSOA_FISICA: string;
  dT_NASCIMENTO: string;
  dT_INICIO_ADM: string;
  dT_FIM_ADM: string;
  dT_ALTA: string;
}
const useGetAtendimentosAptosEnfermagem = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    '',
    async () => {
      const { result } = (
        await Api.get<IResponseAtendimentosAptosEnfermagem>(
          'AtendimentoPaciente/ObterAtendimentosAptosEnfermagem',
        )
      ).data;
      return result;
    },
    {
      //enabled: false,
      //staleTime: 60 * 30000, // 30 minuto
      onError: () => {
        addAlert({
          message: 'Error ao carregar os atendimentos, tentar mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useInitAtendimento = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IPropsInitAtendimento) => {
      return Api.put(
        `AtendimentoPaciente/IniciarAtendimentoQuimioterapia/${
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
const useEndAtendimento = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IPropsEndAtendimento) => {
      return Api.put(
        'AtendimentoPaciente/FinalizarAtendimentoQuimioterapia',
        item,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Tratamento finalizado com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao finalizar o tratamento tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

export {
  useInitAtendimento,
  useGetAtendimentosAptosEnfermagem,
  useEndAtendimento,
};
