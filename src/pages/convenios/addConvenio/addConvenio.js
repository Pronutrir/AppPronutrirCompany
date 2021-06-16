import React, { useEffect, useContext, useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, KeyboardAvoidingView, TextInput, Dimensions, SafeAreaView } from 'react-native';
import SelectedPicker from '../../../componentes/selectedPicker';

import Api from '../../../services/api';
import styles from './style';
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import Loading from '../../../componentes/Loading';
import AgendaConsultaContext from '../../../contexts/agendaConsultas';
import MyModalSelectorSimples from '../../../componentes/MyModalSelectorSimples';

export default function addConvenio({ navigation }) {

    const { addError } = useContext(ErrorContext);
    const [selectedEnable, setSelectedEnable] = useState(false);
    const [loading, setLoading] = useState(true);
    const { stateAuth } = useContext(AuthContext);
    const [convenios, setConvenios] = useState([]);
    const [planos, setPlanos] = useState([]);

    const { dispathConvenios } = useContext(AgendaConsultaContext);

    const [selected, setSelected] = useState({
        convenio: '',
        plano: '',
        numeroCarteira: ''
    });

    const [erroCampos, setErroCampos] = useState({
        convenio: false,
        plano: false,
        numero: false
    });

    const [validacao, setvalidacao] = useState(true);

    const addConvenio = item => {
        setErroCampos({ ...erroCampos, convenio: false });
        if (item) {
            setSelected({ ...selected, convenio: item });
            setLoading(true);
            setSelectedEnable(true);
            getPlanos(item.cD_CONVENIO);
        } else {
            setSelected({ ...selected, convenio: '' });
            setLoading(false);
            setSelectedEnable(false);
            setPlanos([]);
        }
    }

    const addPlano = item => {
        setErroCampos({ ...erroCampos, plano: false });
        if (item) {
            setSelected({ ...selected, plano: item });
        } else {
            setSelected({ ...selected, plano: '' });
        }
    }

    const getPlanos = idConvenio => {
        Api.get(`Convenios/ListarConveniosComPlanos?codigoConvenio=${idConvenio}`).then(response => {
            const { Lista } = response.data.result;
            const order_result = Lista.sort(function (a, b) {
                return a.dS_PLANO < b.dS_PLANO ? -1 : a.dS_PLANO > b.dS_PLANO ? 1 : 0
            })
            setPlanos(order_result);
            setLoading(false);
        }).catch(error => {
            addError(`Não foi possivel acessar os planos! tente mais tarde - ${error.message}`);
            setLoading(false);
        })
    }

    const getConvenios = () => {

        Api.get(`Convenios`).then(response => {
            const { result } = response.data;
            if (result) {
                const order_result = result.sort(function (a, b) {
                    return a.dS_CONVENIO < b.dS_CONVENIO ? -1 : a.dS_CONVENIO > b.dS_CONVENIO ? 1 : 0
                })
                setConvenios(order_result);
            }
            setLoading(false);
        }).catch(error => {
            addError(`Não foi possivel acessar os convênios! tente mais tarde - ${error.message}`);
            setLoading(false);
        });
    }

    const saveConvenio = () => {
        if (selected.convenio && selected.plano) {
            dispathConvenios({ type: 'setConvenio', convenio: selected })
            navigation.navigate('ListaConvenios', { value: 'Adicionar Convenios' });
        } else {
            let _convenio = selected.convenio ? false : true;
            let _plano = selected.plano ? false : true;
            setErroCampos({ convenio: _convenio, plano: _plano });
        }
    }

    const addNumeroCarteira = text => {
        setErroCampos({ ...erroCampos, numeroCarteira: false })
        setSelected({ ...selected, numeroCarteira: text });
    }

    useEffect(() => {
        getConvenios();
    }, [])

    return (
        <KeyboardAvoidingView style={styles.container} 
            behavior={Platform.OS === "ios" ? "height" : "height"}
            keyboardVerticalOffset={Dimensions.get('screen').height / 6}
        >
            <View style={styles.box1}>
                <View style={styles.box1_item1}>
                    <Text style={styles.TextTitulo}>Adicionar Convênios</Text>
                </View>
            </View>
            <SafeAreaView style={styles.box2}>
                <View style={styles.options1}>
                    <Text style={styles.options1Text}>1</Text>
                </View>
                <ScrollView style={{
                    paddingRight: 20,
                    width: "110%"
                }}>
                    <View style={styles.box2_item2}>
                        <Text style={styles.textLabel}>Informe seu Convênio</Text>
                        <MyModalSelectorSimples
                            textSelect={"-- Selecione seu convênio -- ▼"}
                            options={convenios}
                            action={addConvenio}
                            disabled={true}
                            tipo={"convenios"}
                        />
                        {erroCampos.convenio && <Text style={styles.textErro}>Informe seu convênio</Text>}
                    </View>
                    <View style={styles.box2_item3}>
                        <Text style={styles.textLabel}>Informe seu Plano</Text>
                        <MyModalSelectorSimples
                            textSelect={"-- Selecione seu plano -- ▼"}
                            options={planos}
                            action={addPlano}
                            disabled={planos.length > 0}
                            tipo={"planos"}
                        />
                        {erroCampos.plano && <Text style={styles.textErro}>Informe seu plano</Text>}
                    </View>
                    <View style={styles.box2_item4}>
                        <Text style={styles.textLabel}>Número da carteirinha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder={'Ex: 0000000'}
                            keyboardType={'numeric'}
                            onChangeText={text => addNumeroCarteira(text)}
                        />
                        <Text style={styles.text2}>(Opcional)</Text>
                    </View>
                    <View style={styles.box2_item6}>
                        {
                            validacao &&
                            <TouchableOpacity
                                style={styles.btnAgendar}
                                onPress={() => saveConvenio()}>
                                <Text style={styles.TextAgendar}>Adicionar</Text>
                                <Image style={styles.img} source={require('../../../assets/imagens/mais.png')} />
                            </TouchableOpacity>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Loading activeModal={loading} />
        </KeyboardAvoidingView>
    )
}
