import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import HeaderDashBoard from '../components/header/HeaderDashBoard';
import User from '../pages/perfil/perfil';
import Busca from '../pages/busca/busca';
import InformacoesPessoais from '../pages/perfil/informacoesPessoais/informacoesPessoais';
import DadosContato from '../pages/perfil/dadosContato/dadosContato';
import Credenciais from '../pages/perfil/credenciais/credenciais';
import AlterarSenha from '../pages/perfil/alteracaoSenha/alterarSenha';
import AtualizarEmail from '../pages/perfil/dadosContato/atualizarEmail';
import AtualizarCelular from '../pages/perfil/dadosContato/atualizarCelular';
import RecuperarSenha from '../pages/recuperarSenha/recuperarSenha';
import SinaisVitais from '../pages/sinaisVitais/sinaisVitais';
import CameraPerson from '../pages/cameraPerson/cameraPerson';
import { HistorySinaisVitais } from '../pages/sinaisVitais/historySinaisVitais/historySinaisVitais';
import UpdateSinais from '../pages/sinaisVitais/updateSinaisVitais/updateSinais';
import { IPFSinaisVitais } from '../contexts/sinaisVitaisContext';
import { ISinaisVitais } from '../reducers/ConsultasReducer';
import UpdateSinaisVitaisEnfermagem from '../pages/sinaisVitais/updateSinaisVitaisEnfermagem/updateSinaisVitaisEnfermagem';
import EvolucaoEnfermagem from '../pages/evolucao/evolucaoEnfermagem/evolucaoEnfermagem';
import SearchPessoaFisica from '../pages/evolucao/evolucaoEnfermagem/searchPessoaFisica';
import EndSinaisVitais from '../pages/sinaisVitais/endSinaisVitais';
import HistoryEvolucao from '../pages/evolucao/evolucaoEnfermagem/historyEvolucao';
import IndexEvolucao from '../pages/evolucao/evolucaoEnfermagem/indexEvolucao';
import UpdateEvolucaoEnfermagem from '../pages/evolucao/evolucaoEnfermagem/updateEvolucaoEnfermagem';
import { IEvolucaoHistory, IFilterHistoryEvolucao } from '../hooks/useEvolucao';
import AcompanhateSinaisVitais from '../pages/sinaisVitais/acompanhateSinaisVitais/acompanhateSinaisVitais';
import Exame from '../pages/exame/exame';
import ExameDetalhes from '../pages/exame/exameDetalhes/exameDetalhes';
import { IExame, IFilesExames, IparamsFilterExame } from '../hooks/useExames';
import ExamePdf from '../pages/exame/examePdf/examePdf';
import ExameImg from '../pages/exame/exameImg/exameImg';
import Tratamento_quimio from '../pages/tratamento_quimio/tratamento_quimio';
import PainelSenha from '../pages/PainelSenha/painelSenha';
import PainelSenhaOptions from '../pages/PainelSenha/painelSenhaOptions/painelSenhaOptions';
import PrintBluetooth from '../pages/PrintBluetooth/PrintBluetooth';
import Stopwatch from '../pages/stopwatch/stopwatch';
import StopwatchFilter from '../pages/stopwatch/stopwatchFilter';
import { AgendaQtItens, AtendimentosStopWatchH, IQuimioterapiaStopwatchH, PatientsStopWatchH } from '../hooks/useStopwatch';
import CirculacaoInterna from '../pages/circulacaoInterna/circulacaoInterna';
import RouteBottom from './routeBottom';
import AddAcompanhanteSinaisVitais from '../pages/sinaisVitais/addAcompanhanteSinaisVitais/addAcompanhanteSinaisVitais';
import stopwatchList from '../pages/stopwatch/stopwatchList';
import StopwatchListAgenda from '../pages/stopwatch/stopwatchListAgenda';
import { IAgendaQT } from '../hooks/useAgendaQt';
import StopwatchListAtendimento from '../pages/stopwatch/stopwatchListAtendimento';
import AtendimentoFilterSinaisVitais from '../pages/sinaisVitais/atendimentosSinaisVitais/atendimentoFilterSinaisVitais';
import { IAgendaPaciente } from '../hooks/useAgendaConsultas';
import UpdateSinaisVitais from '../pages/sinaisVitais/updateSinaisVitais/updateSinaisVitais';

export type RootStackParamList = {
  DashBoard: undefined;
  RouteBottom: undefined;
  DadosPessoais: undefined;
  DadosContato: undefined;
  Credenciais: undefined;
  UpdatePassword: undefined;
  AtualizarEmail: undefined;
  AtualizarCelular: undefined;
  RecuperarSenha: undefined;
  CameraPerson: undefined;
  FalarMedico: undefined;
  LembretesNotificacoes: undefined;
  Perfil: undefined;
  Terapia: undefined;
  EquipeMedica: undefined;
  Equipe: undefined;
  Unidades: undefined;
  menuUnidades: undefined;
  Busca: undefined;
  ExameCamera: undefined;
  InformacoesPessoais: undefined;
  AlterarSenha: undefined;
  SinaisVitais: undefined;
  historySinaisVitais: undefined;
  UpdateSinais: {
    PessoaFisica: IPFSinaisVitais | IAgendaQT;
    SinaisVitais?: ISinaisVitais;
    GeraAtendimento: boolean;
    Origin: 'Consulta' | 'Tratamento' | 'Tratamento_enfermagem' | null;
  };
  UpdateSinaisVitais: {
    AgendaPaciente: IAgendaPaciente;
    SinaisVitais?: ISinaisVitais;
    GeraAtendimento: boolean;
    Origin: 'Consulta' | 'Tratamento' | 'Tratamento_enfermagem' | 'Atendimentos' | null;
  }
  UpdateSinaisVitaisEnfermagem: {
    PessoaFisica: IPFSinaisVitais;
    SinaisVitais: ISinaisVitais;
  };
  EvolucaoEnfermagem?: {
    PessoaFisica: IPFSinaisVitais;
  };
  SearchPessoaFisica: undefined;
  EndSinaisVitais: {
    cdPaciente: string;
    Tipo: string;
  };
  HistoryEvolucao: {
    Filter: IFilterHistoryEvolucao;
  };
  IndexEvolucao: {
    Index: number;
  };
  UpdateEvolucaoEnfermagem: {
    Evolucao: IEvolucaoHistory;
  };
  AcompanhateSinaisVitais: {
    PessoaFisica: {
      nM_PESSOA_FISICA: string;
      dT_NASCIMENTO: string;
      cD_PESSOA_FISICA: string;
    };
  };
  AddAcompanhanteSinaisVitais: {
    PessoaFisica: {
      nM_PESSOA_FISICA: string;
      dT_NASCIMENTO: string;
      cD_PESSOA_FISICA: string;
    };
  };
  Exame: undefined;
  ExameDetalhes: {
    exames: IExame;
    filter: IparamsFilterExame;
  };
  ExamePdf: {
    exameFiles: IFilesExames;
    filter: IparamsFilterExame;
  };
  ExameImg: {
    exameFiles: IFilesExames;
    filter: IparamsFilterExame;
  };
  Tratamento_quimio: undefined;
  PainelSenha: undefined;
  PainelSenhaOptions: undefined;
  PrintBluetooth: undefined;
  Stopwatch: undefined;
  StopwatchFilter: {
    listFilter: IQuimioterapiaStopwatchH[];
    title: string;
    filterParam: string;
    setor: string;
  };
  StopwatchList: {
    listFilter: PatientsStopWatchH[];
    title: string;
  };
  StopwatchListAgenda: {
    listFilter: AgendaQtItens[];
    title: string;
  }
  CirculacaoInterna: undefined;
  StopwatchListAtendimento: {
    listFilter: AtendimentosStopWatchH[];
    title: string;
  };
  AtendimentoFilterSinaisVitais: {
    cd_pessoa_fisica: string;
  };
};

const Stack = createStackNavigator<RootStackParamList>();
export type StackNavigation = StackNavigationProp<RootStackParamList>;

const InitialStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ navigation, scene }) => {
          const { options } = scene.descriptor;
          const Title = options.title ? options.title : null;
          return (
            <HeaderDashBoard
              onPress={() => navigation.goBack()}
              title={Title}
            />
          );
        },
      }}>
      <Stack.Screen
        name="RouteBottom"
        component={RouteBottom}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const SinaisVitaisStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ navigation, scene }) => {
          const { options } = scene.descriptor;
          const Title = options.title ? options.title : null;
          return (
            <HeaderDashBoard
              onPress={() => navigation.goBack()}
              title={Title}
            />
          );
        },
      }}>
      <Stack.Screen
        name="SinaisVitais"
        component={SinaisVitais}
        options={{ title: 'Sinais Vitais' }}
      />
      <Stack.Screen
        name="historySinaisVitais"
        component={HistorySinaisVitais}
        options={{ title: 'Historico Sinais Vitais' }}
      />
      <Stack.Screen
        name="EndSinaisVitais"
        component={EndSinaisVitais}
        options={{ title: 'Histórico sinais vitais' }}
      />
      <Stack.Screen
        name="UpdateSinais"
        component={UpdateSinais}
        options={{ title: 'Sinais Vitais Triagem' }}
      />
      <Stack.Screen
        name="UpdateSinaisVitais"
        component={UpdateSinaisVitais}
        options={{ title: 'Sinais Vitais Triagem' }}
      />
      <Stack.Screen
        name="UpdateSinaisVitaisEnfermagem"
        component={UpdateSinaisVitaisEnfermagem}
        options={{ title: 'Sinais Vitais Enfermagem' }}
      />
      <Stack.Screen
        name="AcompanhateSinaisVitais"
        component={AcompanhateSinaisVitais}
        options={{ title: 'Vincular acompanhante' }}
      />
      <Stack.Screen
        name="AddAcompanhanteSinaisVitais"
        component={AddAcompanhanteSinaisVitais}
        options={{ title: 'Adicionar acompanhante' }}
      />
      <Stack.Screen
        name="AtendimentoFilterSinaisVitais"
        component={AtendimentoFilterSinaisVitais}
        options={{ title: 'Atendimentos Paciente' }}
      />
    </Stack.Navigator>
  );
}

const EvolucaoStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ navigation, scene }) => {
          const { options } = scene.descriptor;
          const Title = options.title ? options.title : null;
          return (
            <HeaderDashBoard
              onPress={() => navigation.goBack()}
              title={Title}
            />
          );
        },
      }}>
      <Stack.Screen
        name="IndexEvolucao"
        initialParams={{ Index: 0 }}
        component={IndexEvolucao}
        options={{ title: 'Evolucão' }}
      />
      <Stack.Screen
        name="SearchPessoaFisica"
        component={SearchPessoaFisica}
        options={{ title: 'Evolucão' }}
      />
      <Stack.Screen
        name="EvolucaoEnfermagem"
        component={EvolucaoEnfermagem}
        options={{ title: 'Evolução' }}
      />

      <Stack.Screen
        name="HistoryEvolucao"
        component={HistoryEvolucao}
        options={{ title: 'Histórico evolução' }}
      />
      <Stack.Screen
        name="UpdateEvolucaoEnfermagem"
        component={UpdateEvolucaoEnfermagem}
        options={{ title: 'Evolução' }}
      />
    </Stack.Navigator>
  );
}

const CirculacaoInternaStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ navigation, scene }) => {
          const { options } = scene.descriptor;
          const Title = options.title ? options.title : null;
          return (
            <HeaderDashBoard
              onPress={() => navigation.goBack()}
              title={Title}
            />
          );
        },
      }}>
      <Stack.Screen
        name="CirculacaoInterna"
        component={CirculacaoInterna}
        options={{ title: 'Circulação Interna' }}
      />
    </Stack.Navigator>
  );
}

const TratamentoQuimioStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ navigation, scene }) => {
          const { options } = scene.descriptor;
          const Title = options.title ? options.title : null;
          return (
            <HeaderDashBoard
              onPress={() => navigation.goBack()}
              title={Title}
            />
          );
        },
      }}>
      <Stack.Screen
        name="Tratamento_quimio"
        component={Tratamento_quimio}
        options={{ title: 'Tratamento' }}
      />
      <Stack.Screen
        name="SinaisVitais"
        component={SinaisVitais}
        options={{ title: 'Sinais Vitais' }}
      />
      <Stack.Screen
        name="historySinaisVitais"
        component={HistorySinaisVitais}
        options={{ title: 'Historico Sinais Vitais' }}
      />
      <Stack.Screen
        name="EndSinaisVitais"
        component={EndSinaisVitais}
        options={{ title: 'Histórico sinais vitais' }}
      />
      <Stack.Screen
        name="UpdateSinais"
        component={UpdateSinais}
        options={{ title: 'Sinais Vitais Triagem' }}
      />
      <Stack.Screen
        name="UpdateSinaisVitaisEnfermagem"
        component={UpdateSinaisVitaisEnfermagem}
        options={{ title: 'Sinais Vitais Enfermagem' }}
      />
      <Stack.Screen
        name="AcompanhateSinaisVitais"
        component={AcompanhateSinaisVitais}
        options={{ title: 'Vincular acompanhante' }}
      />
      <Stack.Screen
        name="AddAcompanhanteSinaisVitais"
        component={AddAcompanhanteSinaisVitais}
        options={{ title: 'Adicionar acompanhante' }}
      />
    </Stack.Navigator>
  );
}
const ExamesStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ navigation, scene }) => {
          const { options } = scene.descriptor;
          const Title = options.title ? options.title : null;
          return (
            <HeaderDashBoard
              onPress={() => navigation.goBack()}
              title={Title}
            />
          );
        },
      }}>
      <Stack.Screen
        name="Exame"
        component={Exame}
        options={{ title: 'Exames recebidos' }}
      />
      <Stack.Screen
        name="ExameDetalhes"
        component={ExameDetalhes}
        options={{ title: 'Exame detalhes' }}
      />
      <Stack.Screen
        name="ExamePdf"
        component={ExamePdf}
        options={{ title: 'ExamePdf' }}
      />
      <Stack.Screen
        name="ExameImg"
        component={ExameImg}
        options={{ title: 'Exame' }}
      />
    </Stack.Navigator>
  );
}

const PainelSenhaStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ navigation, scene }) => {
          const { options } = scene.descriptor;
          const Title = options.title ? options.title : null;
          return (
            <HeaderDashBoard
              onPress={() => navigation.goBack()}
              title={Title}
            />
          );
        },
      }}>
      <Stack.Screen
        name="PainelSenha"
        component={PainelSenha}
        options={{ title: 'Painel Senha' }}
      />
      <Stack.Screen
        name="PainelSenhaOptions"
        component={PainelSenhaOptions}
        options={{ title: 'Opções' }}
      />
      <Stack.Screen
        name="PrintBluetooth"
        component={PrintBluetooth}
        options={{ title: 'PrintBluetooth' }}
      />
    </Stack.Navigator>
  );
}

const StopwatchStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'DashBoard'}
      headerMode={'screen'}
      screenOptions={{
        header: ({ navigation, scene }) => {
          const { options } = scene.descriptor;
          const Title = options.title ? options.title : null;
          return (
            <HeaderDashBoard
              onPress={() => navigation.goBack()}
              title={Title}
            />
          );
        },
      }}>
      <Stack.Screen
        name="Stopwatch"
        component={Stopwatch}
        options={{ title: 'Stopwatch' }}
      />
      <Stack.Screen
        name="StopwatchFilter"
        component={StopwatchFilter}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="StopwatchList"
        component={stopwatchList}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="StopwatchListAgenda"
        component={StopwatchListAgenda}
        options={({ route }) => ({ title: route.params.title })}
      />
      <Stack.Screen
        name="StopwatchListAtendimento"
        component={StopwatchListAtendimento}
        options={({ route }) => ({ title: route.params.title })}
      />
    </Stack.Navigator>
  );
}

const UserStackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, scene }) => {
            const { options } = scene.descriptor;
            const Title = options.title ? options.title : null;
            return (
              <HeaderDashBoard
                onPress={() => navigation.goBack()}
                title={Title}
              />
            );
          },
        }}>
        <Stack.Screen
          name="Perfil"
          component={User}
          options={{ title: 'Perfil' }}
        />
        <Stack.Screen
          name="InformacoesPessoais"
          component={InformacoesPessoais}
          options={{ title: 'Informações Pessoais' }}
        />
        <Stack.Screen
          name="DadosContato"
          component={DadosContato}
          options={{ title: 'Dados de Contato' }}
        />
        <Stack.Screen
          name="Credenciais"
          component={Credenciais}
          options={{ title: 'Credenciais' }}
        />
        <Stack.Screen
          name="AlterarSenha"
          component={AlterarSenha}
          options={{ title: 'Alterar senha' }}
        />
        <Stack.Screen
          name="AtualizarEmail"
          component={AtualizarEmail}
          options={{ title: 'Atualizar Email' }}
        />
        <Stack.Screen
          name="AtualizarCelular"
          component={AtualizarCelular}
          options={{ title: 'Atualizar Celular' }}
        />
        <Stack.Screen
          name="RecuperarSenha"
          component={RecuperarSenha}
          options={{ title: 'Recuperar Senha', headerShown: false }}
        />
        <Stack.Screen
          name="CameraPerson"
          component={CameraPerson}
          options={{ title: 'Foto perfil' }}
        />
      </Stack.Navigator>
    </>
  );
};

const BuscaStackNavigator = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          header: ({ navigation, scene }) => {
            const { options } = scene.descriptor;
            const Title = options.title ? options.title : null;
            return (
              <HeaderDashBoard
                onPress={() => navigation.goBack()}
                title={Title}
              />
            );
          },
        }}>
        <Stack.Screen
          name="Busca"
          component={Busca}
          options={{ title: 'Busca' }}
        />
      </Stack.Navigator>
    </>
  );
};


export {
  InitialStackNavigator,
  SinaisVitaisStackNavigation,
  EvolucaoStackNavigation,
  CirculacaoInternaStackNavigation,
  TratamentoQuimioStackNavigation,
  ExamesStackNavigation,
  PainelSenhaStackNavigation,
  StopwatchStackNavigation,
  BuscaStackNavigator,
  UserStackNavigator,
};
