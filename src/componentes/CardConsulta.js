import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import moment from 'moment';
import { precoMask, foneResidencialMask } from '../services/validacoes';
import { useNavigation } from '@react-navigation/native';
import AgendaConsultaContext from '../contexts/agendaConsultas';
import MyModalConfirmation from '../componentes/MyModalConfirmation';
import EditarImg from '../assets/svg/editar.svg';
import ExcluirImg from '../assets/svg/excluir.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function CardConsulta({ dados }) {

    const size = Dimensions.get('screen').width / 15

    const { stateConsultas, dispathConsultas } = useContext(AgendaConsultaContext);
    const navigation = useNavigation();

    const [modalConfim, setModalConfirm] = useState(false);

    const deleteConsulta = () => {
        navigation.reset({ index: 0, routes: [{ name: 'DashBoard' }, { name: 'AgendarConsultas01' }] })
        dispathConsultas({ type: 'setStateClear' })
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.box1}>
                    <View style={styles.label}>
                        <View style={styles.idConsulta}>
                            <Text style={styles.textId}>1</Text>
                        </View>
                        <Text style={styles.DescriptionConsulta}>{dados.Especialidade}</Text>
                    </View>
                    <View style={[styles.label2, styles.medico]}>
                        <Text style={styles.DescriptionConsulta}>Médico(a): </Text>
                        <Text style={styles.description}>{dados.Medico.nM_GUERRA}</Text>
                    </View>
                    <View style={[styles.label2, styles.convenio]}>
                        <Text style={styles.DescriptionConsulta}>Convênio - (Plano): </Text>
                        <Text style={styles.description}>
                            {dados.Convenio.dS_CONVENIO} {dados.ValorConsulta && <Text style={styles.description}> - Valor {precoMask(dados.ValorConsulta.vL_MEDICO)}</Text>}
                        </Text>
                    </View>
                    <View style={[styles.label2, styles.unidade, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                        <Text style={styles.DescriptionConsulta}>Unidade - (Endereço): </Text>
                        <Text style={styles.description}>
                            {`${dados.Unidade.nM_FANTASIA}, RUA - ${dados.Unidade.dS_ENDERECO} N.º ${dados.Unidade.nR_ENDERECO}, ${dados.Unidade.dS_BAIRRO}, ${dados.Unidade.dS_MUNICIPIO}`}
                        </Text>
                        <Text style={styles.DescriptionConsulta}>Fone: </Text>
                        <Text style={styles.description}>
                            {`${foneResidencialMask(dados.Unidade.nR_TELEFONE)}`}
                        </Text>
                    </View>
                    <View style={[styles.label2, styles.data]}>
                        <Text style={styles.DescriptionConsulta}>Data/Horário: </Text>
                        <Text style={styles.description}>{moment(dados.Agenda.dT_AGENDA).format('DD-MM-YYYY - HH:mm')}</Text>
                    </View>
                </View>
                <View style={styles.box2}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AgendarConsultas01')}>
                        <EditarImg width={size} height={size} fill={'#748080'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => setModalConfirm(true)}>
                        <ExcluirImg width={size} height={size} fill={'#748080'} />
                    </TouchableOpacity>
                </View>
            </View>
            <MyModalConfirmation activeModal={modalConfim} setActiveModal={setModalConfirm} action={deleteConsulta} label={"Deseja Excluir a consulta ?"}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10
    },
    card: {
        width: '95%',
        flexDirection: 'row',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        borderRadius: 10,
        backgroundColor: '#fff',
        marginBottom: 10
    },
    box1: {
        width: '80%',
        padding: 10,
    },
    box2: {
        justifyContent: 'space-between',
        width: '20%',
        padding: 10,
        alignItems: 'center'
    },
    img: {
        width: 20,
        height: 20
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width / 8,
        height: Dimensions.get('screen').width / 8,
        marginVertical: 5,
        borderRadius: 30,
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        backgroundColor: '#fff'
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    label2: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 3
    },
    idConsulta: {
        backgroundColor: '#7C9292',
        width: 25,
        height: 25,
        marginRight: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textId: {
        color: '#fff',
        fontWeight: 'bold'
    },
    DescriptionConsulta: {
        fontSize: RFValue(16, 680),
        color: '#7C9292',
        fontWeight: 'bold'
    },
    description: {
        fontSize: RFValue(14, 680),
        color: '#7C9292',
    }
})
