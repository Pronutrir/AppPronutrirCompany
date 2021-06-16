import React, { useContext, useState, useRef } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';

import TouchableShowHide from '../../../componentes/TouchableShowHide';
import styles from './style'
import AgendaConsultaContext from '../../../contexts/agendaConsultas';
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import Api from '../../../services/api';

export default function agendarConsulta02({ navigation, route }) {

    const { addError } = useContext(ErrorContext);
    const { stateAuth } = useContext(AuthContext);
    const { stateConsultas, dispathConsultas } = useContext(AgendaConsultaContext);
    const [next, setNext] = useState(true);
    const scrollRef = useRef();

    const handleClickScroll = () => {
        scrollRef.current.scrollToEnd({duration: 500, animated: true}, 1000);
    }

    const filtroMedicoConvenios = async (nomeMedico) => {

        function atendeConvenio(value) {
            const { Convenio } = stateConsultas;
            return value.cD_CONVENIO === Convenio.cD_CONVENIO
        }

        return Api.get(`Convenios/filtroConvenioGeral?nomeGuerraMedico=${nomeMedico}`).then(response => {
            const { result } = response.data;
            return result.filter(atendeConvenio)
        }).catch(error => {
            addError(`Não foi possivel acessar os convênios tente mais tarde - ${error.message}`);
        })
    }

    const addMedico = async item => {
        if (item.nM_GUERRA != stateConsultas.Medico.nM_GUERRA) {
            setNext(false);
            if (item && stateConsultas.Option === 1) {
                setNext(true);
                dispathConsultas({ type: 'setMedico', medico: item });
            }
            if (stateConsultas.Option === 2) {
                const conveniomedico = await filtroMedicoConvenios(item.nM_GUERRA);
                const { Convenio } = stateConsultas;
                if ((conveniomedico && conveniomedico.length > 0) || Convenio.cD_CONVENIO === 1) {
                    setNext(true);
                    dispathConsultas({ type: 'setMedico', medico: item });
                    dispathConsultas({ type: 'setEspecialidadeOption2', especialidade: item.dS_ESPECIALIDADE });
                } else {
                    Alert.alert(
                        'Aviso',
                        'O Medico(a) selecionado não atende esse Convênio',
                        [{ text: 'OK' }],
                        { cancelable: false },
                    )
                }
            }
        }
    }

    const btnNext = () => {
        navigation.navigate('AgendarConsultas03')
    }

    const validation = () => {
        if ((stateConsultas.Especialidade && stateConsultas.Agenda) && (stateConsultas.Unidade && stateConsultas.Medico) && next) {
            return true;
        } else {
            return false;
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <View style={styles.box1_item1}>
                    <Text style={styles.text}>Consultas marcadas</Text>
                    <Text style={styles.text}>Setor: Consultas</Text>
                    <Text style={styles.text}>Especialidade: {stateConsultas.Especialidade}</Text>
                </View>
                <View style={styles.box1_item2}>
                    <View style={styles.btnConsultas}>
                        <Text style={{ color: '#fff' }}>1</Text>
                    </View>
                </View>
            </View>
            <View style={styles.box2}>
                <View style={styles.box2_item1}>
                    <Text style={styles.options1Text}>2</Text>
                </View>
                <ScrollView ref={scrollRef}
                    style={styles.box2_item2}>
                    <TouchableShowHide
                        numeroConsulta={1}
                        especialidade={stateConsultas.Especialidade}
                        options1={stateConsultas.Medicos}
                        selection1={addMedico}
                        options2={stateConsultas.unidades}
                        itemSelected1={next}
                        itemSelected2={stateConsultas.Unidade}
                        actionScroll={handleClickScroll}
                    />
                    <View style={styles.box2_item3}>
                        <TouchableOpacity
                            disabled={!validation()}
                            style={styles.btnPage2} onPress={() => btnNext()}>
                            <Image style={validation() ? styles.img : styles.imgDisabled} source={require('../../../assets/imagens/seta-para-baixo.png')} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}
