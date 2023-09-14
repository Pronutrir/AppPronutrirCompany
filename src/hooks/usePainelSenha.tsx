import { useMutation, useQuery } from 'react-query';
import api from '../services/api';
import { useContext } from 'react';
import NotificationGlobalContext from '../contexts/notificationGlobalContext';
import { BluetoothEscposPrinter } from '@brooons/react-native-bluetooth-escpos-printer';
import LogoBase64 from '../assets/imagens/logaBase64';
import moment from 'moment';

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

const useGerarSenhaPainel = () => {
  const { addAlert } = useContext(NotificationGlobalContext);
  return useMutation(
    'useGerarSenha',
    async (props: PropsGerarSenha) => {
      const result = (
        await api.post<PropsGerarSenhaResponse>(
          'PainelChamada/GerarSenhaPainel',
          props,
        )
      ).data;
      return result;
    },
    {
      onSuccess: () => {
        addAlert({
          message: 'Senha gerada com sucesso!',
          status: 'sucess',
        });
      },
      onError: () => {
        addAlert({
          message: 'Error ao gerar senha tente mais tarde!',
          status: 'error',
        });
      },
    },
  );
};

const useGetFilas = (CD_ESTABELECIMENTO: number, IE_SITUACAO: string) => {
  return useQuery(
    '',
    async () => {
      const result = (
        await api.get<PropsFilaEsperaAtendimentos[]>(
          `PainelChamada/GetListFilaEsperaAtendimento?CD_ESTABELECIMENTO=${CD_ESTABELECIMENTO}&IE_SITUACAO=${IE_SITUACAO}`,
        )
      ).data;
      return result;
    },
    {
      onSuccess: () => {
        console.log('sucesso');
      },
      onError: error => {
        console.log(error);
      },
    },
  );
};

const printSenha = async (item: PropsGerarSenhaResponse) => {
  const { addAlert } = useContext(NotificationGlobalContext);
  try {
    await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    await BluetoothEscposPrinter.printPic(LogoBase64, {
      width: 150,
      left: 210,
    });
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.printText('BEM VINDO A PRONUTRIR\r\n', {
      widthtimes: 1,
      fonttype: 2,
    });
    await BluetoothEscposPrinter.printText('\r\n', {});
    await BluetoothEscposPrinter.printText(
      'PACIENTE COM PRIORIDADE NORMAL\r\n\r\n',
      {
        widthtimes: 1,
        fonttype: 1,
      },
    );
    await BluetoothEscposPrinter.printText(
      `${item.dS_LETRA_VERIFICACAO}${item?.cD_SENHA_GERADA}\r\n\r\n`,
      {
        encoding: 'GBK',
        codepage: 0,
        widthtimes: 1,
        heigthtimes: 1,
        fonttype: 8,
      },
    );
    await BluetoothEscposPrinter.printText(`${item?.dS_FILA}\r\n\r\n`, {
      encoding: 'CP860',
      codepage: 3,
      fonttype: 3,
      widthtimes: 1,
      heigthtimes: 1,
    });
    await BluetoothEscposPrinter.printText(
      moment(item.dT_GERACAO_SENHA).format('DD/MM/YYYY - H:mm'),
      {
        fonttype: 3,
        widthtimes: 1,
        heigthtimes: 1,
      },
    );
    await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
  } catch (error) {
    addAlert({
      message:
        'Não foi possivel imprimir a senha verifique a conexão com a impressora!',
      status: 'sucess',
    });
  }
};

export { useGerarSenhaPainel, useGetFilas, printSenha };
