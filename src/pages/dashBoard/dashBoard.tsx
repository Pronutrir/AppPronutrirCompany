import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CarouselInstagram from '../../components/carrosel/Carousel_Instagram';
import createStyles from './style';
import SinaisVitaisSvg from '../../assets/svg/sinaisVitais.svg';
import ConsultaMarcadasImg from '../../assets/svg/ConsultasMarcadas.svg';
import LembreteImg from '../../assets/svg/lembrete.svg';
import MedicoImg from '../../assets/svg/medico.svg';
import PilulaComprimidoImg from '../../assets/svg/pilula-e-comprimido.svg';
import HospitalLocationSvg from '../../assets/svg/hospitalLocation.svg';
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
    const { ValidationAutorizeTriagem } = useContext(SinaisVitaisContext);
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
                        disabled={false}
                        onpress={() => navigation.navigate('Exame')}
                        ImgSVG={MedicoImg}
                        label={'Exames'}
                    />
                    <BtnDashboardComponent
                        disabled={true}
                        onpress={() => {
                            ('');
                        }}
                        ImgSVG={LembreteImg}
                        label={'Alertas'}
                    />
                    <BtnDashboardComponent
                        disabled={true}
                        onpress={() => {
                            ('');
                        }}
                        ImgSVG={HospitalLocationSvg}
                        label={'Unidades'}
                    />
                    <BtnDashboardComponent
                        disabled={true}
                        onpress={() => {
                            ('');
                        }}
                        ImgSVG={PilulaComprimidoImg}
                        label={'Medicamentos'}
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default DashBoard;
