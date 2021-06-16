import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import LinearGradient from 'react-native-linear-gradient';

export default function myButtom({ onPress, valueText, fontSize }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.btn} onPress={() => onPress()}>
                <LinearGradient
                    useAngle={true}
                    angle={45}
                    angleCenter={{ x: 0.5, y: 0.5 }}
                    colors={['#52b4ad', '#219f96', '#08948a']}
                    style={styles.linearGradient}
                >
                    <Text
                        style={[styles.text, fontSize && { fontSize: RFValue(fontSize, 680) }]}
                    >
                        {valueText ? valueText : 'Prosseguir'}
                    </Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: RFValue(24, 680),
        color: '#fff',
        fontWeight: 'bold'
    },
    btn: {
        width: 250,
        height: 60,
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 30,
        ...Platform.select({
            android: {
                elevation: 5
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
                elevation: 5
            }
        })
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    }
})

