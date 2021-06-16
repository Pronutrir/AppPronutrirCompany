import React, { useContext, useState } from 'react';
import { Image, Text, View, TouchableOpacity, Dimensions } from 'react-native';

import CardConvenio from '../../../componentes/CardConvenio';
import CardLIstaConvenios from '../../../componentes/CardLIstaConvenios';
import styles from './style';
import AgendaConsultaContext from '../../../contexts/agendaConsultas';
import Api from '../../../services/api';
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import MyModalConfirmation from '../../../componentes/MyModalConfirmation';
import Loading from '../../../componentes/Loading';
import moment from 'moment';
import MaisImg from '../../../assets/svg/mais.svg';
import { ScrollView } from 'react-native-gesture-handler';

export default function listaConvenios({ route, navigation }) {

    const size = Dimensions.get('screen').width / 15
    const { value } = route.params;

    const { addError } = useContext(ErrorContext);
    const { stateConvenios, dispathConvenios, convenios } = useContext(AgendaConsultaContext);
    const { stateAuth } = useContext(AuthContext);
    const [modalActive, setModalActive] = useState(false);
    const [modalConfim, setModalConfirm] = useState(false);
    const [item, setItem] = useState();

    const deleteItem = () => {
        if (value === 'Meus Convenios') {
            setModalActive(true);
            Api.delete(`ConveniosPacientes/${item.nR_SEQUENCIA}`).then(response => {
                convenios();
                setModalActive(false);
            }).catch(error => {
                addError(`Não foi possivel deletar o convênio! tente mais tarde - ${error.message}`);
                setModalActive(false);
            })
        } else {
            dispathConvenios({ type: 'delConvenio', numeroCarteira: stateConvenios.AddConvenios[0].numeroCarteira });
            navigation.goBack();
        }
    }

    const salvarConvenio = () => {
        setModalActive(true);
        stateConvenios.AddConvenios.map(item => {
            Api.post('ConveniosPacientes', {
                dT_ATUALIZACAO: moment().format(),
                nM_PESSOA_FISICA: stateAuth.usertasy.nM_PESSOA_FISICA,
                cD_PESSOA_FISICA: stateAuth.usertasy.cD_PESSOA_FISICA,
                cD_PESSOA_TITULAR: stateAuth.usertasy.cD_PESSOA_FISICA,
                cD_USUARIO_CONVENIO: item.numeroCarteira,
                cD_CONVENIO: parseInt(item.convenio.cD_CONVENIO),
                cD_PLANO_CONVENIO: item.plano.cD_PLANO,
                dS_CONVENIO: item.plano.dS_CONVENIO,
                dS_CATEGORIA: item.plano.dS_CONVENIO.dS_PLANO,
                dS_PLANO: item.plano.dS_PLANO,
                nM_USUARIO: 'appMobile'
            }).then(response => {
                navigation.reset({
                    index: 1,
                    routes: [
                        { name: 'DashBoard' },
                        { name: 'ListaConvenios', params: { value: 'Meus Convenios' } }
                    ]
                });
                convenios();
                setModalActive(false);
            }).catch(error => {
                addError(`Não foi possivel salvar o convênio! tente mais tarde - ${error.message}`);
                setModalActive(false);
            });
        })
    };

    const selectedItem = item => {
        setItem(item);
        setModalConfirm(true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <View style={styles.box1_item1}>
                    <Text style={styles.text}>{value}</Text>
                </View>
                <View style={styles.box1_item2}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddConvenio')}>
                        <MaisImg width={size} height={size} fill={'#7C9292'} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.box2}>
                <View style={styles.box2_item1}>
                    <Text style={styles.options1Text}>1</Text>
                </View>
                <View style={styles.box2_item2}>
                    {value === 'Meus Convenios' ?
                        <CardLIstaConvenios listaConvenios={stateConvenios} selectedItem={selectedItem} />
                        :
                        <ScrollView style={{flex: 1, marginBottom: 100}}>
                            <CardConvenio listaConvenios={stateConvenios} selectedItem={deleteItem} />
                            <TouchableOpacity style={styles.btnAgendar} onPress={() => salvarConvenio()}>
                                <Text style={styles.TextAgendar}>Salvar</Text>
                                <Image style={styles.img} source={require('../../../assets/imagens/carraca.png')} />
                            </TouchableOpacity>
                        </ScrollView>
                    }
                </View>
            </View>
            <MyModalConfirmation activeModal={modalConfim} setActiveModal={setModalConfirm} action={deleteItem} label={"Deseja Excluir o Convênio ?"} />
            <Loading activeModal={modalActive} />
        </View>
    )
}