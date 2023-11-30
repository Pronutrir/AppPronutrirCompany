import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CarouselInstagram from '../../components/carrosel/Carousel_Instagram';
import createStyles from './style';
import SinaisVitaisSvg from '../../assets/svg/sinaisVitais.svg';
import ConsultaMarcadasImg from '../../assets/svg/ConsultasMarcadas.svg';
import QuimioSvg from '../../assets/svg/quimioterapia.svg';
import MedicoImg from '../../assets/svg/medico.svg';
import AtendimentoSvg from '../../assets/svg/atendimento.svg';
import RelogioSvg from '../../assets/svg/relogio.svg';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import BtnDashboardComponent from './components/btnDashboardComponent/btnDashboardComponent';
import { useNavigation } from '@react-navigation/native';
import SinaisVitaisContext from '../../contexts/sinaisVitaisContext';
import AuthContext from '../../contexts/auth';
import SelectedDropdown from '../../components/selectedDropdown/SelectedDropdown';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useUnidades, IUnidade } from '../../hooks/useEstabelecimentos';
import { saveUnidade } from '../../utils';
import { useQueryClient } from 'react-query';

const DashBoard: React.FC = () => {
  const navigation = useNavigation();
  const styles = useThemeAwareObject(createStyles);
  const { ValidationAutorizeTriagem, ValidationAutorizeEnfermagem } =
    useContext(SinaisVitaisContext);
  const {
    ValidationAutorizeEvolucao,
    stateAuth: { UnidadeSelected },
    dispatchAuth,
  } = useContext(AuthContext);

  const { data: unidades } = useUnidades();

  const queryClient = useQueryClient();

  const SelectedUnidadeApp = async (item: IUnidade) => {
    if (UnidadeSelected?.cD_ESTABELECIMENTO !== item.cD_ESTABELECIMENTO) {
      setTimeout(() => {
        dispatchAuth({ type: 'setUnidadeDaSh', payload: item });
      }, 500);
      await saveUnidade(item);
      queryClient.clear();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.selectedUnidade}>
          <SelectedDropdown
            DropDownStyle={styles.DropDownStyle}
            placeholder={'UNIDADE'}
            data={unidades}
            maxHeight={RFPercentage(20)}
            ContainerStyle={styles.ContainerStyle}
            value={{
              index: UnidadeSelected?.cD_ESTABELECIMENTO,
              label: UnidadeSelected?.dS_ESTABELECIMENTO,
              value: UnidadeSelected,
            }}
            onChange={({ value }) => SelectedUnidadeApp(value)}
          />
        </View>
        <View style={styles.box1}>
          <View style={styles.boxPost}>
            <Text style={styles.textPost}> Nossas Postagens </Text>
          </View>
          <CarouselInstagram />
        </View>
        <View style={styles.box2}>
          <BtnDashboardComponent
            disabled={!ValidationAutorizeTriagem()}
            onpress={() => navigation.navigate('SinaisVitais')}
            ImgSVG={SinaisVitaisSvg}
            label={'Sinais Vitais'}
          />
          <BtnDashboardComponent
            disabled={!ValidationAutorizeEvolucao()}
            onpress={() => navigation.navigate('IndexEvolucao')}
            ImgSVG={ConsultaMarcadasImg}
            label={'Evolução'}
          />
          <BtnDashboardComponent
            disabled={true}
            onpress={() => navigation.navigate('Exame')}
            ImgSVG={MedicoImg}
            label={'Exames'}
          />
          <BtnDashboardComponent
            disabled={!ValidationAutorizeTriagem()}
            onpress={() => navigation.navigate('Tratamento_quimio')}
            ImgSVG={QuimioSvg}
            label={'Tratamento Quimioterapia'}
          />
          <BtnDashboardComponent
            disabled={!ValidationAutorizeTriagem()}
            onpress={() => navigation.navigate('PainelSenha')}
            ImgSVG={AtendimentoSvg}
            label={'Painel de senhas'}
          />
          <BtnDashboardComponent
            disabled={!ValidationAutorizeEnfermagem()}
            onpress={() => navigation.navigate('Stopwatch')}
            ImgSVG={RelogioSvg}
            label={'Stopwatch'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DashBoard;
