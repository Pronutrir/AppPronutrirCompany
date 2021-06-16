import React from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';

export default function MyLoadingBall() {

    return (
        <View style={styles.container}>
            <Image style={styles.loadingImg} source={require('../assets/imagens/DualBall.gif')} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingImg:{
        width: Dimensions.get('screen').width / 8,
        height: Dimensions.get('screen').width / 8
    }
})
