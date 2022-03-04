import React, { useState, memo, useCallback, useEffect } from 'react';
import { StyleSheet, View, Pressable, Dimensions, Text } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import Adicao from '../assets/svg/math-plus.svg';
import Subtracao from '../assets/svg/math-minus.svg';
import { MaskedTextInput } from 'react-native-mask-text';
interface Props {
    RangerValue: number;
    medida: string;
    min: number;
    max: number;
    setRangerValue(value: number): void;
    disabled?: boolean;
}

const IncrementDecrement: React.FC<Props> = ({
    RangerValue = 0,
    setRangerValue,
    medida,
    min = 0,
    max = 100,
    disabled = false,
}: Props) => {
    const [inputValue, setInputValue] = useState(RangerValue.toString());

    const size = Dimensions.get('screen').height / 40;

    const inc_Dec = (tipo: string) => {
        var value: number = 1;

        switch (medida) {
            case '°C':
                {
                    value = 0.1;
                    let ranger: number = RangerValue;
                    if (tipo === 'soma') {
                        setRangerValue(ranger + value);
                    } else if (tipo === 'subtracao') {
                        setRangerValue(ranger - value);
                    }
                }
                break;
            case 'kg':
                {
                    value = 0.1;
                    let ranger: number = RangerValue;
                    if (tipo === 'soma') {
                        setRangerValue(ranger + value);
                    } else if (tipo === 'subtracao') {
                        setRangerValue(ranger - value);
                    }
                }
                break;
            default:
                if (tipo === 'soma') {
                    setRangerValue(RangerValue + value);
                } else if (tipo === 'subtracao') {
                    setRangerValue(RangerValue - value);
                }
                break;
        }
    };

    const setValue = useCallback((value: string) => {
        if (value && value !== '0') {
            var _value: number = parseFloat(value);
            _value = _value < min ? min : _value;
            _value = _value > max ? max : _value;
            setRangerValue(_value);
            setInputValue(_value.toString());
        } else {
            setRangerValue(0);
            setInputValue('0');
        }
    }, []);

    useEffect(() => {
        setInputValue(RangerValue.toString());
    }, [RangerValue]);

    const setMask = (): string => {
        switch (medida) {
            case '°C':
                return '99.9';
                break;
            case 'kg':
                if (inputValue.length > 3) {
                    return '999.9';
                } else {
                    return '99.9';
                }
                break;
            case 'SpO²':
                return '999';
                break;
            case 'cm':
                return '999';
                break;
            default:
                return '999';
        }
    };

    return (
        <View style={styles.Container}>
            <Pressable
                disabled={disabled}
                style={styles.btnInc}
                onPress={() => inc_Dec('subtracao')}>
                <Subtracao fill={'#748080'} width={size} height={size} />
            </Pressable>
            <MaskedTextInput
                mask={setMask()}
                keyboardType={'numeric'}
                value={inputValue}
                maxLength={5}
                style={styles.valueInput}
                onChangeText={(text, rawText) => setInputValue(text)}
                onBlur={() => setValue(inputValue.toString())}
                returnKeyType="next"
                selectTextOnFocus={true}
                editable={!disabled}
            />
            <Text style={styles.text}>{medida && medida}</Text>
            <Pressable
                disabled={disabled}
                style={styles.btnInc}
                onPress={() => inc_Dec('soma')}>
                <Adicao fill={'#748080'} width={size} height={size} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    valueInput: {
        width: Dimensions.get('screen').width / 6,
        fontSize: RFValue(20, 680),
        textAlign: 'center',
        color: '#7C9292',
    },
    btnInc: {
        width: 40,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInc: {
        color: '#7C9292',
        fontSize: RFValue(20, 680),
        textAlign: 'center',
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(14, 680),
    },
});

export default memo(IncrementDecrement);
