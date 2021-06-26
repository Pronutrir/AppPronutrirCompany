import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';

interface Props {
    valueText: string;
    onPress(): void;
};

const Btnprosseguir: React.FC<Props> = ({ onPress, valueText } : Props) => {
    return (
        <View style={styles.container}>
            <LinearGradient colors={['#a5d0d0', '#eaf3f4']} style={styles.linearGradient}>
                <TouchableOpacity style={styles.btn} onPress={onPress}>
                    <Text style={styles.text}>{valueText ? valueText : 'Prosseguir'}</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#DBCCCC'
    },
    text: {
        fontSize: RFValue(24, 680),
        color: '#1E707D',
        fontWeight: 'bold'
    },
    btn: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    linearGradient: {
        flex: 1,
        width: RFPercentage(30),
        borderRadius: 30,
        marginVertical: 5, 
        ...Platform.select({
            android: {
                elevation: 3
            },
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            default: {
                elevation: 3
            }
        })
    }
});

export default Btnprosseguir;
