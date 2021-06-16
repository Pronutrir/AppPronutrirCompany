import React, { useEffect, useContext } from 'react';
import { StyleSheet, Text, SafeAreaView, View, TouchableOpacity, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import AgendaConsultaContext from '../../contexts/agendaConsultas';
import NotificacaoSvg from '../../assets/svg/notificacao.svg';
import ExcluirSvg from '../../assets/svg/excluir.svg';
import AuthContext from '../../contexts/auth';
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function lembretesNotificacoes() {

    const size = Dimensions.get('screen').width / 15

    const { HistoryNotifyFirabase, stateConsultas, deleteNotifyFirabase } = useContext(AgendaConsultaContext);
    const { Notifications } = stateConsultas;

    const deleteNotificacao = async (refDoc) => {
        try {
            await deleteNotifyFirabase(refDoc);
        } catch (error) {

        }
    }

    useEffect(() => {
        HistoryNotifyFirabase();
    }, [])

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.item1}>
                <NotificacaoSvg fill={'#748080'} width={size} height={size} />
            </View>
            <View style={styles.item2}>
                <Text style={styles.title}>Especialidade:</Text>
                <Text style={styles.text}>{item.dS_ESPECIALIDADE}</Text>
                <Text style={styles.title}>Medico:</Text>
                <Text style={styles.text}>{item.nM_GUERRA}</Text>
                <Text style={styles.title}>Data - Hora:</Text>
                <Text style={styles.text}>{moment(item.dT_AGENDA).format('DD-MM-YYYY - HH:mm')}</Text>
            </View>
            <View style={styles.item3}>
                <TouchableOpacity style={styles.btn} onPress={() => deleteNotificacao(item.refDoc)}>
                    <ExcluirSvg fill={'#748080'} width={size} height={size} />
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderEmptyItem = () => (
        <View style={[styles.card, { justifyContent: 'center'}]}>
            <Text style={styles.title}s>No momento voce não possui notificações!</Text>
        </View>
    )

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Notifications}
                renderItem={renderItem}
                keyExtractor={item => item.nR_SEQUENCIA.toString()}
                ListEmptyComponent={renderEmptyItem}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Dimensions.get('screen').width / 30,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        marginHorizontal: Dimensions.get('screen').width / 20,
        marginVertical: Dimensions.get('screen').width / 30,
        borderRadius: 10,
        flexDirection: 'row',
        padding: 5,
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
    },
    item1: {
        flex: 0.2,
        padding: 5,
        justifyContent: 'flex-start'
    },
    item2: {
        flex: 2,
        padding: 10
    },
    item3: {
        flex: 0.4,
        padding: 5,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    title:{
        color: '#08948A',
        fontSize: RFValue(16, 680),
        paddingVertical: 3
    },
    text:{
        color: '#748080',
        fontSize: RFValue(14, 680),
    },
    btn: {
        width: 40,
        height: 40,
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
                elevation: 3
            }
        }),
        backgroundColor: "#fff",
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

