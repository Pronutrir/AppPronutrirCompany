import { useMutation } from 'react-query';
import ApiAtendimento, {
  refreshTokenAtendimento,
} from '../services/api-atendimento';
import { useContext } from 'react';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
interface requestAtendimento {
  servico: number;
  prioridade: number;
  cliente: {
    nome: string;
    documento: string;
  };
  unidade: number;
}

const useSenhaAtendimento = (item: requestAtendimento) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    '',
    async () => {
      const token = await refreshTokenAtendimento();
      const { result } = (
        await ApiAtendimento.post('distribui', item, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
      return result;
    },
    {
      onError: error => {
        addAlert({
          message: 'Error ao gera a senha de atendimento!',
          status: 'error',
        });
      },
    },
  );
};

export { useSenhaAtendimento };
