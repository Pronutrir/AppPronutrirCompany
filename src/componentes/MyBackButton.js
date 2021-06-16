import React from 'react'
import { Platform } from 'react-native';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import ArrowBack from '../assets/svg/arrowBack.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MyBackButton({ onPress }) {

    const size = Dimensions.get('screen').width / 12
    
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <ArrowBack fill={'#748080'} width={size} height={size} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        borderRadius: 30,
    },
    imgBtn: {
        padding: 15,
    }
})
