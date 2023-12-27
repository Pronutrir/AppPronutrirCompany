import { useContext } from 'react';
import { useMutation, useQuery } from 'react-query';
import Api from '../services/api';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';

export interface IPropsCirculacaoInterna {
  id?: 0;
  cliente: string;
  documento: string;
  tipo_documento: string;
  registro: {
    id?: 0;
    prestador: string;
    destino: string;
  };
}

const useCirculacaoInternaFilter = (word: string) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    'circulacaoInternaFilter',
    async () => {
      const result = (
        await Api.get<IPropsCirculacaoInterna[]>(
          `CirculacaoInterna/GetAllCirculacaoInterna?filter=${word}`,
        )
      ).data;
      console.log('useCirculacaoInternaFilter', result);
      return result;
    },
    {
      enabled: Boolean(word.length > 4),
      onError: () => {
        addAlert({
          message: 'Error ao listar, tentar mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

const useAddCirculacaoInterna = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IPropsCirculacaoInterna) => {
      return Api.post<IPropsCirculacaoInterna>(
        'CirculacaoInterna/AddCirculacaoInterna',
        item,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Adicionado com sucesso!',
          status: 'sucess',
        });
      },
      onError: ({ message }) => {
        addAlert({
          message: message,
          status: 'error',
        });
      },
    },
  );
};

export { useCirculacaoInternaFilter, useAddCirculacaoInterna };
