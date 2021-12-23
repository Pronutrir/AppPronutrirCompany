import React, { useContext } from 'react';
import { View } from 'react-native';
import styles from './style';
import CardSinaisVitais from '../components/cardSinaisVitais';
import SinaisVitaisContext from '../../../contexts/sinaisVitaisContext';

const ConsultasSinaisVitais: React.FC = () => {
    const { consultas } = useContext(SinaisVitaisContext);

    return (
        <View style={styles.container}>
            <CardSinaisVitais dataSource={consultas} />
        </View>
    );
};

export default ConsultasSinaisVitais;
