import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import CancelSvg from '../../../assets/svg/signal.svg';
import Checked from '../../../assets/svg/ok-marca.svg';
import ComprimidoSvg from '../../../assets/svg/comprimido.svg';
import EditarSvg from '../../../assets/svg/editar.svg';
import { ConversorMedicamento } from '../../../services/conversorUnidadeMedicamento';
import ModalCentralized from '../../../components/Modais/ModalCentralized';
import styles from './style';
import propTypes from 'prop-types';
import moment from 'moment';

const ModalMedicamento = ({ item, activeModal, setActiveModal }) => {

    const widthBtn = Dimensions.get('screen').width / 15;
    const [monthWeek, setMonthWeek] = useState(moment().format('ddd, D [de] MMMM'));

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

    useEffect(() => {
        headerChanger(item.data);
    }, [item])

    return (
        <ModalCentralized
            activeModal={activeModal}
            setActiveModal={setActiveModal}
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
                        <Text style={[styles.text, { fontWeight: 'bold' }]}>Horario(s): </Text>
                        <Text style={styles.text}>{getHorarios(item.dS_HORARIOS)}</Text>
                    </View>
                    <View style={styles.item3}>
                        <Text style={styles.text}>
                            {`Tome ${item.qT_DOSE} ${ConversorMedicamento(item.cD_UNID_MED)}.`}
                        </Text>
                    </View>
                </View>
                <View style={styles.box3}>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btn}>
                            <CancelSvg fill={'#FFFF'} width={widthBtn + 10} height={widthBtn + 10} />
                        </TouchableOpacity>
                        <Text style={styles.textBtn}>Pular</Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.btn}>
                            <Checked fill={'#FFFF'} width={widthBtn + 10} height={widthBtn + 10} />
                        </TouchableOpacity>
                        <Text style={styles.textBtn}>Tomar</Text>
                    </View>
                </View>
            </View>
        </ModalCentralized>
    )
}

ModalMedicamento.propTypes = {
    activeModal: propTypes.bool
}

ModalMedicamento.defaultProps = {
    activeModal: false,
    item: {
        dS_MEDICAMENTO: "PARACETAMOL",
        dS_HORARIOS: "12:00,00:00",
        qT_DOSE: '',
        cD_UNID_MED: 'com'
    }
}

export default ModalMedicamento;
