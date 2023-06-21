import { useContext } from 'react';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import { useMutation, useQuery } from 'react-query';
import Api from '../services/api';
import AuthContext from '../contexts/auth';
interface IPropsInitAtendimento {
  nR_SEQ_ATENDIMENTO: number;
  NM_USUARIO: string;
  nR_SEQ_AGENDA: number;
  cD_ESTABELECIMENTO: number;
}
interface IPropsEndAtendimento {
  cD_PESSOA_FISICA: number;
  cD_PERFIL: number;
  nR_SEQ_ATENDIMENTO: number;
  nR_SEQ_PACIENTE: number;
  nR_ATENDIMENTO: number;
  nR_PRESCRICAO: number;
  nR_CICLO: number;
  dS_DIA_CICLO: string;
  nM_USUARIO: string;
  cD_ESTABELECIMENTO: number;
  dT_REAL: string;
}
interface IResponseAtendimentosAptosEnfermagem {
  result: IAtendimentosAptosEnfermagem[];
}
export interface IAtendimentosAptosEnfermagem {
  nR_SEQ_ATENDIMENTO: number;
  nR_ATENDIMENTO: number;
  nR_SEQ_PACIENTE: number;
  nR_PRESCRICAO: number;
  nR_SEQ_AGENDA: number;
  dS_PROTOCOLO_ONCO: string;
  nR_CICLO: number;
  dS_DIA_CICLO: string;
  dS_ACOMODACAO: string;
  nM_PESSOA_FISICA: string;
  cD_PESSOA_FISICA: number;
  dT_NASCIMENTO: string;
  iE_PRE_MEDICACAO: number;
  dT_RECEBIMENTO_PRE_MEDIC: string;
  dT_INICIO_ADM: string;
  dT_FIM_ADM: string;
  dT_ENTREGA_MEDICACAO: string;
  dT_REAL: string;
  dT_ALTA: string;
}
const useGetAtendimentosAptosEnfermagem = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  const { stateAuth } = useContext(AuthContext);
  return useQuery(
    '',
    async () => {
      const { result } = (
        await Api.get<IResponseAtendimentosAptosEnfermagem>(
          `AtendimentoPaciente/ObterAtendimentosAptosEnfermagem/${stateAuth.UnidadeSelected?.cD_ESTABELECIMENTO}`,
        )
      ).data;
      return result.sort((a, b) => {
        return a.nM_PESSOA_FISICA < b.nM_PESSOA_FISICA
          ? -1
          : a.nM_PESSOA_FISICA > b.nM_PESSOA_FISICA
          ? 1
          : 0;
      });
    },
    {
      //enabled: false,
      //staleTime: 60 * 30000, // 30 minuto
      refetchInterval: 60 * 1000,
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
  const { stateAuth } = useContext(AuthContext);
  return useMutation(
    (item: IPropsInitAtendimento) => {
      return Api.put(
        `AtendimentoPaciente/IniciarAtendimentoQuimioterapia/${
          item.nR_SEQ_ATENDIMENTO
        }/${stateAuth.PerfilSelected?.nM_USUARIO}/${stateAuth.UnidadeSelected?.cD_ESTABELECIMENTO}?${item.nR_SEQ_AGENDA ?? ''}`,
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

interface IPostEntregaMedicamento {
  NR_SEQ_ATENDIMENTO: number;
  NM_USUARIO: string;
}
const useEntregaMedicamento = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IPostEntregaMedicamento) => {
      return Api.post(
        `AtendimentoPaciente/MedicacaoPaciente/${item.NR_SEQ_ATENDIMENTO}/${item.NM_USUARIO}`,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Entrega realizada com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao realizar entrega tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

const useEntregaPreMedicamento = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IPostEntregaMedicamento) => {
      return Api.post(
        `AtendimentoPaciente/PreMedicacaoPacienteEntregue/${item.NR_SEQ_ATENDIMENTO}/${item.NM_USUARIO}`,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Entrega realizada com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao realizar entrega tente mais tarde!',
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
  useEntregaMedicamento,
  useEntregaPreMedicamento,
};
