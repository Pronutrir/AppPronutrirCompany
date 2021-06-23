import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Pressable, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import propTypes from 'prop-types';
import Adicao from '../assets/svg/math-plus.svg';
import Subtracao from '../assets/svg/math-minus.svg';

const noop = () => { };

function IncrementDecrement({ RangerValue = 0.00, setRangerValue }) {

    const size = Dimensions.get('screen').height / 40

    const inc_Dec = (tipo) => {
        switch (tipo) {
            case 'soma': setRangerValue((parseFloat(RangerValue) + 0.01).toFixed(2));
                break;
            case 'subtracao': setRangerValue((parseFloat(RangerValue) - 0.01).toFixed(2));
                break;
            default:
                break;
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
            <TextInput
                value={RangerValue.toString()}
                style={styles.valueInput}
            />
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
        width: 50,
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
    setRangerValue: propTypes.func.isRequired
}

IncrementDecrement.defaultProps = {
    RangerValue: 0.00,
    setRangerValue: noop,
}

export default IncrementDecrement;
