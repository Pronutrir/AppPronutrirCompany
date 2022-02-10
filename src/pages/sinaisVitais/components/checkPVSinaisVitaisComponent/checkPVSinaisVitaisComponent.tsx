import React from 'react';
import { StyleSheet, View, Platform, Text } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
interface Props {
    Item?: string;
}

const CheckPVSinaisVitaisComponent: React.FC<Props> = ({ Item }: Props) => {
    if (Item === 'C1') {
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
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    options1Text: {
        fontSize: RFValue(18, 680),
        color: '#ffff',
        fontWeight: 'bold',
    },
});
