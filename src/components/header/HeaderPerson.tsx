import React from 'react';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import AgendarConsultaImg from '../../assets/svg/AgendarConsulta.svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import BackButton from '../buttons/BackButton';
import {SvgProps} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';

interface Props {
    title?: string | null;
    ImgSvg?: React.FC<SvgProps>;
}

const HeaderPerson: React.FC<Props> = ({title, ImgSvg}: Props) => {
    const size = Dimensions.get('screen').width / 10;
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{backgroundColor: '#E6ECEC'}}>
            <View style={styles.container}>
                <View style={styles.box2}>
                    <View style={styles.item1}>
                        <BackButton onPress={() => navigation.goBack()} />
                        <Text style={styles.title}>{title && title}</Text>
                        {ImgSvg ? (
                            <ImgSvg
                                fill={'#748080'}
                                width={size}
                                height={size}
                            />
                        ) : (
                            <AgendarConsultaImg
                                fill={'#748080'}
                                width={size}
                                height={size}
                            />
                        )}
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
        paddingTop: 10,
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

export default HeaderPerson;
