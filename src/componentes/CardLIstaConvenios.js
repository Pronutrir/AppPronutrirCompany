import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function CardLIstaConvenios({ listaConvenios, selectedItem }) {

    const { Convenios } = listaConvenios;

    const renderItem = ({ item, index }) => (
        <View style={styles.card}>
            <View style={styles.box1}>
                <View style={styles.label}>
                    <View style={styles.idConsulta}>
                        <Text style={styles.textId}>{index + 1}</Text>
                    </View>
                    <View>
                        <Text style={styles.DescriptionConsulta}>Convênio: </Text>
                        <Text style={[styles.DescriptionConsulta, { fontWeight: 'normal' }]}>{item.dS_CONVENIO}</Text>
                    </View>
                </View>
                <View style={[styles.label2, { flexDirection: 'row' }]}>
                    <Text style={styles.DescriptionConsulta}>Plano: </Text>
                    <Text style={[styles.DescriptionConsulta, { fontWeight: 'normal' }]}>{item.dS_PLANO}</Text>
                </View>
                <View style={[styles.label2, { flexDirection: 'row' }]}>
                    <Text style={styles.DescriptionConsulta}>Carteirinha: </Text>
                    <Text style={[styles.DescriptionConsulta, { fontWeight: 'normal' }]}>{item.cD_USUARIO_CONVENIO && item.cD_USUARIO_CONVENIO.substring(0, 3) + " . . ."}</Text>
                </View>
                <View style={[styles.label2, styles.data]}>
                    <Text style={styles.DescriptionConsulta}>Data/Horário do registro: </Text>
                    <Text style={styles.description}>{moment(item.dT_ATUALIZACAO).format('DD-MM-YYYY - h:mm:ss')}</Text>
                </View>
            </View>
            <View style={styles.box2}>
                <TouchableOpacity style={styles.btn} onPress={() => selectedItem(item)}>
                    <Image style={styles.img} source={require('../assets/imagens/lixo-5.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Convenios}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '80%'
    },
    card: {
        width: '98%',
        flexDirection: 'row',
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
        backgroundColor: '#fff',
        marginBottom: 10,
        alignSelf: 'center',
        marginTop: 10
    },
    box1: {
        width: '80%',
        padding: 10,
    },
    box2: {
        justifyContent: 'flex-end',
        width: '20%',
        padding: 10,
        alignItems: 'center'
    },
    img: {
        width: 20,
        height: 20
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width / 10,
        height: Dimensions.get('screen').width / 10,
        marginVertical: 5,
        borderRadius: 30,
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
        backgroundColor: '#fff'
    },
    label: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    label2: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 10
    },
    idConsulta: {
        backgroundColor: '#7C9292',
        width: 25,
        height: 25,
        marginRight: 10,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textId: {
        color: '#fff',
        fontWeight: 'bold'
    },
    DescriptionConsulta: {
        fontSize: RFValue(16, 680),
        color: '#7C9292',
        fontWeight: 'bold'
    },
    description: {
        fontSize: RFValue(16, 680),
        color: '#7C9292',
    }
})
