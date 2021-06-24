import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, Dimensions, Text } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import propTypes from 'prop-types';
import Adicao from '../assets/svg/math-plus.svg';
import Subtracao from '../assets/svg/math-minus.svg';

const noop = () => { };

function IncrementDecrement({ RangerValue = 0, setRangerValue, medida }) {

    const size = Dimensions.get('screen').height / 40

    const inc_Dec = (tipo) => {

        var value = 1;

        switch (medida) {
            case '°C': {
                value = 0.1;
                let ranger = RangerValue;
                if (tipo === 'soma') {
                    setRangerValue(ranger + value);
                } else if (tipo === 'subtracao') {
                    setRangerValue(ranger - value);
                }
            } break;
            default:
                if (tipo === 'soma') {
                    setRangerValue((parseInt(RangerValue) + value));
                } else if (tipo === 'subtracao') {
                    setRangerValue((parseInt(RangerValue) - value));
                } break;
        }
    }

    useEffect(() => {
        setRangerValue(RangerValue);
    }, [RangerValue])

    return (
        <View style={styles.Container}>
            <Pressable style={styles.btnInc} onPress={() => inc_Dec('subtracao')}>
                <Subtracao fill={'#748080'} width={size} height={size} />
            </Pressable>
            <Text
                //keyboardType={'numeric'}
                //value={RangerValue.toString()}
                //maxLength={3}
                //editable={false}
                style={styles.valueInput}
                //onChange={text => setRangerValue(parseInt(text))}
                //onBlur={text => setRangerValue(parseInt(0))}
            >{Number.isInteger(RangerValue) ? RangerValue : RangerValue.toFixed(1)}</Text>
            <Text>{medida && medida}</Text>
            <Pressable style={styles.btnInc} onPress={() => inc_Dec('soma')}>
                <Adicao fill={'#748080'} width={size} height={size} />
            </Pressable>
        </View> 
    )
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
    },
    valueInput: {
        width: 60,
        fontSize: RFValue(20, 680),
        textAlign: 'center',
        color: '#7C9292',
    },
    btnInc: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInc: {
        color: '#7C9292',
        fontSize: RFValue(20, 680),
        textAlign: 'center',
        backgroundColor: 'red'
    },
});

IncrementDecrement.prototype = {
    RangerValue: propTypes.number.isRequired,
    setRangerValue: propTypes.func.isRequired,
    medida: propTypes.string
}

IncrementDecrement.defaultProps = {
    RangerValue: 0.00,
    setRangerValue: noop
}

export default IncrementDecrement;
