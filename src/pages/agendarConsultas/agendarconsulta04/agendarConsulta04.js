import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native'

import CardCunsultasAgendadas from '../../../componentes/CardCunsultasAgendadas';
import Api from '../../../services/api';
import AuthContext from '../../../contexts/auth';
import ErrorContext from '../../../contexts/errorNotification';
import MaisImg from '../../../assets/svg/mais.svg';
import MedicoColorImg from '../../../assets/svg/medicoColor.svg';
import MyLoadingBall from '../../../componentes/MyLoadingBall';
import { CommonActions } from '@react-navigation/native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function agendarConsulta04({ route, navigation }) {

    const size = Dimensions.get('screen').width / 15

    const { addError } = useContext(ErrorContext);
    const { IdConsulta, Unidade, ValorConsulta } = route.params;
    const { stateAuth } = useContext(AuthContext);
    const [consulta, setConsulta] = useState(null);

    const GetConsulta = () => {
        if (IdConsulta) {
            Api.get(`AgendaConsultas/${IdConsulta}`).then(response => {
                const { result } = response.data;
                if (result) {
                    if (result.nR_SEQUENCIA === IdConsulta) {
                        setConsulta(result);
                        resetRotas();
                    }
                }
            }).catch(error => {
                addError(`Não foi possivel acessar as consultas! tente mais tarde - ${error.message}`);
            });
        }
    }

    const resetRotas = () => {
        navigation.dispatch(state => {
            const routes = state.routes.filter(r => r.name !== 'AgendarConsultas01' && r.name !== 'AgendarConsultas02' && r.name !== 'AgendarConsultas03');
            return CommonActions.reset({
                ...state,
                routes,
                index: 1
            })
        })
    }

    useEffect(() => {
        GetConsulta();
    }, [])

    return (
        <View style={styles.container}>
            {consulta ?
                <>
                    <View style={styles.box1}>
                        <Text style={styles.label}>Agendado com sucesso !</Text>
                    </View>
                    <View style={styles.box2}>
                        <View style={styles.box2_item1}>
                            <Text style={styles.options1Text}>4</Text>
                        </View>
                        <View style={styles.box2_item2}>
                            <MedicoColorImg width={size + 20} height={size + 20} />
                            <Text style={styles.item2_label}>Consulta Agendada</Text>
                        </View>
                        <ScrollView style={styles.box2_item3}>
                            <CardCunsultasAgendadas consulta={consulta} Unidade={Unidade} ValorConsulta={ValorConsulta} />
                            <TouchableOpacity style={styles.btnAgendar} onPress={() => navigation.navigate('AgendarConsultas01')}>
                                <Text style={styles.TextAgendar}>Novo Agendamento</Text>
                                <MaisImg width={size} height={size} fill={'#748080'} />
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </>
                :
                <MyLoadingBall />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    box1: {
        flexDirection: 'row',
        backgroundColor: '#189B91',
        padding: 10,
        width: '60%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    box2: {
        flex: 1,
        width: '85%',
        borderLeftWidth: 1,
        borderLeftColor: '#C1C9C9',
        margin: 20
    },
    box2_item1: {
        flexDirection: 'row',
    },
    box2_item2: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginTop: -20,
    },
    box2_item3:{
        flex: 1
    },
    item2_label: {
        fontSize: RFValue(16, 680),
    },
    item2_img: {
        marginRight: 10
    },
    box2_item1: {
        backgroundColor: '#fff',
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginLeft: -Dimensions.get('window').width / 20,
        marginTop: -Dimensions.get('window').width / 13,
    },
    options1Text: {
        fontSize: RFValue(30, 680),
        color: '#7C9292'
    },
    label: {
        color: '#fff',
        fontSize: RFValue(14, 680),
        fontWeight: 'bold'
    },
    btnAgendar: {
        width: '80%',
        height: (Dimensions.get('window').height / 15),
        backgroundColor: '#fff',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginVertical: 10,
        flexDirection: 'row'
    },
    TextAgendar: {
        color: '#08948A',
        fontWeight: 'bold',
        fontSize: RFValue(16, 680),
        marginRight: 20
    },
    img: {
        width: 20,
        height: 20,
        tintColor: '#707070'
    }

})
