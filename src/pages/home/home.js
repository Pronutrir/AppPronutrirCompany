import React, { useEffect, useState } from 'react';
import { View, Image, ImageBackground } from 'react-native';
import CarouselText from '../../componentes/Carousel_text';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import BtnCentered from '../../components/buttons/BtnCentered';
import LogoNameSvg from '../../assets/svg/logoName.svg';

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
    };

    useEffect(() => {
        const unsubscribe = dynamicLinks().onLink(on_handleDynamicLink);

        dynamicLinks()
            .getInitialLink()
            .then((link) => {
                if (link) {
                    if (
                        link.url ===
                        'https://webapppronutrir.com.br/redefinirsenha'
                    ) {
                        // ...set initial route as offers screen
                        navigation.navigate('ConsultaCpf');
                    }
                }
            });
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground
                style={{ flex: 1 }}
                resizeMode={'cover'}
                source={require('../../assets/imagens/logoBackgroud.png')}>
                <View style={styles.box1}>
                    <View style={styles.img}>
                        <LogoNameSvg />
                    </View>
                </View>
                <View style={styles.box2}>
                    <CarouselText />
                </View>
                <View style={styles.box3}>
                    <BtnCentered
                        labelBtn={'Começar'}
                        SizeText={18}
                        onPress={() => navigation.navigate('ConsultaCpf')}
                    />
                </View>
            </ImageBackground>
        </View>
    );
}
