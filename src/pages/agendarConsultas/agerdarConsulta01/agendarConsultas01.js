import React, { useContext, useState, useEffect, useRef } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity, SafeAreaView, Alert, Dimensions } from 'react-native';
import RadioButton from '../../../componentes/RadioButton';
import RadioButtonConvenios from '../../../componentes/RadioButtonConvenios';

import Api from '../../../services/api';
import styles from './style';
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import AgendaConsultaContext from '../../../contexts/agendaConsultas';
import MaisImg from '../../../assets/svg/mais.svg';
import MyModalSelector from '../../../componentes/MyModalSelector';
import MyModalSelectorSimples from '../../../componentes/MyModalSelectorSimples';
import MyModalTermoResp from '../../../componentes/MyModalTermoResp';
import MyModalInfor from '../../../componentes/MyModalInfor';
import MyLoadingBall from '../../../componentes/MyLoadingBall';

export default function agendarConsultas01({ navigation }) {

    const { addError } = useContext(ErrorContext);
    const size = Dimensions.get('screen').width / 15
    const { stateConsultas, dispathConsultas, stateConvenios } = useContext(AgendaConsultaContext);
    const { stateAuth } = useContext(AuthContext);
    const scrollRef = useRef();

    const [activeModal, setActiveModal] = useState(false);
    const [activeModalInfo, setActiveModalInfo] = useState(false);
    const [selectedEnable, setSelectedEnable] = useState(false);
    const [next, setNext] = useState(false);

    const handleClickScroll = () => {
        scrollRef.current.scrollToEnd({duration: 500, animated: true}, 1000);
    }

    const Listar_Estabelecimentos = (cD_CONVENIO) => {
        Api.get(`Estabelecimentos/filtroDescricaoEstabelecimentosPJ?codigoConvenio=${cD_CONVENIO}`).then(response => {
            const { result } = response.data;
            if (result) {
                const order_result = result.sort(function (a, b) {
                    return a.dS_MUNICIPIO < b.dS_MUNICIPIO ? -1 : a.dS_MUNICIPIO > b.dS_MUNICIPIO ? 1 : 0
                })
                dispathConsultas({ type: 'setUnidades', unidades: order_result });
            }
            handleClickScroll();
        }).catch(error => {
            addError(`Não foi possivel acessar os estabelecimentos! tente mais tarde - ${error.message}`);
        })
    }

    const verificarConvênioMedico = item => {

        function ConvenioAtende(value) {
            const { Convenio } = stateConsultas;
            return value == Convenio.cD_CONVENIO || Convenio.cD_CONVENIO == 1;
        }

        const ArrayConvenio = item => {
            let cod_convenios = item.split(",");
            cod_convenios = cod_convenios.map(item => item.replace(" ", ""))
            let convenio = cod_convenios.filter(ConvenioAtende)
            return convenio.length > 0 ? true : false
        }

        return item.map(item =>
        ({
            ...item,
            selectedConvenioAtende: ArrayConvenio(item.coD_CONVENIO)
        }
        ))
    }

    const Listar_medicos = (cod_estabelecimento, especialidade, cod_convenio) => {
        if (especialidade || cod_estabelecimento) {
            let selectionFull = `Convenios/listaMedicosAtendemConveniosGeral/${cod_estabelecimento}?descrEspecialidade=${especialidade}&codigoConvenio=${cod_convenio}`;
            let selectionMedEstabelecimento = `Convenios/listaMedicosAtendemConveniosGeral/${cod_estabelecimento}`;
            let endereco = especialidade && cod_estabelecimento ? selectionFull : cod_estabelecimento && selectionMedEstabelecimento;

            Api.get(endereco).then(response => {
                const { result } = response.data;
                if (result && result.length > 0) {
                    const order_result = result.sort(function (a, b) {
                        return a.nM_GUERRA < b.nM_GUERRA ? -1 : a.nM_GUERRA > b.nM_GUERRA ? 1 : 0
                    })
                    if (especialidade && cod_estabelecimento) {
                        dispathConsultas({ type: 'setMedicos', medicos: order_result });
                    } else {
                        let ConveniosStatusAtende = verificarConvênioMedico(order_result);
                        dispathConsultas({ type: 'setMedicos', medicos: ConveniosStatusAtende });
                    }
                } else {
                    Alert.alert(
                        'Aviso',
                        'Esta Unidade não possui médicos desta especialidade!',
                        [{ text: 'OK' }],
                        { cancelable: false },
                    )
                }
                handleClickScroll();
            }).catch(error => {
                addError(`Não foi possivel listas os mediccos! tente mais tarde - ${error.message}`);
            });
        } else {
            Alert.alert("Error ao listar os medicos!")
        }
    }

    const Listar_especialidades = (cD_CONVENIO, cD_ESTABELECIMENTO) => {
        if (cD_CONVENIO && cD_ESTABELECIMENTO) {
            Api.get(`Convenios/filtroEspecialidadePorConvenio/${cD_ESTABELECIMENTO}?codigoConvenio=${cD_CONVENIO}`).then(response => {
                const { result } = response.data;
                let _result = result.filter((item) => item.dS_ESPECIALIDADE !== 'Anestesiologia')
                if (_result.length > 0) {
                    const order_result = _result.sort(function (a, b) {
                        return a.dS_ESPECIALIDADE < b.dS_ESPECIALIDADE ? -1 : a.dS_ESPECIALIDADE > b.dS_ESPECIALIDADE ? 1 : 0
                    })
                    dispathConsultas({ type: 'setEspecialidades', especialidades: order_result });
                } else {
                    Alert.alert(
                        'Aviso',
                        'O Convenio selecionado não possui especilidades Médicas',
                        [{ text: 'OK' }],
                        { cancelable: false },
                    )
                }
                handleClickScroll();
            }).catch(error => {
                addError(`Não foi possivel acessar as especialidade! tente mais tarde - ${error.message}`);
            })
        }
    };

    const addUnidade = item => {
        if (item) {
            dispathConsultas({ type: 'setUnidade', unidade: item });
        }
        handleClickScroll();
    }

    const addConvenio = item => {
        if (item) {
            dispathConsultas({ type: 'setSelectedConvenio', convenio: item })
            Listar_Estabelecimentos(item.cD_CONVENIO);
        }
    }

    const addEspecialidade = item => {
        if (item) {
            dispathConsultas({ type: 'setEspecialidade', especialidade: item.dS_ESPECIALIDADE });
            const { Unidade, Convenio } = stateConsultas;
            Listar_medicos(Unidade.cD_ESTABELECIMENTO, item.dS_ESPECIALIDADE, Convenio.cD_CONVENIO);
        }
        handleClickScroll();
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
            addError(`Não foi possivel acessar os convênios! tente mais tarde - ${error.message}`);
        })
    }

    const valorConsulta = () => {
        const { Convenio } = stateConsultas;
        if (Convenio) {
            if (Convenio.dS_PLANO === "PARTICULAR") {
                const { Medico, Unidade } = stateConsultas;
                if (Medico) {
                    Api.get(`Convenios/filtroConvenioParticular/${Medico.nM_GUERRA}?estabelecimento=${Unidade.cD_ESTABELECIMENTO}`).then(response => {
                        const { result } = response.data;
                        if (result) {
                            dispathConsultas({ type: 'setValorConsulta', valorConsulta: result[0] });
                        }
                    }).catch(error => {
                        addError(`Não foi possivel acessar o valor da consulta! tente mais tarde - ${error.message}`);
                    });
                }
            }
        }
    }

    const addMedico = async item => {
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
        handleClickScroll();
    }

    const RandomInt = (min, max) => {
        return min + Math.floor((max - min) * Math.random());
    }

    const RandomMedico = item => {
        if (item.key === 1) {
            dispathConsultas({ type: 'setOptions_02', option: item.key });
        } else {
            setNext(true);
            const numero = RandomInt(0, stateConsultas.Medicos.length);
            dispathConsultas({ type: 'setOptions_02', option: item.key });
            dispathConsultas({ type: 'setMedico', medico: stateConsultas.Medicos[numero] });
        }
        handleClickScroll();
    }

    const validation = () => {
        if ((stateConsultas.Especialidade && stateConsultas.Convenio) && (stateConsultas.Unidade && stateConsultas.Medico) && next) {
            return true;
        } else {
            return false;
        }
    }

    const selected_Med_Espe = item => {
        if (item.key === 1) {
            dispathConsultas({ type: 'setOptions', option: item.key });
            const { Convenio, Unidade } = stateConsultas;
            Listar_especialidades(Convenio.cD_CONVENIO, Unidade.cD_ESTABELECIMENTO);
        }

        if (item.key === 2) {
            dispathConsultas({ type: 'setOptions', option: item.key });
            const { Unidade } = stateConsultas;
            Listar_medicos(Unidade.cD_ESTABELECIMENTO);
        }
        handleClickScroll();
    }

    const nextPage = () => {
        navigation.navigate('AgendarConsultas02')
    }

    const options_medico = [
        {
            key: 1,
            text: 'Sim',
        },
        {
            key: 2,
            text: 'Não',
        },
    ];

    const options_med_esp = [
        {
            key: 1,
            text: 'Especialidades'
        },
        {
            key: 2,
            text: 'Médicos'
        }
    ]

    useEffect(() => {
        valorConsulta();
        return () => {
            
        }
    }, [stateConsultas.Medico])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box1}>
                {!stateConvenios.Convenios || stateConvenios.Convenios.length == 0 ?
                    <>
                        <View style={styles.box1_item1}>
                            <Text style={styles.text}>Bom dia! no momento você não possui convênio Cadastrado.</Text>
                        </View>
                        <View style={styles.box1_item2}>
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddConvenio')}>
                                <MaisImg width={size} height={size} fill={'#748080'} />
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <View style={styles.box1_item1}>
                            <Text style={styles.text}>Adicionar Convênios.</Text>
                        </View>
                        <View style={styles.box1_item2}>
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddConvenio')}>
                                <MaisImg width={size} height={size} fill={'#748080'} />
                            </TouchableOpacity>
                        </View>
                    </>
                }
            </View>
            <SafeAreaView style={styles.box2}>
                <View style={styles.options1}>
                    <Text style={styles.options1Text}>1</Text>
                </View>
                <ScrollView ref={scrollRef} style={styles.box2_item1}>
                    <View>
                        <View style={styles.info}>
                            <Text style={styles.textLabel}>Selecione seu Convênio</Text>
                            <TouchableOpacity
                                style={styles.circle}
                                onPress={() => setActiveModalInfo(true)}
                            >
                                <Text style={styles.text} >?</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            stateConvenios.Convenios.length > 0 ?
                                <RadioButtonConvenios options={stateConvenios.Convenios} Width_full={true} selection={addConvenio} enable={true} />
                                :
                                <MyLoadingBall />
                        }
                    </View>
                    <View style={styles.box2_item4}>
                        <Text style={styles.textLabel}>Unidade Onde Deseja Realizar a Consulta ?</Text>
                        {
                            (stateConsultas.Convenio && !stateConsultas.Unidades.length > 0)
                                ?
                                <MyLoadingBall />
                                :
                                <MyModalSelectorSimples
                                    textSelect={"-- Selecione a unidade -- ▼"}
                                    options={stateConsultas.Unidades}
                                    action={addUnidade}
                                    disabled={stateConsultas.Unidades.length > 0}
                                    tipo={"unidades"}
                                />
                        }
                    </View>
                    <View style={styles.box2_item1}>
                        <Text style={styles.textLabel}>Selecione uma das Opções.</Text>
                        <RadioButton options={options_med_esp} Width_full={false} selection={selected_Med_Espe} enable={stateConsultas.Unidade} />
                    </View>
                    {
                        stateConsultas.Option === 1 &&
                        <>
                            <View style={styles.box2_item2}>
                                <Text style={styles.textLabel}>Selecione a Especialidade.</Text>
                                {
                                    stateConsultas.Especialidades.length > 0 ?
                                    <MyModalSelectorSimples
                                        textSelect={"-- Selecione a especialidade -- ▼"}
                                        options={stateConsultas.Especialidades}
                                        action={addEspecialidade}
                                        disabled={stateConsultas.Especialidades}
                                        tipo={"especialidade"}
                                    />
                                    :
                                    <MyLoadingBall />
                                }
                            </View>
                            {
                                stateConsultas.Especialidade &&
                                <View style={styles.box2_item3}>
                                    <Text style={styles.textLabel}>Deseja escolher o médico ?</Text>
                                    <RadioButton
                                        options={options_medico}
                                        Width_full={false}
                                        selection={RandomMedico}
                                        enable={stateConsultas.Especialidade} />
                                    {
                                        stateConsultas.Option_02 === 1 &&
                                        (
                                            stateConsultas.Medicos.length > 0 ?
                                            <MyModalSelectorSimples
                                                textSelect={"-- Selecione o médico -- ▼"}
                                                options={stateConsultas.Medicos}
                                                action={addMedico}
                                                disabled={stateConsultas.Medicos.length > 0}
                                                tipo={"medicos"}
                                            />
                                            :
                                            <MyLoadingBall />
                                        )
                                    }
                                </View>
                            }
                        </>
                    }
                    {
                        stateConsultas.Option === 2 &&
                        (
                            stateConsultas.Medicos.length > 0 ?
                                <MyModalSelector
                                    textSelect={"-- Selecione o médico -- ▼"}
                                    options={stateConsultas.Medicos}
                                    action={addMedico}
                                    disabled={false}
                                />
                                :
                                <MyLoadingBall />
                        )
                    }
                    <View style={styles.box2_item6}>
                        <TouchableOpacity
                            disabled={!validation()}
                            style={styles.btnPage2}
                            onPress={() => setActiveModal(true)}
                        >
                            <Image style={
                                validation() ? styles.img : styles.imgDisabled} source={require('../../../assets/imagens/seta-para-baixo.png')} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <MyModalTermoResp activeModal={activeModal} setActiveModal={setActiveModal} label={'testando'} action={nextPage} />
            <MyModalInfor
                activeModal={activeModalInfo}
                setActiveModal={setActiveModalInfo}
                message={
                    'Ao cadastrar um ou mais convênios que tenha, essas informações ficarão registradas para um novo atendimento. Você poderá excluir a informação sempre que desejar.'
                }
            />
        </SafeAreaView>
    )
}


