import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const CardSimples = ({ children }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => console.log('teste')}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        })
    }
})

export default CardSimples;