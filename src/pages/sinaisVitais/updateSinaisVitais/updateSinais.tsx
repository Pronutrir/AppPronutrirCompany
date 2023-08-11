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
import Loading from '../../../components/Loading/Loading';
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
import OptionMonitorizacaoGeral from '../components/cardOptionsSinaisVitais/OptionMonitorizacaoGeral';
import OptionSinaisVitais from '../components/cardOptionsSinaisVitais/OptionSinaisVitais';
import OptionRegistroDor from '../components/cardOptionsSinaisVitais/OptionRegistroDor';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'UpdateSinais'>;
interface Props {
  route: ProfileScreenRouteProp;
}

const UpdateSinais: React.FC<Props> = ({
  route: {
    params: { PessoaFisica, SinaisVitais, GeraAtendimento },
  },
}: Props) => {
  const deviceWidth = useWindowDimensions();

  const refmodalObservacoes = useRef<ModalHandles>(null);

  const refPesoMediaPaciente = useRef<number | null>(null);

  const refFlatlistMenu = useRef<FlatList<number>>(null);

  const refFlatlistPages = useRef<FlatList<PropsPage>>(null);

  const styles = useThemeAwareObject(createStyles);

  const navigation = useNavigation();
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

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeShimmer, setActiveShimmer] = useState<boolean>(false);

  const refModalOptions = useRef<ModalHandlesOptions>(null);
  const refModalCentralizeVariacaoPeso = useRef<ModalHandlesOptions>(null);

  const [Peso, setPeso] = useState(0);
  const [Altura, setAltura] = useState(0);
  const [oxigenacao, setOxigenacao] = useState(0);
  const [observacao, setObservacao] = useState<string>('');
  const [dor, setDor] = useState(0);

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
    setActiveModal(true);
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
    setActiveModal(false);
    navigation.goBack();
  };

  const PostSinaisVitais = async () => {
    setActiveModal(true);
    const dataSinaisVitais: SinaisVitaisPost = {
      cD_PACIENTE: PessoaFisica.cD_PESSOA_FISICA,
      qT_ALTURA_CM: Altura <= 0 ? null : Altura,
      qT_PESO: Peso <= 0 ? null : Peso,
      qT_SATURACAO_O2: oxigenacao <= 50 ? null : oxigenacao,
      qT_TEMP: temperatura <= 30 ? null : temperatura,
      cD_ESCALA_DOR: 'FEVA',
      qT_ESCALA_DOR: dor ? dor : null,
      qT_FREQ_CARDIACA: fc <= 0 ? null : fc,
      qT_FREQ_RESP: fr <= 0 ? null : fr,
      qT_PAM: pam <= 0 ? null : pam,
      qT_PA_DIASTOLICA: pad <= 40 ? null : pad,
      qT_PA_SISTOLICA: pas <= 40 ? null : pas,
      dS_OBSERVACAO: observacao ? observacao : null,
      cD_ESTABELECIMENTO: PessoaFisica.cD_ESTABELECIMENTO,
      cD_MEDICO_RESP: PessoaFisica.cD_MEDICO_RESP ?? null,
    };

    if (GeraAtendimento) {
      await AddSinaisVitaisAtendimento(dataSinaisVitais);
    } else {
      await AddSinaisVitais(dataSinaisVitais);
    }
    refetchSinaisVitais;
    setActiveModal(false);
    navigation.goBack();
  };

  const MenuPopUpOptions = async (itemSelected: string) => {
    switch (itemSelected) {
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
      Name: 'Antropometria',
      Ref: refView0,
    },
    {
      Index: 1,
      Name: 'Sinais vitais',
      Ref: refView1,
    },
    {
      Index: 2,
      Name: 'Monitorização geral',
      Ref: refView2,
    },
    {
      Index: 3,
      Name: 'Registro de dor',
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

  const selected = useCallback((index: number, type: scroll) => {
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

  const renderItemSinaisVitais: ListRenderItem<PropsPage> = ({
    item: { Name },
  }) => {
    switch (Name) {
      case 'Antropometria':
        return (
          <OptionAntropometria
            Altura={Altura}
            setAltura={setAltura}
            Peso={Peso}
            setPeso={setPeso}
          />
        );
      case 'Monitorização geral':
        return (
          <OptionMonitorizacaoGeral
            Oxigigenacao={oxigenacao}
            setOxigigenacao={setOxigenacao}
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
            Temperatura={temperatura}
            setTemperatura={setTemperatura}
          />
        );
      case 'Registro de dor':
        return <OptionRegistroDor Dor={dor} setDor={setDor} />;
      default:
        return <Text></Text>;
        break;
    }
  };

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
          btnLabels={['Histórico', 'Acompanhantes', 'Observações']}
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
            Array(2).fill(<ShimmerPaceHolderSNMG />)
          )}
        </View>
      </View>
      <BtnCentered
        SizeText={18}
        labelBtn={SinaisVitais ? 'Atualizar' : 'Adicionar'}
        //onPress={() => setActiveModalOptions(true)}
        onPress={() => variacaoPercentualPaciente()}
        enabled={ChangerProperty()}
      />
      <Loading activeModal={activeModal} />
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
    </View>
  );
};

export default UpdateSinais;
