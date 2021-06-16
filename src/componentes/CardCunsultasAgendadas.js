import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from 'moment';
import CompartilharImg from '../assets/svg/compartilhar.svg';
import AgendaConsultaContext from '../contexts/agendaConsultas';
import { precoMask, foneResidencialMask } from '../services/validacoes';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function CardCunsultasAgendadas({ consulta, Unidade, ValorConsulta }) {

    const { stateConsultas, dispathConsultas } = useContext(AgendaConsultaContext);

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.box1}>
                    <View style={styles.label}>
                        <View style={styles.idConsulta}>
                            <Text style={styles.textId}>1</Text>
                        </View>
                    </View>
                    <View style={styles.label2}>
                        <Text style={styles.DescriptionConsulta}>Consulta:</Text>
                        <Text style={styles.description}>{consulta.dS_ESPECIALIDADE}</Text>
                    </View>
                    <View style={[styles.label2, styles.medico]}>
                        <Text style={styles.DescriptionConsulta}>Médico(a): </Text>
                        <Text style={styles.description}>{consulta.nM_GUERRA}</Text>
                    </View>
                    <View style={[styles.label2, styles.convenio]}>
                        <Text style={styles.DescriptionConsulta}>Convênio - (Plano): </Text>
                        <Text style={styles.description}>
                            {consulta.dS_CONVENIO} {ValorConsulta && <Text style={styles.description}> - Valor {precoMask(ValorConsulta.vL_MEDICO)}</Text>}
                        </Text>
                    </View>
                    <View style={[styles.label2, styles.unidade, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                        <Text style={styles.DescriptionConsulta}>Unidade - (Endereço): </Text>
                        <Text style={styles.description}>
                            {`${Unidade.nM_FANTASIA}, RUA - ${Unidade.dS_ENDERECO} N.º ${Unidade.nR_ENDERECO}, ${Unidade.dS_BAIRRO}, ${Unidade.dS_MUNICIPIO}`}
                        </Text>
                        <Text style={styles.DescriptionConsulta}>Fone: </Text>
                        <Text style={styles.description}>
                            {`${foneResidencialMask(Unidade.nR_TELEFONE)}`}
                        </Text>
                    </View>
                    <View style={[styles.label2, styles.data]}>
                        <Text style={styles.DescriptionConsulta}>Data/Horário: </Text>
                        <Text style={styles.description}>{moment(consulta.dT_AGENDA).format('DD-MM-YYYY - HH:mm')}</Text>
                    </View>
                    {
                        ValorConsulta &&
                        <View style={[styles.label2, styles.data]}>
                            <Text style={styles.DescriptionConsulta}>Obs: </Text>
                            <Text style={styles.descriptionObs}>A forma de pagamento da consulta pode variar de acordo com cada profissional. A maioria aceita transferência e/ou espécie.</Text>
                        </View>
                    }
                </View>
            </View>
            {/*  <View style={styles.btnCompartilhar}>
                <TouchableOpacity style={styles.btn}>
                    <CompartilharImg width={25} height={25} fill={'#748080'} />
                </TouchableOpacity>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 2,
        alignItems: 'center',
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
    },
    card: {
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 5
    },
    box1: {
        paddingHorizontal: 5,
    },
    btnCompartilhar: {
        alignSelf: 'flex-end',
        padding: 10,
        marginTop: -70
    },
    img: {
        width: 20,
        height: 20
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        marginVertical: 5,
        borderRadius: 30,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
        backgroundColor: '#fff'
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
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
    },
    descriptionObs: {
        fontSize: RFValue(14, 680),
        color: '#7C9292',
        textAlign: 'justify'
    }
})

