import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import CarouselText from '../../componentes/Carousel_text';
import dynamicLinks from '@react-native-firebase/dynamic-links';

import styles from './style';

export default function home({ navigation }) {

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');

    const on_handleDynamicLink = (link) => {
        if (link) {
            if (link.url === 'https://webapppronutrir.com.br/redefinirsenha') {
                // ...set initial route as offers screen
                navigation.navigate('Login');
            }
        }
    }

    useEffect(() => {

        const unsubscribe = dynamicLinks().onLink(on_handleDynamicLink);

        dynamicLinks().getInitialLink().then(link => {
            if (link) {
                if (link.url === 'https://webapppronutrir.com.br/redefinirsenha') {
                    // ...set initial route as offers screen
                    navigation.navigate('ConsultaCpf');
                }
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground style={{ flex: 1 }} resizeMode={'cover'} source={require('../../assets/imagens/logoBackgroud.png')}>
                    <View style={styles.box1}>
                        <Image style={styles.logo} source={require('../../assets/imagens/Pronutrir1.png')} />
                    </View>
                    <View style={styles.box2}>
                        <CarouselText />
                    </View>
                    <View style={styles.box3}>
                        <TouchableOpacity style={styles.Btn} onPress={() => navigation.navigate('ConsultaCpf')}>
                            <Text style={styles.text}>Começar</Text>
                        </TouchableOpacity>
                    </View>
            </ImageBackground>
        </View>
    )
}
