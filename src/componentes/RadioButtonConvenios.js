import React, { useEffect, useState, useContext } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import AgendaConsultaContext from '../contexts/agendaConsultas';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function RadioButtonConvenios({options, Width_full, selection, enable}) {
    
    const [value, setValue] = useState();
    const { dispathConsultas } = useContext(AgendaConsultaContext);

    const select = item => {
        if (item.nR_SEQUENCIA != value) {
            setValue(value => value = item.nR_SEQUENCIA)
            if (selection) {
                selection(item);
            }
        }
    }

    /* useEffect(() => {
        setValue('')
    }, [enable]) */

    useEffect(() => {
        return () => {
            dispathConsultas({ type: 'setSelectedConvenio', convenio: '' })
        }
    }, [])
    
    return (
        <View style={Width_full ? styles.container : styles.container2}>
            {options.map(item => {
                return (
                    <View key={item.nR_SEQUENCIA} style={Width_full ? styles.buttonContainer : styles.buttonContainer2}>
                        <TouchableOpacity
                            style={styles.circle}
                            onPress={() => select(item)}
                            disabled={!enable}
                        >
                            {value === item.nR_SEQUENCIA && <View style={styles.checkedCircle} />}
                        </TouchableOpacity>
                        <Text style={enable ? styles.text : styles.textDisbled}>{item.dS_CONVENIO}</Text>
                    </View>
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    buttonContainer: {
        width: '95%',
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: 10,
    },
    buttonContainer2: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'center',
    },
    circle: {
        height: Dimensions.get('screen').width / 16,
        width: Dimensions.get('screen').width / 16,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#ACACAC',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkedCircle: {
        height: Dimensions.get('screen').width / 25,
        width: Dimensions.get('screen').width / 25,
        borderRadius: 7,
        backgroundColor: '#BABDBE',
    },
    text: {
        marginHorizontal: 10,
        fontSize: RFValue(16, 680),
        color: '#7C9292',
    },
    textDisbled: {
        marginHorizontal: 10,
        fontSize: RFValue(16, 680),
        color: '#7C9292',
        opacity: 0.5
    },
    disabled: {
        opacity: 0.5
    }
})

