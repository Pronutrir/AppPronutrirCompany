import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import ExcluirSvg from '../../../assets/svg/excluir.svg';
import RelogioSvg from '../../../assets/svg/relogio.svg';
import ComprimidoSvg from '../../../assets/svg/comprimido.svg';
import EditarSvg from '../../../assets/svg/editar.svg';
import { ConversorMedicamento } from '../../../services/conversorUnidadeMedicamento';
import ModalCentralized from '../../../components/Modais/ModalCentralized';
import styles from './style';
import propTypes from 'prop-types';
import moment from 'moment';
import ModalBottom from '../../../components/Modais/ModalBottom';
import BtnRetangular from '../../../components/buttons/BtnRetangular';

const ModalMedicamentoAtivo = ({ item, activeModal, setActiveModal, action }) => {

    const navigation = useNavigation();
    const widthBtn = Dimensions.get('screen').width / 15;
    const [monthWeek, setMonthWeek] = useState(moment().format('ddd, D [de] MMMM'));
    const [activeModalBottom, setActiveModalBotttom] = useState(false);

    const headerChanger = (date) => {
        const now = moment().format('dddd, D [de] MMMM');
        const selected = moment(date).format('dddd, D [de] MMMM');
        const tomorrow = moment().add(1, 'day').format('dddd, D [de] MMMM');
        const yesterday = moment().subtract(1, 'day').format('dddd, D [de] MMMM');

        let headerLabel = selected;

        if (selected == now) {
            headerLabel = moment(date).format('[Hoje], DD [de] MMMM');
        }

        if (selected == tomorrow) {
            headerLabel = moment(date).format('[Amanhã], DD [de] MMMM');
        }

        if (selected == yesterday) {
            headerLabel = moment(date).format('[Ontem], DD [de] MMMM');
        }

        setMonthWeek(headerLabel);
    }

    const getHorarios = (horarios) => {
        var horarios = horarios.split(",");
        var stringHorarios = horarios.join(", ");
        return stringHorarios;
    }

    const getDiasSemana = (item) => {

        const DiasSemana = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo' ];

        var _DiasSemana = DiasSemana.filter(element => item.includes(element));
        var result = _DiasSemana.join(', ');

        return result;
    }

    const Cancelar = () => {
        setActiveModalBotttom(false);
    }

    const Excluir = () => {
        setActiveModalBotttom(false);
        action(item);
    }

    const Editar = () => {
        setActiveModal(false);
        navigation.navigate('updateMedicamento', item)
    }

    const Modal = () => (
        <ModalBottom activeModal={activeModalBottom} setActiveModal={setActiveModalBotttom} style={styles.teste}>
            <View>
                <Text style={styles.textTitulo}>Deseja realmente excluir esse medicamento?</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
               <BtnRetangular labelBtn={"Cancelar"} fontSize={16} onPress={() => Cancelar()}/>
               <BtnRetangular labelBtn={"Excluir"} fontSize={16} onPress={() => Excluir()}/>
            </View>
        </ModalBottom>
    )

    useEffect(() => {
        headerChanger(item.data);
    }, [item])

    return (
        <ModalCentralized
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            modal={<Modal/>}
        >
            <View style={styles.container}>
                <View style={styles.box1}>

                </View>
                <View style={styles.box2}>
                    <View style={styles.item1}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
                            <ComprimidoSvg fill={'#748080'} width={widthBtn} height={widthBtn} />
                            <Text style={styles.textTitulo}>{item.dS_MEDICAMENTO}</Text>
                        </View>
                        <Text style={styles.text}>{monthWeek}</Text>
                    </View>
                    <View style={styles.item2}>
                        <Text style={[styles.text, { fontWeight: 'bold' }]}>Dias da semana: </Text>
                        <Text style={styles.text}>{item.dS_INTERVALO_ITEM ? getDiasSemana(item.dS_INTERVALO_ITEM) : 'Todos os dias'}</Text>
                    </View>
                    <View style={styles.item3}>
                        <Text style={[styles.text, { fontWeight: 'bold' }]}>Horario(s): </Text>
                        <Text style={styles.text}>{getHorarios(item.dS_HORARIOS)}</Text>
                    </View>
                    <View style={styles.item4}>
                    <Text style={[styles.text, { fontWeight: 'bold' }]}>Dose: </Text>
                        <Text style={styles.text}>
                            {`Tome ${item.qT_DOSE} ${ConversorMedicamento(item.cD_UNID_MED)}.`}
                        </Text>
                    </View>
                </View>
                <View style={styles.box3}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btn} onPress={() => setActiveModalBotttom(true)}>
                            <ExcluirSvg fill={'#FFFF'} width={widthBtn} height={widthBtn} />
                        </TouchableOpacity>
                        <Text style={styles.textBtn}>Excluir</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btn} onPress={() => Editar()}>
                            <EditarSvg fill={'#FFFF'} width={widthBtn} height={widthBtn} />
                        </TouchableOpacity>
                        <Text style={styles.textBtn}>Editar</Text>
                    </View>
                </View>
            </View>
        </ModalCentralized>
    )
}

ModalMedicamentoAtivo.propTypes = {
    activeModal: propTypes.bool
}

ModalMedicamentoAtivo.defaultProps = {
    activeModal: false,
    item: {
        dS_MEDICAMENTO: "PARACETAMOL",
        dS_HORARIOS: "12:00,00:00",
        qT_DOSE: '',
        cD_UNID_MED: 'com'
    }
}

export default ModalMedicamentoAtivo;
