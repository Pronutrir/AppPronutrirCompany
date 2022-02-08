import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import CheckMark from '../../../../assets/svg/checkMark.svg';
import SinaisVitaisContext from '../../../../contexts/sinaisVitaisContext';
import CheckSinaisVitaisComponent from '../checkSinaisVitaisComponent/checkSinaisVitaisComponent';

interface Props {
    Item: string;
}

const checkSinaisVitaisComponent: React.FC<Props> = ({ Item }: Props) => {
    const {
        stateConsultas: { sinaisVitais },
    } = useContext(SinaisVitaisContext);

    if(sinaisVitais?.some(
        (element) => element.cD_PACIENTE === Item,
    )){
        return (
            <View style={styles.container}>
                <CheckMark
                    style={styles.img}
                    width={RFPercentage(3.5)}
                    height={RFPercentage(3.5)}
                />
                <Text style={styles.text}>Enviado</Text>
            </View>
        );
    }else{
        return null;
    }
};

export default checkSinaisVitaisComponent;

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        right: 0,
        bottom: -10,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        alignSelf: 'center',
    },
    text: {
        color: '#1E707D',
        fontSize: RFValue(10, 680),
    },
});
