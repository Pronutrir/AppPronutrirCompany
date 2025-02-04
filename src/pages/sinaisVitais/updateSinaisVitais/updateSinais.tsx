import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  Platform,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
  useWindowDimensions,
} from 'react-native';
import createStyles from './style';
import BtnCentered from '../../../components/buttons/BtnCentered';
import ModalCentralizedOptions, {
  ModalHandles as ModalHandlesOptions,
} from '../../../components/Modais/ModalCentralizedOptions';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../routes/routeDashboard';
import SinaisVitaisContext, {
  SinaisVitaisPost,
} from '../../../contexts/sinaisVitaisContext';
import ShimmerPaceHolderSNMG from '../../../components/shimmerPlaceHolder/shimmerPaceHolderSNMG';
import ModalAlertPaciente from '../../../components/Modais/ModalAlertPaciente';
import {
  ISinaisVitais,
  useSinaisVitaisAll,
  useSinaisVitaisHistory,
} from '../../../hooks/useSinaisVitais';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import ModalCentralize, {
  ModalHandles,
} from '../../../components/Modais/ModalCentralize';
import CardAlertaPesoPaciente from '../components/cardAlertaPesoPaciente/cardAlertaPesoPaciente';
import CardObservacao from '../components/cardObservacao/cardlObservacao';
import PessoaFisicaComponent from '../components/pessoaFisicaComponent/pessoaFisicaComponent';
import OptionAntropometria from '../components/cardOptionsSinaisVitais/OptionAntropometria';
import OptionSinaisVitais from '../components/cardOptionsSinaisVitais/OptionSinaisVitais';
import OptionRegistroDor from '../components/cardOptionsSinaisVitais/OptionRegistroDor';
import { useKeyboardHeight } from '../../../hooks/useKeyboardHeight';
import PrintBluetoothContext from '../../../contexts/printBluetoothContext';
import { useGerarSenhaPainel } from '../../../hooks/usePainelSenha';
import AuthContext from '../../../contexts/auth';
import OptionEscalaFlebite from '../components/cardOptionsSinaisVitais/OptionEscalaFlebite';
import { RFPercentage } from 'react-native-responsive-fontsize';
import NotificationGlobalContext from '../../../contexts/notificationGlobalContext';
import NotificationSimple, { ModalHandles as ModalHandlesNotificationSimples } from '../../../components/Notification/NotificationSimple';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'UpdateSinais'>;
interface Props {
  route: ProfileScreenRouteProp;
}

const UpdateSinais: React.FC<Props> = ({
  route: {
    params: { PessoaFisica, SinaisVitais, GeraAtendimento, Origin },
  },
}: Props) => {
  const deviceWidth = useWindowDimensions();

  const keyboardHeight = useKeyboardHeight();

  const refmodalObservacoes = useRef<ModalHandles>(null);

  const refPesoMediaPaciente = useRef<number | null>(null);

  const refFlatlistMenu = useRef<FlatList<number>>(null);

  const refFlatlistPages = useRef<FlatList<PropsPage>>(null);

  const RefNotificationSimple = useRef<ModalHandlesNotificationSimples>(null);

  const styles = useThemeAwareObject(createStyles);

  const navigation = useNavigation();
  const { stateAuth } = useContext(AuthContext);

  const { printSenha } = useContext(PrintBluetoothContext);
  const { addNotification } = useContext(NotificationGlobalContext);

  const { mutateAsync: mutateAsyncGerarSenha } = useGerarSenhaPainel();

  const {
    AddSinaisVitais,
    GetSinaisVitais,
    UpdateSinaisVitais,
    AddSinaisVitaisAtendimento,
  } = useContext(SinaisVitaisContext);

  const { data: historicoSinaisVitais } = useSinaisVitaisHistory({
    nomePaciente: PessoaFisica.nM_PESSOA_FISICA,
  });

  const { refetch: refetchSinaisVitais } = useSinaisVitaisAll();

  const loadingRef = useRef<LoadHandles>(null);
  const [activeShimmer, setActiveShimmer] = useState<boolean>(false);

  const refModalOptions = useRef<ModalHandlesOptions>(null);
  const refModalOptionsRegra = useRef<ModalHandlesOptions>(null);
  const refModalCentralizeVariacaoPeso = useRef<ModalHandlesOptions>(null);
  const refModalCentralizeSenha = useRef<ModalHandlesOptions>(null);

  const [Peso, setPeso] = useState(0);
  const [Altura, setAltura] = useState(0);
  const [oxigenacao, setOxigenacao] = useState(0);
  const [observacao, setObservacao] = useState<string>('');
  const [dor, setDor] = useState(0);
  const [msnAlert, setMensAlerta] = useState<string | undefined>();

  const [pageSelected, setPageSelected] = useState(0);

  //params Antropometria
  const [pas, setPas] = useState(0);
  const [pad, setPad] = useState(0);
  const [pam, setPam] = useState(0);
  const [fc, setFc] = useState(0);
  const [fr, setFr] = useState(0);
  const [temperatura, setTemperatura] = useState(0);

  const ChangerProperty = () => {
    let x = false;
    x =
      Altura !== 0 ||
      Peso !== 0 ||
      oxigenacao !== 50 ||
      temperatura !== 30 ||
      observacao !== '';
    return x;
  };

  const SinaisVitaisUpdate = async () => {
    loadingRef.current?.openModal();
    await UpdateSinaisVitais({
      cD_PACIENTE: SinaisVitais.cD_PACIENTE,
      nR_SEQUENCIA: SinaisVitais.nR_SEQUENCIA,
      qT_ALTURA_CM: Altura <= 0 ? null : Altura,
      qT_PESO: Peso <= 0 ? null : Peso,
      qT_SATURACAO_O2: oxigenacao <= 50 ? null : oxigenacao,
      qT_TEMP: temperatura <= 30 ? null : temperatura,
      cD_ESCALA_DOR: 'FEVA',
      qT_ESCALA_DOR: dor,
      qT_FREQ_CARDIACA: fc <= 0 ? null : fc,
      qT_FREQ_RESP: fr <= 12 ? null : fr,
      qT_PAM: pam <= 0 ? null : pam,
      qT_PA_DIASTOLICA: pad <= 40 ? null : pad,
      qT_PA_SISTOLICA: pas <= 40 ? null : pas,
      dS_OBSERVACAO: observacao,
    });
    refetchSinaisVitais;
    loadingRef.current?.closeModal();
    navigation.goBack();
  };

  const PostSinaisVitais = async () => {
    loadingRef.current?.openModal();
    const dataSinaisVitais: SinaisVitaisPost = {
      cD_PACIENTE: PessoaFisica.cD_PESSOA_FISICA,
      qT_ALTURA_CM: Altura <= 0 ? null : Altura,
      qT_PESO: Peso <= 0 ? null : Peso,
      qT_SATURACAO_O2: oxigenacao <= 50 ? null : oxigenacao,
      qT_TEMP: temperatura <= 30 ? null : temperatura,
      cD_ESCALA_DOR: 'FEVA',
      qT_ESCALA_DOR: dor ? dor : 0,
      qT_FREQ_CARDIACA: fc <= 0 ? null : fc,
      qT_FREQ_RESP: fr <= 12 ? null : fr,
      qT_PAM: pam <= 0 ? null : pam,
      qT_PA_DIASTOLICA: pad <= 40 ? null : pad,
      qT_PA_SISTOLICA: pas <= 40 ? null : pas,
      dS_OBSERVACAO: observacao ? observacao : null,
      cD_ESTABELECIMENTO: PessoaFisica.cD_ESTABELECIMENTO,
      cD_MEDICO_RESP: PessoaFisica.cD_MEDICO_RESP ?? null,
      nM_PESSOA_FISICA: PessoaFisica.nM_PESSOA_FISICA,
      dT_NASCIMENTO: PessoaFisica.dT_NASCIMENTO
    };

    if (GeraAtendimento) {
      await AddSinaisVitaisAtendimento(dataSinaisVitais);
    } else {
      await AddSinaisVitais(dataSinaisVitais);
    }
    refetchSinaisVitais;
    loadingRef.current?.closeModal();
    navigation.goBack();
  };

  const gerarSenha = async (seqFila: number) => {
    if (seqFila === 0) {
      addNotification({
        message: 'Médico sem agenda vinculada a fila no painel de senhas!',
        status: 'error',
      });
      return;
    }

    const { cD_ESTABELECIMENTO, cD_PESSOA_FISICA, nR_SEQ_FILA_SENHA } = PessoaFisica;
    const { nM_USUARIO } = stateAuth.usertasy;

    const senhaData = {
      cD_ESTABELECIMENTO_P: cD_ESTABELECIMENTO,
      cD_PESSOA_FISICA_P: cD_PESSOA_FISICA,
      iE_SENHA_PRIORITARIA_P: 'N',
      nR_SEQ_FILA_P: Origin === 'Tratamento' ? nR_SEQ_FILA_SENHA : seqFila,
      nM_USUARIO_P: nM_USUARIO,
    };

    refModalCentralizeSenha.current?.closeModal();

    try {
      loadingRef.current?.openModal();
      const result = await mutateAsyncGerarSenha(senhaData);
      await printSenha(result, PessoaFisica?.nM_PESSOA_FISICA);
    } catch (error) {
      loadingRef.current?.closeModal();
    } finally {
      loadingRef.current?.closeModal();
    }
  };

  const MenuPopUpOptions = async (itemSelected: string) => {
    switch (itemSelected) {
      case 'Gerar senha': Origin === 'Tratamento' ? gerarSenha(1) : refModalCentralizeSenha.current?.openModal()
        break;
      case 'Histórico':
        navigation.navigate('EndSinaisVitais', {
          cdPaciente: SinaisVitais?.cD_PACIENTE
            ? SinaisVitais?.cD_PACIENTE
            : PessoaFisica?.cD_PESSOA_FISICA,
          Tipo: 'Todos',
        });
        break;
      case 'Acompanhantes':
        navigation.navigate('AcompanhateSinaisVitais', {
          PessoaFisica: {
            nM_PESSOA_FISICA: SinaisVitais?.nM_PESSOA_FISICA
              ? SinaisVitais?.nM_PESSOA_FISICA
              : PessoaFisica?.nM_PESSOA_FISICA,
            dT_NASCIMENTO: SinaisVitais?.dT_NASCIMENTO
              ? SinaisVitais?.dT_NASCIMENTO
              : PessoaFisica?.dT_NASCIMENTO,
            cD_PESSOA_FISICA: SinaisVitais?.cD_PESSOA_FISICA
              ? SinaisVitais?.cD_PESSOA_FISICA
              : PessoaFisica?.cD_PESSOA_FISICA,
          },
        });
        break;
      case 'Observações':
        setTimeout(
          () => {
            refmodalObservacoes.current?.openModal();
          },
          Platform.OS === 'ios' ? 500 : 0,
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (SinaisVitais) {
      setAltura(SinaisVitais.qT_ALTURA_CM);
      setPeso(SinaisVitais.qT_PESO ? SinaisVitais.qT_PESO : 0);
      setTemperatura(SinaisVitais.qT_TEMP ? SinaisVitais.qT_TEMP : 0);
      setOxigenacao(
        SinaisVitais.qT_SATURACAO_O2 ? SinaisVitais.qT_SATURACAO_O2 : 0,
      );
      setObservacao(SinaisVitais.dS_OBSERVACAO);
      setDor(SinaisVitais.qT_ESCALA_DOR);
      setPad(SinaisVitais.qT_PA_DIASTOLICA);
      setPas(SinaisVitais.qT_PA_SISTOLICA);
      setFc(SinaisVitais.qT_FREQ_CARDIACA);
      setFr(SinaisVitais.qT_FREQ_RESP);
      setActiveShimmer(true);
    } else {
      GetSinaisVitais(PessoaFisica.cD_PESSOA_FISICA)
        .then(response => {
          if (response?.qT_ALTURA_CM) {
            setAltura(response.qT_ALTURA_CM);
          }
          setActiveShimmer(true);
        })
        .catch(() => {
          setActiveShimmer(true);
        });
    }
  }, []);

  const mediaPesoPaciente = (element: ISinaisVitais[]) => {
    let mediaPeso = 0;
    element?.map(item => {
      if (item?.qT_PESO) {
        mediaPeso = mediaPeso + item.qT_PESO;
      }
    });
    refPesoMediaPaciente.current = Math.round(mediaPeso / element.length);
  };

  const variacaoPercentualPaciente = () => {
    if (refPesoMediaPaciente.current && Peso) {
      const percentual = (Peso / refPesoMediaPaciente.current - 1) * 100;
      if (percentual > 10 || percentual < -10) {
        refModalCentralizeVariacaoPeso.current?.openModal();
      } else {
        refModalOptions.current?.openModal();
      }
    } else {
      refModalOptions.current?.openModal();
    }
  };

  const modalOptions = () => {
    refModalCentralizeVariacaoPeso.current?.closeModal();
    setTimeout(
      () => {
        refModalOptions.current?.openModal();
      },
      Platform.OS === 'ios' ? 500 : 0,
    );
  };

  useEffect(() => {
    if (historicoSinaisVitais) {
      mediaPesoPaciente(historicoSinaisVitais);
    }
    selected(0, 'scrollToIndex');
  }, [historicoSinaisVitais]);

  const refView0 = useRef<TouchableOpacity>(null);
  const refView1 = useRef<TouchableOpacity>(null);
  const refView2 = useRef<TouchableOpacity>(null);
  const refView3 = useRef<TouchableOpacity>(null);

  interface PropsPage {
    Index: number;
    Name: string;
    Ref: React.RefObject<TouchableOpacity>;
  }

  const [pages] = useState<PropsPage[]>([
    {
      Index: 0,
      Name: 'Geral',
      Ref: refView0,
    },
    {
      Index: 1,
      Name: 'Sinais vitais',
      Ref: refView1,
    },
    {
      Index: 2,
      Name: 'Registro de dor',
      Ref: refView2,
    },
    {
      Index: 3,
      Name: 'Escala Flebite',
      Ref: refView3,
    },
  ]);

  const renderItemMenu: ListRenderItem<any> = ({
    item: { Name, Index, Ref },
  }) => (
    <TouchableOpacity
      ref={Ref}
      style={styles.btn}
      onPress={() => selected(Index, 'scrollToIndex')}>
      <Text style={styles.textBtn}>{Name}</Text>
    </TouchableOpacity>
  );

  const getItemLayout = (data: any | null | undefined, index: number) => {
    return {
      length: deviceWidth.width,
      offset: deviceWidth.width * index,
      index,
    };
  };

  type scroll = 'scrollToIndex' | 'scrollToIndexMenu';

  const scrollToIndex = (index: number) => {
    refFlatlistPages.current?.scrollToIndex({ animated: true, index: index });
  };

  const scrollToIndexMenu = (index: number) => {
    refFlatlistMenu.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  };

  const selected = useCallback((index: number, type?: scroll) => {
    setPageSelected(index);
    if (type === 'scrollToIndex') {
      scrollToIndex(index);
    }
    scrollToIndexMenu(index);

    if (index === 0) {
      refView0.current?.setNativeProps({ style: styles.btnSelected });
      refView1.current?.setNativeProps({ style: styles.btn });
      refView2.current?.setNativeProps({ style: styles.btn });
      refView3.current?.setNativeProps({ style: styles.btn });
    }
    if (index === 1) {
      refView0.current?.setNativeProps({ style: styles.btn });
      refView1.current?.setNativeProps({ style: styles.btnSelected });
      refView2.current?.setNativeProps({ style: styles.btn });
      refView3.current?.setNativeProps({ style: styles.btn });
    }
    if (index === 2) {
      refView0.current?.setNativeProps({ style: styles.btn });
      refView1.current?.setNativeProps({ style: styles.btn });
      refView2.current?.setNativeProps({ style: styles.btnSelected });
      refView3.current?.setNativeProps({ style: styles.btn });
    }
    if (index === 3) {
      refView0.current?.setNativeProps({ style: styles.btn });
      refView1.current?.setNativeProps({ style: styles.btn });
      refView2.current?.setNativeProps({ style: styles.btn });
      refView3.current?.setNativeProps({ style: styles.btnSelected });
    }
  }, []);

  const filterMsnAlertAviso = (msn: string, tipo: 'Peso' | 'Altura') => {
    setMensAlerta(`${tipo} - ${msn}`);
    refModalOptionsRegra.current?.openModal();
  };

  const filterMsnAlertBloqueio = (msn: string, tipo: 'Peso' | 'Altura') => {
    setMensAlerta(`${tipo} - ${msn}`);
    RefNotificationSimple.current?.openModal();
  };

  const renderItemSinaisVitais: ListRenderItem<PropsPage> = ({
    item: { Name },
  }) => {
    switch (Name) {
      case 'Geral':
        return (
          <OptionAntropometria
            Altura={Altura}
            setAltura={setAltura}
            Peso={Peso}
            setPeso={setPeso}
            Temperatura={temperatura}
            setTemperatura={setTemperatura}
            Oxigigenacao={oxigenacao}
            setOxigigenacao={setOxigenacao}
            enviarAlertaAviso={(msn, tipo) => filterMsnAlertAviso(msn, tipo)}
            enviarAlertaBloqueio={(msn, tipo) => filterMsnAlertBloqueio(msn, tipo)}
          />
        );
      case 'Sinais vitais':
        return (
          <OptionSinaisVitais
            Pas={pas}
            setPas={setPas}
            Pad={pad}
            setPad={setPad}
            setPam={setPam}
            Fc={fc}
            setFc={setFc}
            Fr={fr}
            setFr={setFr}
          />
        );
      case 'Registro de dor':
        return <OptionRegistroDor Dor={dor} setDor={setDor} />;
      case 'Escala Flebite':
        return <OptionEscalaFlebite item={PessoaFisica} />;
      default:
        return <Text></Text>;
    }
  };

  const filterOptionsMenu = (): Array<string> => {
    switch (Origin) {
      case "Consulta": return ['Gerar senha', 'Histórico', 'Acompanhantes', 'Observações']
      case "Tratamento": return ['Gerar senha', 'Histórico', 'Acompanhantes', 'Observações']
      default: return ['Histórico', 'Acompanhantes', 'Observações']
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.MenuOptions}>
        <ModalAlertPaciente
          codPacient={
            SinaisVitais?.cD_PACIENTE
              ? SinaisVitais?.cD_PACIENTE
              : PessoaFisica?.cD_PESSOA_FISICA
          }
        />
        <MenuPopUp
          btnLabels={filterOptionsMenu()}
          onpress={item => MenuPopUpOptions(item)}
        />
      </View>
      <View style={styles.person}>
        <PessoaFisicaComponent
          PessoaFisica={{
            nM_PESSOA_FISICA: PessoaFisica?.nM_PESSOA_FISICA,
            dT_NASCIMENTO: PessoaFisica?.dT_NASCIMENTO,
          }}
        />
        {Origin == 'Tratamento_enfermagem' && (
          <View
            style={{ flexDirection: 'row', paddingVertical: RFPercentage(1) }}>
            <Text style={styles.label}>Número do Atendimento: </Text>
            <Text style={styles.text}>{PessoaFisica.nR_ATENDIMENTO}</Text>
          </View>
        )}
      </View>
      <View style={styles.box_sinais_vitais}>
        <View style={styles.box1}>
          <FlatList
            ref={refFlatlistMenu}
            data={pages}
            keyExtractor={item => item.Index.toString()}
            renderItem={renderItemMenu}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View style={styles.box2}>
          {activeShimmer ? (
            <FlatList
              ref={refFlatlistPages}
              data={pages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItemSinaisVitais}
              scrollEnabled={false}
              horizontal={true}
              pagingEnabled={false}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              scrollEventThrottle={16}
              getItemLayout={getItemLayout}
            />
          ) : (
            Array(4).fill(<ShimmerPaceHolderSNMG />)
          )}
        </View>
      </View>
      {keyboardHeight == 0 && pageSelected != 3 && (
        <BtnCentered
          SizeText={18}
          labelBtn={SinaisVitais ? 'Atualizar' : 'Adicionar'}
          onPress={() => variacaoPercentualPaciente()}
          enabled={ChangerProperty()}
        />
      )}
      <Loading ref={loadingRef} />
      <ModalCentralizedOptions
        ref={refModalOptions}
        message={
          SinaisVitais
            ? 'Deseja atualizar os Sinais Vitais ?'
            : 'Deseja inserir os Sinais Vitais ?'
        }
        onpress={() =>
          SinaisVitais ? SinaisVitaisUpdate() : PostSinaisVitais()
        }
      />
      <ModalCentralize ref={refModalCentralizeVariacaoPeso}>
        <CardAlertaPesoPaciente
          historicoSinaisVitais={historicoSinaisVitais?.filter(
            (item, index) => index <= 2,
          )}
          onpress={() => modalOptions()}
        />
      </ModalCentralize>
      <ModalCentralize ref={refmodalObservacoes}>
        <CardObservacao
          observacao={observacao}
          setObservacao={setObservacao}
          onpress={() => refmodalObservacoes.current?.closeModal()}
        />
      </ModalCentralize>
      <ModalCentralize style={{ width: RFPercentage(30), height: RFPercentage(30), justifyContent: 'space-around' }} ref={refModalCentralizeSenha}>
        <BtnCentered labelBtn='Normal' SizeText={18} onPress={() => gerarSenha(PessoaFisica.seQ_FILAS_SENHA[0])} enabled={true} />
        <BtnCentered labelBtn='Prioridade' SizeText={18} onPress={() => gerarSenha(PessoaFisica.seQ_FILAS_SENHA[1])} enabled={true} />
      </ModalCentralize>
      <NotificationSimple ref={RefNotificationSimple} message={msnAlert} onpress={() => {
        msnAlert?.includes('Peso') ? setPeso(0) : setAltura(0)
      }} />
      <ModalCentralizedOptions
        ref={refModalOptionsRegra}
        message={msnAlert ?? 'Verifique os parâmetros dos sinais vitais!'}
        onpress={() => console.log('Salvar')}
        onpressCancel={() => {
          msnAlert?.includes('Peso') ? setPeso(0) : setAltura(0)
        }}
      />
    </View>
  );
};

export default UpdateSinais;
