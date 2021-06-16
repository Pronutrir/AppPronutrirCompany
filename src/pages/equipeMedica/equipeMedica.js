import React, { useState, useEffect, useContext } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from './style';
import HospitalLocationSvg from '../../assets/svg/hospitalLocation.svg';
import ProximoSvg from '../../assets/svg/proximo.svg';
import Api from '../../services/api';
import storage from '@react-native-firebase/storage';
import AgendaConsultaContext from '../../contexts/agendaConsultas';
import ErrorContext from '../../contexts/errorNotification';
import MyLoadingBall from '../../componentes/MyLoadingBall';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export default function EquipeMedica({ navigation }) {

    const size = Dimensions.get('screen').width / 18
    const sizeImg = Dimensions.get('screen').width / 10

    const { addError } = useContext(ErrorContext);
    const { stateConsultas, dispathConsultas } = useContext(AgendaConsultaContext);

    const getImagensMedico = async (itemFull, itemName) => {
        const url = await storage().ref(itemFull).getDownloadURL();
        return { title: itemFull, UrlImg: url, name: itemName };
    }

    const getImagens = async (medicoslist) => {
        return Promise.all(medicoslist.map(async item => { return getImagensMedico(item.fullPath, item.name) }))
    }

    const getMedicos = async (reference, pageToken) => {
        var { result } = await Api.get('Medicos').then(response => { return response.data })
        if (result) {
            const resultado = await storage().ref('medicosPronutrir').list({ pageToken }).then(_result => {
                return getImagens(_result.items).then(resultUrl => {

                    const teste = result.map(itemMedico => {
                        resultUrl.map(itemImg => {
                            const nameImg = itemImg.name.split('.', 1);
                            if (nameImg[0] === itemMedico.nR_CRM) {
                                itemMedico = { ...itemMedico, ImgUrl: itemImg.UrlImg }
                            }
                        })
                        return itemMedico
                    })
                    return teste;
                })
            }).catch(error => {
                addError(`Não foi possivel acessar os médicos! tente mais tarde - ${error.message}`);
            })
            dispathConsultas({ type: 'setImgMedicos', ImgMedicos: resultado });
        }
    }

    useEffect(() => {
        if (stateConsultas.ImgMedicos.length === 0) {
            getMedicos();
        }
    }, [])

    const lazyLoading = () => {
        return (
            Array(3).fill(
                <ShimmerPlaceholder style={styles.card} LinearGradient={LinearGradient} />
            )
        )
    }

    return (
        <View style={styles.container}>
            {
                stateConsultas.ImgMedicos.length > 0
                    ?
                    <>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Equipe', { Unidade: 7 })}>
                            <View style={styles.item1}>
                                <HospitalLocationSvg fill={'#748080'} width={sizeImg} height={sizeImg} />
                            </View>
                            <View style={styles.item2}>
                                <Text style={styles.text}>Unidade Fortaleza</Text>
                            </View>
                            <View style={styles.item3}>
                                <ProximoSvg fill={'#748080'} width={size} height={size} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Equipe', { Unidade: 12 })}>
                            <View style={styles.item1}>
                                <HospitalLocationSvg fill={'#748080'} width={sizeImg} height={sizeImg} />
                            </View>
                            <View style={styles.item2}>
                                <Text style={styles.text}>Unidade Sobral</Text>
                            </View>
                            <View style={styles.item3}>
                                <ProximoSvg fill={'#748080'} width={size} height={size} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Equipe', { Unidade: 8 })}>
                            <View style={styles.item1}>
                                <HospitalLocationSvg fill={'#748080'} width={sizeImg} height={sizeImg} />
                            </View>
                            <View style={styles.item2}>
                                <Text style={styles.text}>Unidade Cariri</Text>
                            </View>
                            <View style={styles.item3}>
                                <ProximoSvg fill={'#748080'} width={size} height={size} />
                            </View>
                        </TouchableOpacity>
                    </>
                    :
                    lazyLoading()
            }
        </View>
    )
}