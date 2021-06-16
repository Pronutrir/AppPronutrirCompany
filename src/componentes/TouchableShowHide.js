import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, LayoutAnimation, UIManager, Image, Dimensions } from 'react-native';

import MyModalSelector from '../componentes/MyModalSelector';

import Calendars from '../componentes/Calendars';
import AgendaConsultaContext from '../contexts/agendaConsultas';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function TouchableShowHide({ numeroConsulta, options1, itemSelected1, especialidade, selection1, actionScroll }) {

    const [expanded, setExpanded] = useState(true);
    const { stateConsultas } = useContext(AgendaConsultaContext);
    const { Medico } = stateConsultas;
    const itemSelecionado = `${Medico.nM_GUERRA} - ${Medico.dS_ESPECIALIDADE} ▼`

    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
                setExpanded(!expanded);
            }}>
                <View style={styles.button}>
                    <View style={styles.btnConsultas}>
                        <Text style={{ color: '#fff' }}>{numeroConsulta}</Text>
                    </View>
                    <View>
                        <Text style={styles.Label}>Consulta:</Text>
                        <Text style={styles.Label}>{especialidade}</Text>
                    </View>
                    <Image
                        style={styles.arrowImg}
                        source={expanded ?
                            require('../assets/imagens/seta-para-cima.png') :
                            require('../assets/imagens/seta-para-baixo.png')
                        }
                    />
                </View>
            </TouchableHighlight>
            {expanded && (
                <>
                    <View style={styles.box}>
                        <Text style={styles.Label}>Médico(a):</Text>
                        <MyModalSelector
                            textSelect={itemSelecionado}
                            options={options1}
                            action={selection1}
                            disabled={false}
                        />
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.Label}>Selecione a data e horario da consulta</Text>
                        {
                            itemSelected1 && <Calendars actionScroll={actionScroll}/>
                        }

                    </View>
                </>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 10,
        alignItems: 'center',
        marginVertical: 10,
    },
    button: {
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 8,
            },
            android:{
                elevation: 3,
            }
        }),
        backgroundColor: 'red',
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        width: (Dimensions.get('screen').width / 100 * 74),
        justifyContent: 'space-around',
    },
    btnConsultas: {
        width: 25,
        height: 25,
        backgroundColor: '#7C9292',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    Label: {
        color: '#08948A',
        fontSize: RFValue(16, 680)
    },
    arrowImg: {
        width: Dimensions.get('screen').width / 20,
        height: Dimensions.get('screen').width / 20
    },
    box: {
        width: '100%',
        marginVertical: 10
    }
});
