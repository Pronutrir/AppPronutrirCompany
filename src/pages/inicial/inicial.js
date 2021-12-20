import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import { View, Image, ImageBackground } from 'react-native';
import LogoNameSvg from '../../assets/svg/logoName.svg';

import styles from './style'

export default function inicial() {
    return (
        <View style={styles.container}>
            <ImageBackground style={{ flex: 1 }} resizeMode={'cover'} source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={styles.box1}>
                    <AnimatedLottieView
                        source={require('../../assets/Animacoes/logoAnimated.json')}
                        autoPlay={true}
                        loop={true}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
                <View style={styles.box2}>
                    <View style={styles.img}>
                        <LogoNameSvg />
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}