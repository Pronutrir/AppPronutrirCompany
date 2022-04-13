import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
interface Props {
    Item?: number;
}

const CheckPVSinaisVitaisComponent: React.FC<Props> = ({ Item }: Props) => {
    if (Item === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.options1}>
                    <Text style={styles.options1Text}>1º</Text>
                </View>
            </View>
        );
    } else {
        return null;
    }
};

export default CheckPVSinaisVitaisComponent;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        top: -10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        alignSelf: 'center',
    },
    text: {
        color: '#1E707D',
        fontSize: RFValue(10, 680),
    },
    options1: {
        backgroundColor: 'rgb(32,196,203)',
        width: RFPercentage(3.5),
        height: RFPercentage(3.5),
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    options1Text: {
        fontSize: RFValue(18, 680),
        color: '#ffff',
        fontWeight: 'bold',
    },
});
