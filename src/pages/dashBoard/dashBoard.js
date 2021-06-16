import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import Carousel from '../../componentes/Carousel_Images';
import * as Animatable from 'react-native-animatable';

import Api from '../../services/api';
import styles from './style';
import AuthContext from '../../contexts/auth';
import ErrorContext from '../../contexts/errorNotification';
import AgendaConsultaContext from '../../contexts/agendaConsultas';
import AgendarConsultaImg from '../../assets/svg/AgendarConsulta.svg';
import ConsultaMarcadasImg from '../../assets/svg/ConsultasMarcadas.svg';
import LembreteImg from '../../assets/svg/lembrete.svg';
import MedicoImg from '../../assets/svg/medico.svg';
import QuimioTerapiaImg from '../../assets/svg/quimioterapia.svg';
import PilulaComprimidoImg from '../../assets/svg/pilula-e-comprimido.svg';
import HospitalLocationSvg from '../../assets/svg/hospitalLocation.svg';
import BatePapoImg from '../../assets/svg/batePapo.svg';
import MedicoColorimg from '../../assets/svg/medicoColor.svg';
import moment from 'moment';

export default function dashBoard({ navigation }) {

    const size = Dimensions.get('screen').width / 10

    const { addError } = useContext(ErrorContext);
    const { stateAuth } = useContext(AuthContext);
    const { usertasy } = stateAuth;
    const { dispathConvenios } = useContext(AgendaConsultaContext);
    const [proximaconsulta, setProximaConsulta] = useState(null);
    const [saudacao, setSaudacao] = useState();
    const [aviso, setAviso] = useState();

    const [flag, setFlag] = useState(false);

    // saudacão para usuário bom dia, boa tarde, boa noite
    const MsnPeriodo = () => {
        let Hora = moment().format('HH:mm A');
        if (Hora.includes("PM")) {
            let _hora = moment().format('HH:mm');
            if (_hora > '18:00') {
                setSaudacao('Boa noite!');
            } else {
                setSaudacao('Boa Tarde!');
            }
        }
        if (Hora.includes("AM")) {
            setSaudacao('Bom Dia!');
        }
    }

    // consulta a proxima consulta do cliente
    const MsnAviso = async () => {

        if (usertasy && usertasy.nR_CPF) {

            Api.get(`AgendaConsultas/filtroAgendamentosPacientes/${usertasy.nR_CPF}`).then(response => {
                const { result } = response.data;
                if (result) {
                    const order_result = result.sort(function (a, b) {
                        return a.dT_AGENDA < b.dT_AGENDA ? -1 : a.dT_AGENDA > b.dT_AGENDA ? 1 : 0
                    })

                    let consultaMaisProxima = order_result.filter((element, index) => moment(element.dT_AGENDA).format('YYYY-MM-DD') >= moment().format('YYYY-MM-DD') && element.iE_STATUS_AGENDA == 'N')

                    setProximaConsulta(consultaMaisProxima.find((element, index) => index === 0));
                }
            }).catch(error => {
                addError(`Não foi possivel acessar os avisos dos agendamentos! tente mais tarde - ${error.message}`);
            });
        }
    }

    useEffect(() => {
        MsnAviso();
        MsnPeriodo();
    }, [usertasy])

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.box1}>
                    <View style={styles.boxPost}>
                        <Text style={styles.textPost}> Nossas Postagens </Text>
                    </View>
                    <Carousel />
                </View>
                <View style={styles.box2}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AgendarConsultas01')}>
                        <View style={styles.img_btnHotrizontal}>
                            <AgendarConsultaImg fill={'#748080'} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Agendar Consulta</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('ConsultasMarcadas')}>
                        <View style={styles.img_btnHotrizontal}>
                            <ConsultaMarcadasImg fill={'#748080'} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Consultas Marcadas</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('LembretesNotificacoes')}>
                        <View style={styles.img_btnHotrizontal}>
                            <LembreteImg fill={'#748080'} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Lembrete Notificações</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.box2}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('EquipeMedica')}>
                        <View style={styles.img_btnHotrizontal}>
                            <MedicoImg fill={'#748080'} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Equipe Medica</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('menuUnidades')}>
                        <View style={styles.img_btnHotrizontal}>
                            <HospitalLocationSvg fill={'#748080'} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Nossas Unidades</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Medicamentos')}>
                        <View style={styles.img_btnHotrizontal}>
                            <PilulaComprimidoImg fill={'#748080'} width={size} height={size} />
                        </View>
                        <View style={styles.box_btnHorizontal}>
                            <Text style={styles.text_btnHorizontal}>Medicamentos</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Animatable.View animation="bounceInLeft" easing='ease-in-out' iterationCount={1} delay={3000} style={styles.box4}>
                    <View style={styles.box4_1}>
                        {
                            proximaconsulta &&
                            <Animatable.View animation="bounceOutLeft" easing='ease-in-out' iterationCount={1} delay={6000} style={styles.Animatable} >
                                <View style={styles.box4_1_1}>
                                    <Text style={[styles.box4_text, { fontWeight: 'bold' }]}>{saudacao}</Text>
                                    <Text style={styles.box4_text}>
                                        {
                                            moment().format('DD/MM/YYYY') === moment(proximaconsulta.dT_AGENDA).format('DD/MM/YYYY') ?
                                                `Sua consulta está marcada para Hoje ${moment(proximaconsulta.dT_AGENDA).format('DD/MM/YYYY [às] HH:mm [hrs]')}`
                                                :
                                                `Sua Proxima consulta está marcada para o Dia ${moment(proximaconsulta.dT_AGENDA).format('DD/MM/YYYY [às] HH:mm [hrs]')}`
                                        }
                                    </Text>
                                </View>
                                <View style={styles.box4_1_2}>
                                    <MedicoColorimg width={35} height={35} />
                                </View>
                            </Animatable.View>
                        }
                    </View>
                    <View style={styles.box4_2}>
                        {/*  <TouchableOpacity style={styles.box4_2_img}>
                        <BatePapoImg fill={'#748080'} width={35} height={35} />
                    </TouchableOpacity> */}
                    </View>
                </Animatable.View>
                <ScrollView showsHorizontalScrollIndicator={false} style={styles.box3}
                    horizontal={true}
                    pagingEnabled={true}
                    persistentScrollbar={true}
                >
                    <View style={styles.box_3_1}>
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
                    </View>
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


