import React, { useState, useContext, useEffect, useRef } from 'react';
import { View, ScrollView, Text, Platform } from 'react-native';
import createStyles from './style';
import SlideRanger from '../../../components/Slider/SlideRanger';
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
import moment from 'moment';
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
import CardObservacao from '../../../components/Cards/cardlObservacao';
import { useSenhaAtendimento } from '../../../hooks/usePainelAtendimento';
import Checkbox from '../../../components/checkbox/checkbox';
import { RFPercentage } from 'react-native-responsive-fontsize';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'UpdateSinais'>;
interface Props {
  route: ProfileScreenRouteProp;
}

const UpdateSinais: React.FC<Props> = ({
  route: {
    params: { PessoaFisica, SinaisVitais, GeraSenhaOncologia },
  },
}: Props) => {
  const refmodalObservacoes = useRef<ModalHandles>(null);

  const refPesoMediaPaciente = useRef<number | null>(null);

  const [prioridade, setPrioridade] = useState(1);

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

  const { mutateAsync } = useSenhaAtendimento({
    prioridade: prioridade,
    servico: 3,
    unidade: 1,
    cliente: {
      documento: PessoaFisica?.nR_ATENDIMENTO?.toString(),
      nome: PessoaFisica.nM_PESSOA_FISICA,
    },
  });

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeShimmer, setActiveShimmer] = useState<boolean>(false);

  const refModalOptions = useRef<ModalHandlesOptions>(null);
  const refModalOptionsAtendimento = useRef<ModalHandlesOptions>(null);
  const refModalCentralizeVariacaoPeso = useRef<ModalHandlesOptions>(null);

  const [Peso, setPeso] = useState(0);
  const [Altura, setAltura] = useState(0);
  const [temperatura, setTemperatura] = useState(0);
  const [oxigenacao, setOxigenacao] = useState(0);
  const [observacao, setObservacao] = useState<string>('');

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
      dS_OBSERVACAO: observacao ? observacao : null,
      cD_ESTABELECIMENTO: PessoaFisica.cD_ESTABELECIMENTO,
      cD_MEDICO_RESP: PessoaFisica.cD_MEDICO_RESP,
    };

    if (GeraSenhaOncologia) {
      const result = await AddSinaisVitaisAtendimento(dataSinaisVitais);
      if (result) PessoaFisica.nR_ATENDIMENTO = result.nR_ATENDIMENTO;
    } else {
      await AddSinaisVitais(dataSinaisVitais);
    }
    refetchSinaisVitais;
    setActiveModal(false);
    /* GeraSenhaOncologia
            ? refModalOptionsAtendimento.current?.openModal()
            : navigation.goBack(); */
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

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <ModalAlertPaciente
          codPacient={
            SinaisVitais?.cD_PACIENTE
              ? SinaisVitais?.cD_PACIENTE
              : PessoaFisica?.cD_PESSOA_FISICA
          }
        />
        <View>
          <MenuPopUp
            btnLabels={['Histórico', 'Acompanhantes', 'Observações']}
            onpress={item => MenuPopUpOptions(item)}
          />
        </View>
      </View>
      <ScrollView style={styles.box}>
        <View style={styles.item1}>
          <View style={styles.boxLabel}>
            <Text style={styles.label}>Nome: </Text>
            <Text style={styles.text}>
              {SinaisVitais?.nM_PESSOA_FISICA
                ? SinaisVitais?.nM_PESSOA_FISICA
                : PessoaFisica?.nM_PESSOA_FISICA}
            </Text>
          </View>
          <View style={styles.boxLabel}>
            <Text style={styles.label}>Nascimento: </Text>
            <Text style={styles.text}>
              {moment(
                SinaisVitais?.dT_NASCIMENTO
                  ? SinaisVitais?.dT_NASCIMENTO
                  : PessoaFisica?.dT_NASCIMENTO,
              ).format('DD-MM-YYYY')}
            </Text>
          </View>
        </View>
        <View>
          {activeShimmer ? (
            <>
              <View style={styles.item2}>
                <SlideRanger
                  label={'Altura'}
                  medida={'cm'}
                  step={1}
                  valueMin={0}
                  valueMax={300}
                  valueRanger={Altura}
                  setValueRanger={value => setAltura(value)}
                />
              </View>
              <View style={styles.item2}>
                <SlideRanger
                  label={'Peso'}
                  medida={'kg'}
                  step={0.1}
                  valueMin={0}
                  valueMax={200}
                  valueRanger={Peso}
                  setValueRanger={value => setPeso(value)}
                />
              </View>
              <View style={styles.item2}>
                <SlideRanger
                  label={'Temperatura'}
                  medida={'°C'}
                  step={0.1}
                  valueMin={30}
                  valueMax={42}
                  valueRanger={temperatura}
                  setValueRanger={value => setTemperatura(value)}
                />
              </View>
              <View style={styles.item2}>
                <SlideRanger
                  label={'Oximetria'}
                  medida={'SpO²'}
                  step={1}
                  valueMin={50}
                  valueMax={100}
                  valueRanger={oxigenacao}
                  setValueRanger={value => setOxigenacao(value)}
                />
              </View>
              <View style={styles.item3}>
                <BtnCentered
                  SizeText={18}
                  labelBtn={SinaisVitais ? 'Atualizar' : 'Adicionar'}
                  //onPress={() => setActiveModalOptions(true)}
                  onPress={() => variacaoPercentualPaciente()}
                  enabled={ChangerProperty()}
                />
              </View>
            </>
          ) : (
            Array(4).fill(<ShimmerPaceHolderSNMG />)
          )}
        </View>
      </ScrollView>
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
      <ModalCentralizedOptions
        ref={refModalOptionsAtendimento}
        message={'Gerar senha para atendimento ?'}
        onpress={() => {
          mutateAsync();
          navigation.goBack();
        }}
        onStartShouldResponder={false}
        onpressCancel={() => navigation.goBack()}>
        <View
          style={{
            flexDirection: 'row',
            margin: RFPercentage(3),
          }}>
          <Checkbox
            isChecked={prioridade == 1}
            onPress={() => setPrioridade(1)}
            text="Normal"
          />
          <Checkbox
            isChecked={prioridade == 2}
            onPress={() => setPrioridade(2)}
            text="Prioridade"
          />
        </View>
      </ModalCentralizedOptions>
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
          onpress={() => refmodalObservacoes.current?.closeModal()}
        />
      </ModalCentralize>
    </View>
  );
};

export default UpdateSinais;
