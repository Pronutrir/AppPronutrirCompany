import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import CarouselUnidades from '../../componentes/CarroselUnidades';
import CarroselConvenios from '../../componentes/CarroselConvenios';

export default function unidades({ route }) {

    const { Unidade } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <CarouselUnidades cod_estabelecimento={Unidade}/>
            </View>
            <View style={styles.box2}>
                <Text style={styles.label}>Principais Convênios</Text>
                <CarroselConvenios cod_estabelecimento={Unidade}/>
            </View>
        </View>
    )
}