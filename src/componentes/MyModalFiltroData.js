import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, Alert } from 'react-native';
import MyModalCalender from '../componentes/MyModalCalendar';
import MyModalSimples from '../componentes/MyModalSimples';
import moment from 'moment';

export default function MyModalFiltroData(
    { activeModal, setActiveModal, action, label, setDataInicio, setDataFim, dataInicio, dataFim, disabled }) {

    const [activeModalCalender, setActiveModalCalender] = useState(false);
    const [activeModalSimples, setActiveModalSimples] = useState(false);
    const [mensagemModalSimples, setMensagemModalSimples] = useState(false);
    const [tipoDate, setTipoDate] = useState();
    const [childrenIds, setChildrenIds] = useState();
    const _view = useRef(null);

    const cancel = () => {
        setActiveModal(false);
    }

    const ok = () => {
        // action();
        setActiveModal(false);
    }

    const SelectedDay = (day) => {
        if (tipoDate === 'dataInicio') {
            setDataInicio(moment(day).format('YYYY-MM-DD'))
        }
        if (tipoDate === 'dataFim') {
            setDataFim(moment(day).format('YYYY-MM-DD'))
        }
    }

    const validacao = () => {
        if (dataInicio <= dataFim) {
            action('Data_inicio_fim');
        } else {
            setMensagemModalSimples("A Data final tem que ser maior que a data inicial!");
            setActiveModalSimples(true);
        }
    }

    const selectedCalender = (data) => {
        setTipoDate(data);
        setActiveModalCalender(true);
    }

    const getIdRef = () => {
        const { current } = _view;
        if (current) {
            setChildrenIds(current._nativeTag);
        }
    }

    useEffect(() => {
        getIdRef();
    }, [activeModal])

    return (
        <View>
            <Modal
                animationType='slide'
                transparent={true}
                statusBarTranslucent={true}
                visible={activeModal}
            >
                <View style={styles.centeredView}
                    ref={_view}
                    onStartShouldSetResponder={evt => {
                        evt.persist();
                        if (evt.target._nativeTag === childrenIds) {
                            setActiveModal(false)
                        }
                    }}
                >
                    <View style={styles.modalView}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.text}>Outros Períodos</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>De</Text>
                            <TouchableOpacity style={styles.btnData} onPress={() => selectedCalender("dataInicio")}>
                                <Text style={styles.text}>{dataInicio ? moment(dataInicio).format('DD/MM/YYYY') : 'DD/MM/AAAA'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text}>Até</Text>
                            <TouchableOpacity style={styles.btnData} onPress={() => selectedCalender("dataFim")}>
                                <Text style={styles.text}>{dataFim ? moment(dataFim).format('DD/MM/YYYY') : 'DD/MM/AAAA'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.boxBtn}>
                            <TouchableOpacity style={disabled ? styles.btnDisable : styles.btn} disabled={disabled} onPress={() => validacao()}>
                                <Text style={styles.textBtn}>Aplicar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.btn, { backgroundColor: '#c3c0c35e' }]} onPress={() => setActiveModal(false)}>
                                <Text style={[styles.textBtn, { color: '#08948A' }]}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <MyModalCalender activeModal={activeModalCalender} setActiveModal={setActiveModalCalender} action={SelectedDay} />
                <MyModalSimples activeModal={activeModalSimples} setActiveModal={setActiveModalSimples} label={mensagemModalSimples} />
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
        backgroundColor: '#c3c0c35e'
    },
    modalView: {
        opacity: 20,
        backgroundColor: "#ffff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        //elevation: 5,
        width: '100%',
        height: '50%'
    },
    box: {
        width: "95%",
        height: '25%',
        marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'center'
    },
    text: {
        color: '#7C9292',
        fontSize: 16,
        fontWeight: 'bold'
    },
    btnData: {
        backgroundColor: '#c3c0c35e',
        justifyContent: 'center',
        marginVertical: 10,
        height: 40,
        paddingLeft: 10
    },
    btn: {
        width: 200,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#08948A',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnDisable: {
        width: 200,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#08948A',
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5
    },
    textBtn: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    boxBtn: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
