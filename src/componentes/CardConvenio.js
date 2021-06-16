import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, FlatList, Dimensions } from 'react-native';
import moment from 'moment';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function CardConvenio({ listaConvenios, selectedItem }) {

    const { AddConvenios } = listaConvenios;

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.box1}>
                <View style={styles.idConsulta}>
                    <Text style={styles.textId}>1</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.DescriptionConsulta}>Convênio: </Text>
                    <Text style={[styles.DescriptionConsulta, { fontWeight: 'normal' }]}>{item.convenio.dS_CONVENIO}</Text>
                </View>
                <View style={[styles.label2, { flexDirection: 'row' }]}>
                    <Text style={styles.DescriptionConsulta}>Plano: </Text>
                    <Text style={[styles.DescriptionConsulta, { fontWeight: 'normal' }]}>{item.plano.dS_PLANO}</Text>
                </View>
                <View style={[styles.label2, { flexDirection: 'row' }]}>
                    <Text style={styles.DescriptionConsulta}>Carteirinha: </Text>
                    <Text style={[styles.DescriptionConsulta, { fontWeight: 'normal' }]}>{item.numeroCarteira.substring(0, 3) + " . . ."}</Text>
                </View>
                <View style={[styles.label2, styles.data]}>
                    <Text style={styles.DescriptionConsulta}>Data/Horário do registro: </Text>
                    <Text style={styles.description}>{moment().format('DD-MM-YYYY - h:mm:ss')}</Text>
                </View>
            </View>
            <View style={styles.box2}>
                <TouchableOpacity style={styles.btn} onPress={() => selectedItem()}>
                    <Image style={styles.img} source={require('../assets/imagens/lixo-5.png')} />
                </TouchableOpacity>
            </View>
        </View>
    )
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={AddConvenios}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    card: {
        width: '99%',
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
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 5
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
