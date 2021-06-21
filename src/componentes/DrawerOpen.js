import React from 'react'
import { View, Image, TouchableOpacity, StyleSheet, Text, Dimensions } from 'react-native'

import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import BotaoMenu from '../assets/svg/BotaoMenu.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function DrawerOpen() {

    const navigation = useNavigation();

    return (
            <TouchableOpacity style={styles.container} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <View style={styles.btnItem}>
                    <BotaoMenu fill={'#8E8E8F'} width={RFPercentage(3, 680)} height={RFPercentage(3, 680)} />
                </View>
                <View style={styles.btnItem}>
                    <Text style={styles.text}>Menu</Text>
                </View>
            </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: RFValue(12, 680),
        color: '#8E8E8F'
    },
    btnItem:{
        flex: 1, 
        justifyContent: 'flex-end'
    }
})
