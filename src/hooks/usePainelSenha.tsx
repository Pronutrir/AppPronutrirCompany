import { useMutation, useQuery } from 'react-query';
import api from '../services/api';
import { useContext } from 'react';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
export interface PropsGerarSenha {
  nR_SEQ_FILA_P: number;
  cD_ESTABELECIMENTO_P: number;
  nM_USUARIO_P: string;
  iE_SENHA_PRIORITARIA_P?: string;
  cD_PESSOA_FISICA_P?: string;
}

export interface PropsGerarSenhaResponse extends PropsGerarSenha {
  cD_SENHA_GERADA: number;
  nR_SEQ_SENHA_P: string;
  dS_LETRA_VERIFICACAO: string;
  dT_GERACAO_SENHA: string;
  dS_FILA: string;
  dS_CURTO: string;
}

export interface PropsFilaEsperaAtendimentos {
  nR_SEQUENCIA: number;
  cD_ESTABELECIMENTO: number;
  nM_USUARIO: string;
  dS_FILA: string;
  dS_CURTO: string;
  dS_LETRA_VERIFICACAO: string;
  iE_SITUACAO: string;
  iE_PERMITE_CHAMADA: string;
}

export interface PropsPacientFilaEspera {
  cD_SENHA_GERADA: number;
  dT_GERACAO_SENHA: string;
  nR_SEQUENCIA: number;
  nR_CPF: string;
  cD_PESSOA_FISICA: string;
  nM_USUARIO: string;
  cD_ESTABELECIMENTO: number;
  nR_SEQ_FILA_SENHA: number;
  nR_SEQ_FILA_SENHA_ORIGEM: number;
  dS_LETRA_VERIFICACAO: string;
  dS_FILA: string;
  dS_CURTO: string;
}

export interface PropsInutilizarSenha {
  CD_SENHA_P: number;

  CD_FILA_P: number;

  NR_SEQ_SENHA_P: number;

  NM_USUARIO_P: string;

  NR_SEQ_MOTIVO_INUTILIZACAO_P: number;

  CD_ESTABELECIMENTO: number;
}

const useGerarSenhaPainel = () => {
  return useMutation('useGerarSenha', async (props: PropsGerarSenha) => {
    const result = (
      await api.post<PropsGerarSenhaResponse>(
        'PainelChamada/GerarSenhaPainel',
        props,
      )
    ).data;
    return result;
  });
};

const useGetFilas = (CD_ESTABELECIMENTO: number, IE_SITUACAO: string) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    ['useGetFilas'],
    async () => {
      const result = (
        await api.get<PropsFilaEsperaAtendimentos[]>(
          `PainelChamada/GetListFilaEsperaAtendimento?CD_ESTABELECIMENTO=${CD_ESTABELECIMENTO}&IE_SITUACAO=${IE_SITUACAO}`,
        )
      ).data;
      return result;
    },
    {
      staleTime: 60 * 30000, // 30 minuto
      onSuccess: () => {
        console.log('sucesso');
      },
      onError: () => {
        addAlert({
          message: 'Error ao gerar lista filas tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

const useGetListPacientFilaEspera = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    ['useGetListPacientFilaEspera'],
    async () => {
      const result = (
        await api.get<PropsPacientFilaEspera[]>(
          `PainelChamada/GetListPacientQueueWaiting?PAGENUMBER=1&ROWSOFPAGE=100`,
        )
      ).data;
      return result;
    },
    {
      onSuccess: () => {
        console.log('sucesso');
      },
      onError: () => {
        addAlert({
          message: 'Error ao gerar lista das senhas tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

const useInutilizarSenha = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    async (item: PropsInutilizarSenha) => {
      console.log(item);
      const result = (await api.post('PainelChamada/DisableSenha', item)).data;
      return result;
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Senha inutilizada com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao inutilizar a senha tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

export {
  useGerarSenhaPainel,
  useGetFilas,
  useGetListPacientFilaEspera,
  useInutilizarSenha,
};
