import React, { useEffect, memo } from 'react';
import { StyleSheet, View, Pressable, Dimensions, Text } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Adicao from '../assets/svg/math-plus.svg';
import Subtracao from '../assets/svg/math-minus.svg';
interface Props {
    RangerValue: number;
    medida: string;
    setRangerValue(value: number): void;
};

const IncrementDecrement: React.FC<Props> = ({ RangerValue = 0, setRangerValue, medida }: Props) => {

    const size = Dimensions.get('screen').height / 40

    const inc_Dec = (tipo: string) => {

        var value: number = 1;

        switch (medida) {
            case '°C': {
                value = 0.1;
                let ranger: number = RangerValue;
                if (tipo === 'soma') {
                    setRangerValue(ranger + value);
                } else if (tipo === 'subtracao') {
                    setRangerValue(ranger - value);
                }
            }
                break;
            case 'kg': {
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
                } break;
        }
    }

    useEffect(() => {
        setRangerValue(RangerValue);
    }, [RangerValue])

    useEffect(() => {
        console.log("componente", RangerValue)
    })

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
            <Text style={styles.text}>{medida && medida}</Text>
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
        width: Dimensions.get('screen').width / 8,
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
    },
    text: {
        color: '#7C9292',
        fontSize: RFValue(14, 680),
    }
});

export default memo(IncrementDecrement);
