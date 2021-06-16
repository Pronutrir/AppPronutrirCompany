import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import HospitalLocationSvg from '../../assets/svg/hospitalLocation.svg';
import ProximoSvg from '../../assets/svg/proximo.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function menuUnidades({ navigation }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Unidades', { Unidade: 7 })}>
                <View style={styles.item1}>
                    <HospitalLocationSvg fill={'#748080'} width={40} height={40} />
                </View>
                <View style={styles.item2}>
                    <Text style={styles.text}>Unidade Fortaleza</Text>
                </View>
                <View style={styles.item3}>
                    <ProximoSvg fill={'#748080'} width={15} height={15} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Unidades', { Unidade: 12 })}>
                <View style={styles.item1}>
                    <HospitalLocationSvg fill={'#748080'} width={40} height={40} />
                </View>
                <View style={styles.item2}>
                    <Text style={styles.text}>Unidade Sobral</Text>
                </View>
                <View style={styles.item3}>
                    <ProximoSvg fill={'#748080'} width={15} height={15} />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Unidades', { Unidade: 8 })}>
                <View style={styles.item1}>
                    <HospitalLocationSvg fill={'#748080'} width={40} height={40} />
                </View>
                <View style={styles.item2}>
                    <Text style={styles.text}>Unidade Cariri</Text>
                </View>
                <View style={styles.item3}>
                    <ProximoSvg fill={'#748080'} width={15} height={15} />
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        padding: 10
    },
    card:{
        width: '100%',
        height:  Dimensions.get('screen').height / 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fff",
        borderRadius: 10,
        margin: 10,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 1
                },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 3
            }
        }),
    },
    item1:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item2:{
        flex: 2,
        alignItems: 'center'
    },
    item3:{
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        fontSize: RFValue(18, 680),
        color: '#748080'
    }
});
