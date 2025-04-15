import { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import AuthContext from '../contexts/auth';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';
export interface IEvolucao {
  cD_EVOLUCAO?: number;
  dT_EVOLUCAO?: string;
  iE_TIPO_EVOLUCAO?: number;
  iE_SITUACAO?: string;
  cD_MEDICO?: string;
  dT_ATUALIZACAO?: string;
  nM_USUARIO?: string;
  cD_PESSOA_FISICA?: string;
  dS_EVOLUCAO?: string;
}
export interface IEvolucaoResponse {
  message: string;
  result: IEvolucao;
  statusCode: 200;
}
export interface ITextDefaultResponse {
  result: ITextDefault[];
}
export interface ITextDefault {
  nR_SEQUENCIA: number;
  nR_SEQ_ITEM_PRONT: number;
  dS_TITULO: string;
  nM_USUARIO: string;
  dT_ATUALIZACAO: string;
  iE_PERMITE_ALTERAR_TEXTO: string;
  dS_TEXTO: string;
  dT_ATUALIZACAO_NREC: string;
  nM_USUARIO_NREC: string;
}
export interface IEvolucaoHistoryResponse {
  result: IEvolucaoHistory[];
}
export interface IEvolucaoFilterHistoryResponse {
  result: IEvolucaoHistory;
}
export interface IEvolucaoHistory {
  cD_EVOLUCAO: number;
  dT_EVOLUCAO: string;
  iE_TIPO_EVOLUCAO: string;
  cD_PESSOA_FISICA: string;
  nM_PACIENTE: string;
  dT_ATUALIZACAO: string;
  nM_USUARIO: string;
  dS_EVOLUCAO: string;
  cD_MEDICO: string;
  nM_PROFISSIONAL: string;
  dT_LIBERACAO: string;
  qT_SUPERF_CORPORIA: number;
  iE_RECEM_NATO: string;
  iE_SITUACAO: string;
  iE_AVALIADOR_AUX: string;
  iE_RESTRICAO_VISUALIZACAO: string;
  qT_CARACTERES: number;
  dT_ATUALIZACAO_NREC: string;
  nM_USUARIO_NREC: string;
  iE_RELEV_RESUMO_ALTA: string;
  iE_NIVEL_ATENCAO: string;
  dS_UTC: string;
  pepImagem: [];
  medicosEvolucao: [];
  especialidadeMedicasEvolucao: [];
}
export interface ItipoNotas {
  cD_TIPO_EVOLUCAO: string;
  iE_ATEND_FECHADO: string;
  dT_ATUALIZACAO: string;
  dS_TIPO_EVOLUCAO: string;
  iE_SITUACAO: string;
  nM_USUARIO: string;
  iE_REGRA_ALTA: string;
  iE_EVOLUCAO_SUSCDS: string;
  iE_NOTACAO_CLINICA_AGEND_GRUPO: string;
  dT_ATUALIZACAO_NREC: string;
  nM_USUARIO_NREC: string;
  dS_LEGENDA: string;
  iE_GERA_LANCTO_AUTO: string;
}
export interface ItipoNotasResponse {
  result: ItipoNotas[];
}
interface IEvolucaoliberacao {
  cD_EVOLUCAO: number;
  nM_USUARIO: string;
}
export interface IFilterHistoryEvolucao {
  codMedico?: string;
  codPessoaFisica?: string;
}
const useAddEvoluçaoEnfermagem = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IEvolucao) => {
      return Api.post<any, AxiosResponse<IEvolucaoResponse>, IEvolucao>(
        `v1/EvolucaoPaciente/PostEvolucaoPaciente`,
        item,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Evolução adicionada com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao adicionar a evolução tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useUpdateEvoluçaoEnfermagem = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (item: IEvolucaoHistory) => {
      return Api.put(
        `v1/EvolucaoPaciente/PutEvolucaoPaciente/${item.cD_EVOLUCAO}`,
        item,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Evolução atualizada com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao atualizar a evolução tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useDeleteEvoluçaoEnfermagem = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (idEvolucao: number) => {
      return Api.delete(
        `v1/EvolucaoPaciente/DeleteEvolucaoPaciente/${idEvolucao}`,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Evolução excluída com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao excluir a evolução tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useNotasClinicas = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    'tiposNotas',
    async () => {
      const {
        data: { result },
      } = await Api.get<ItipoNotasResponse>(
        `v1/TipoEvolucao/ListarTiposEvolucoes?pagina=1&rows=100`,
      );
      return result.map(item => {
        return { label: item.dS_TIPO_EVOLUCAO, itemEvolucao: item };
      });
    },
    {
      onError: () => {
        addAlert({
          message: 'Error ao consultar notas clinicas tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useEvolucaoTextDefaultReduzidos = (cD_TIPO_EVOLUCAO?: string) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    'defaultText',
    async () => {
      const {
        data: { result },
      } = await Api.get<ITextDefaultResponse>(
        `v1/TextoPadrao/ListarTextosPadroesInstituicaoReduzidos?codNotasClinicas=${cD_TIPO_EVOLUCAO}&pagina=1&rows=100`,
      );

      return result.map(item => {
        return { label: item.dS_TITULO, value: item };
      });
    },
    {
      enabled: Boolean(cD_TIPO_EVOLUCAO),
      onError: () => {
        addAlert({
          message: 'Error ao consultar textos padrões tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useEvolucaoTextDefault = (value: number | null) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    ['defaultTextHtml', value],
    async () => {
      const {
        data: { result },
      } = await Api.get<ITextDefaultResponse>(
        `v1/TextoPadrao/ListarTextosPadroesInstituicao?nrSequencia=${value ? value : 0
        }`,
      );
      return result[0];
    },
    {
      onError: () => {
        addAlert({
          message: 'Error ao listar os textos padroes tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useHistoryEvolucao = (filter: IFilterHistoryEvolucao) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  const {
    stateAuth: { usertasy },
  } = useContext(AuthContext);
  return useInfiniteQuery(
    ['historyEvolucao', filter],
    async ({ pageParam = 1 }) => {
      const {
        data: { result },
      } = await Api.get<IEvolucaoHistoryResponse>(
        `v1/EvolucaoPaciente/ListarEvolucaoPaciente?${filter.codMedico ? `codMedico=${filter.codMedico}` : ''
        }${filter.codPessoaFisica
          ? `codPessoaFisica=${filter.codPessoaFisica}`
          : ''
        }&pagina=${pageParam}&rows=8`,
      );
      return result.filter(item => {
        if (
          !item.dT_LIBERACAO &&
          item.cD_MEDICO !== usertasy.cD_PESSOA_FISICA
        ) {
          return false;
        } else {
          return true;
        }
      });
    },
    {
      enabled: Boolean(filter.codMedico || filter.codPessoaFisica),
      //staleTime: 60 * 30000, // 30 minuto
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.length < 6) {
          return null;
        } else {
          return pages.length + 1;
        }
      },
      onError: () => {
        addAlert({
          message: 'Error ao listar os evoluções tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useFilterHistoryEvolucao = (idEvolucao: number) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    ['FilterHistoryEvolucao', idEvolucao],
    async () => {
      const {
        data: { result },
      } = await Api.get<IEvolucaoFilterHistoryResponse>(
        `v1/EvolucaoPaciente/FiltraEvolucaoPacientePorId/${idEvolucao}`,
      );
      return result;
    },
    {
      onError: () => {
        addAlert({
          message: 'Error ao listar os evoluções tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};
const useLiberarEvolucao = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    (Evolucao: IEvolucaoliberacao) => {
      return Api.put(
        `v1/EvolucaoPaciente/LiberarEvolucaoPaciente/${Evolucao.cD_EVOLUCAO}`,
        Evolucao,
      );
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Evolução Liberada com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao Liberar a evolução tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

export {
  useAddEvoluçaoEnfermagem,
  useUpdateEvoluçaoEnfermagem,
  useEvolucaoTextDefault,
  useHistoryEvolucao,
  useNotasClinicas,
  useEvolucaoTextDefaultReduzidos,
  useDeleteEvoluçaoEnfermagem,
  useLiberarEvolucao,
  useFilterHistoryEvolucao,
};
