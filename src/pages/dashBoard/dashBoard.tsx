import React, { useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
} from 'react-native';
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

const DashBoard: React.FC = () => {

    const navigation = useNavigation();
    const styles = useThemeAwareObject(createStyles);
    const { ValidationAutorizeTriagem } = useContext(SinaisVitaisContext);

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
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
                        disabled={true}
                        onpress={() => {''}}
                        ImgSVG={ConsultaMarcadasImg}
                        label={'Consultas Marcadas'}
                    />
                     <BtnDashboardComponent
                        disabled={true}
                        onpress={() => {''}}
                        ImgSVG={LembreteImg}
                        label={'Alertas'}
                    />
                     <BtnDashboardComponent
                        disabled={true}
                        onpress={() => {''}}
                        ImgSVG={MedicoImg}
                        label={'Médicos'}
                    />
                     <BtnDashboardComponent
                        disabled={true}
                        onpress={() => {''}}
                        ImgSVG={HospitalLocationSvg}
                        label={'Unidades'}
                    />
                     <BtnDashboardComponent
                        disabled={true}
                        onpress={() => {''}}
                        ImgSVG={PilulaComprimidoImg}
                        label={'Medicamentos'}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

export default DashBoard;
