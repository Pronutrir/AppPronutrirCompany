import { useContext } from 'react';
import { useQuery } from 'react-query';
import AuthContext from '../contexts/auth';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import Api from '../services/api';

export interface IUnidade {
  cD_ESTABELECIMENTO: number;
  dS_ESTABELECIMENTO: string;
  cD_SETOR_PADRAO: number;
  dT_ATUALIZACAO: string;
  dT_ATUALIZACAO_NREC: string;
  nM_USUARIO: string;
  nM_USUARIO_NREC: string;
  nM_USUARIO_PARAM: string;
  nR_SEQ_PERFIL: number;
  nR_SEQ_SIGNATURE_ENTITY: number;
}
interface IReponseUnidades {
  result: IUnidade[];
}

interface IResponseSetores {
  dS_SETOR_ATENDIMENTO: string;
  cD_SETOR_ATENDIMENTO: number;
}

const useUnidades = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  const {
    stateAuth: { usertasy },
  } = useContext(AuthContext);

  return useQuery(
    'unidades',
    async () => {
      const { result } = (
        await Api.get<IReponseUnidades>(
          `v1/UsuarioEstabelecimento/FiltrarUsuarioEstabCodUsuarioNumSeqGeral?nomeUsuarioParam=${usertasy.usuariO_FUNCIONARIO_PERFIL[0].nM_USUARIO}&page=1&rows=50`,
        )
      ).data;

      const resultFilter = result?.map(item => {
        return {
          index: item.cD_ESTABELECIMENTO,
          label: item.dS_ESTABELECIMENTO
            .replace('PRONUTRIR ', '')
            .replace('- ', ''),
          value: item,
        };
      });

      const orderByResult = resultFilter.sort(function (a, b) {
        return a.value.dS_ESTABELECIMENTO < b.value.dS_ESTABELECIMENTO
          ? -1
          : a.value.dS_ESTABELECIMENTO > b.value.dS_ESTABELECIMENTO
            ? 1
            : 0;
      });

      return orderByResult;
    },
    {
      onError: () => {
        addAlert({
          message: 'Error ao carregar os estabelecimentos, tentar mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

const useSetores = (cd_estabelecimento: number | undefined) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useQuery(
    'setores',
    async () => {
      const result = (
        await Api.get<IResponseSetores[]>(
          `v1/SetorAtendimento/FiltrarSetoresCodEstabDescrGeral?codEstab=${cd_estabelecimento}&cacheKey=true&cacheName=setoresList${cd_estabelecimento}`,
        )
      ).data;

      return result;
    },
    {
      enabled: Boolean(cd_estabelecimento),
      onError: () => {
        addAlert({
          message: 'Error ao carregar os setores, tentar mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

export { useUnidades, useSetores };
