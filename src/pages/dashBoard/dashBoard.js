import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import CarouselInstagram from '../../components/carrosel/Carousel_Instagram';
import createStyles from './style';
import SinaisVitaisSvg from '../../assets/svg/sinaisVitais.svg';
import ConsultaMarcadasImg from '../../assets/svg/ConsultasMarcadas.svg';
import LembreteImg from '../../assets/svg/lembrete.svg';
import MedicoImg from '../../assets/svg/medico.svg';
import QuimioTerapiaImg from '../../assets/svg/quimioterapia.svg';
import PilulaComprimidoImg from '../../assets/svg/pilula-e-comprimido.svg';
import HospitalLocationSvg from '../../assets/svg/hospitalLocation.svg';
import BatePapoImg from '../../assets/svg/batePapo.svg';
import MedicoColorimg from '../../assets/svg/medicoColor.svg';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

export default function dashBoard({ navigation }) {

    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);
    const size = Dimensions.get('screen').width / 10

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
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("SinaisVitais")}>
                        <View style={styles.img_btnHotrizontal}>
                            <SinaisVitaisSvg fill={theme.colors.TEXT_SECONDARY} width={size + 10} height={size + 10} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Sinais Vitais</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDisabled} onPress={() => {}}>
                        <View style={styles.img_btnHotrizontal}>
                            <ConsultaMarcadasImg fill={theme.colors.TEXT_SECONDARY} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Consultas Marcadas</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDisabled} onPress={() => {}}>
                        <View style={styles.img_btnHotrizontal}>
                            <LembreteImg fill={theme.colors.TEXT_SECONDARY} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Lembrete Notificações</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.box2}>
                    <TouchableOpacity style={styles.btnDisabled} onPress={() => {}}>
                        <View style={styles.img_btnHotrizontal}>
                            <MedicoImg fill={theme.colors.TEXT_SECONDARY} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Equipe Medica</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDisabled} onPress={() => {}}>
                        <View style={styles.img_btnHotrizontal}>
                            <HospitalLocationSvg fill={theme.colors.TEXT_SECONDARY} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Nossas Unidades</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnDisabled} onPress={() => {}}>
                        <View style={styles.img_btnHotrizontal}>
                            <PilulaComprimidoImg fill={theme.colors.TEXT_SECONDARY} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Medicamentos</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} style={styles.box3}
                    horizontal={true}
                    pagingEnabled={true}
                    persistentScrollbar={true}
                >
                    {/* <View style={styles.box_3_1}>
                        <TouchableOpacity style={styles.btnHorizontal} onPress={() => navigation.navigate('ConsultasMarcadas', { dias: "seteDias" })}>
                            <Image style={styles.imgBtnHorizoltal} source={require('../../assets/imagens/medical.jpg')} />
                        </TouchableOpacity>
                        <Text style={styles.text}>Consultas Recentes</Text>
                    </View>
                    <View style={[styles.box_3_1, { opacity: 0.5 }]}>
                        <TouchableOpacity disabled={true} style={styles.btnHorizontal} onPress={() => navigation.navigate('MedicamentosRecente')}>
                            <Image style={styles.imgBtnHorizoltal} source={require('../../assets/imagens/medications.jpg')} />
                        </TouchableOpacity>
                        <Text style={styles.text}>Medicamentos Recentes</Text>
                    </View> */}
                </ScrollView>
            </ScrollView>
        </View>
    )
}


