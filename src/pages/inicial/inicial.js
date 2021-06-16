import React from 'react'
import { View, Image, ImageBackground } from 'react-native'

import styles from './style'

export default function inicial() {
    return (
        <View style={styles.container}>
            <ImageBackground style={{ flex: 1 }} resizeMode={'cover'} source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={styles.box1}>
                    <Image style={styles.imgGif} source={require('../../assets/imagens/logo.gif')} />
                </View>
                <View style={styles.box2}>
                    <Image style={styles.img} source={require('../../assets/imagens/Pronutrir1.png')} />
                </View>
            </ImageBackground>
        </View>
    )
}