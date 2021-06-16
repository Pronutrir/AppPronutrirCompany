import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, SafeAreaView, Image } from 'react-native';
import AgendaConsultaContext from '../../../contexts/agendaConsultas';
import UserSvg from '../../../assets/svg/user.svg';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { FormatText } from '../../../services/validacoes';

const numColums = 2
export default function equipe({ route }) {

    const { Unidade } = route.params;
    const { stateConsultas } = useContext(AgendaConsultaContext);
    const [medicos, setMedicos] = useState([]);

    const filterMedicos = () => {
        function filtrarMedicos(values) {
            return values.cD_ESTABELECIMENTO === Unidade
        }
        setMedicos(stateConsultas.ImgMedicos.filter(filtrarMedicos));
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <View style={styles.item1}>
                    <Text style={styles.cardLabel}>Dr(a). {FormatText(item.nM_GUERRA)}</Text>
                </View>
                <View style={styles.item2}>
                    {
                        item.ImgUrl ?
                            <Image style={styles.cardImg} source={{ uri: item.ImgUrl }} />
                            :
                            <UserSvg width={80} height={80} />
                    }
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.cardCrm}>CRM </Text>
                        <Text style={styles.cardCrm}>{item.nR_CRM}</Text>
                    </View>
                </View>
                <View style={styles.item3}>
                    <Text style={styles.cardEspecialidade}>Especialidade:</Text>
                    <Text style={styles.cardtext}>{item.dS_ESPECIALIDADE}</Text>
                </View>
            </View>
        )
    }

    useEffect(() => {
        filterMedicos();
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <FlatList
                    data={medicos}
                    renderItem={renderItem}
                    keyExtractor={item => item.nR_CRM}
                    numColumns={numColums}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    box:{
        flex: 1,
        backgroundColor: '#fff',
        marginVertical: 20
    },
    card: {
        flex: 1,
        height: Dimensions.get('window').height / 100 * 35,
        margin: 8,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            }
        }),
        borderRadius: 10,
        paddingVertical: 5
    },
    cardImg: {
        width: Dimensions.get('screen').width / 4,
        height: Dimensions.get('screen').width / 4,
        borderRadius: 80
    },
    item1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 5
    },
    item2: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardLabel: {
        fontSize: RFValue(14, 680),
        textAlign: 'center',
        color: '#748080'
    },
    cardCrm: {
        fontSize: RFValue(16, 680),
        textAlign: 'center',
        color: '#748080'
    },
    cardEspecialidade: {
        fontSize: RFValue(16, 680),
        textAlign: 'center',
        color: '#08948A'
    },
    cardtext: {
        fontSize: RFValue(14, 680),
        textAlign: 'center',
        color: '#748080'
    }
})
