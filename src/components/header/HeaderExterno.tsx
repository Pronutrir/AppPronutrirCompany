import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import ExitButtom from '../buttons/ExitButtom';
import PilulaComprimidoImg from '../../assets/svg/pilula-e-comprimido.svg';
import AgendarConsultaImg from '../../assets/svg/AgendarConsulta.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';

interface Props {
    title?: string | null;
}

const HeaderExterno: React.FC<Props> = ({title}: Props) => {
    const size = Dimensions.get('screen').width / 10;

    const SetIcone = () => {
        switch (title) {
            case 'Medicamentos':
                return (
                    <PilulaComprimidoImg
                        fill={'#748080'}
                        width={size}
                        height={size}
                    />
                );
            default:
                return (
                    <AgendarConsultaImg
                        fill={'#748080'}
                        width={size}
                        height={size}
                    />
                );
        }
    };

    return (
        <SafeAreaView style={{backgroundColor: '#797979'}}>
            <View style={styles.container}>
                <View style={styles.box2}>
                    <View style={styles.item1}>
                        <ExitButtom />
                        <SetIcone />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        height: (Dimensions.get('window').height / 100) * 10,
        backgroundColor: '#E6ECEC',
    },
    box2: {
        flex: 2,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    item1: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 5,
    },
    item2: {
        flex: 0.5,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    title: {
        fontSize: RFValue(20, 680),
        color: '#666666',
        fontWeight: 'bold',
    },
    img: {
        width: 40,
        height: 40,
    },
});

export default HeaderExterno;
