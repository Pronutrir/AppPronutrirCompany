import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Dimensions,
    StyleSheet,
    Platform,
    FlatList
} from 'react-native';

import storage from '@react-native-firebase/storage';
import { Image } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import ErrorContext from '../contexts/errorNotification'; 
import Api from '../services/api';

export default function CarroselConvenios({ cod_estabelecimento }) {

    const { addError } = useContext(ErrorContext);
    const [imagens, setImagens] = useState([]);

    const getImgUrl = async (itemFull, itemName) => {
        const url = await storage().ref(itemFull).getDownloadURL();
        return { title: itemFull, UrlImg: url, name: itemName };
    }

    const getImagens = async (ListItem) => {
        return Promise.all(ListItem.map(async item => { return getImgUrl(item.fullPath, item.name) }))
    }

    const listConvenios = async (reference, pageToken) => {
        var { result } = await Api.get(`Convenios/ConveniosDisponiveisPorEstabelecimentoListar?estabelecimento=${cod_estabelecimento}`).then(response => { return response.data })
        if (result) {
            const resultFormat = result[0].coD_CONVENIO.replace(/ /g, "");
            const listCodConvenios = resultFormat.split(',')
            const resultado = await storage().ref('Convenios').list({ pageToken }).then(_result => {

                return getImagens(_result.items).then(resultUrl => {
                    
                    const  ListaFilterConvenios = [];
                    listCodConvenios.map(itemConvenio => {
                        resultUrl.map(itemImg => {
                            const nameImg = itemImg.name.split('.', 1);
                            if (nameImg[0] == itemConvenio) {
                                ListaFilterConvenios.push({ cD_CONVENIO: itemConvenio ,ImgUrl: itemImg.UrlImg });
                            }
                        })
                    })

                    return ListaFilterConvenios;
                })
            }).catch(error => {
                addError(`Não foi possivel acessar os convênios tente mais tarde! - ${error.message}`);
            })
            setImagens(resultado.filter((item) => item.cD_CONVENIO !== 1))
        }
    }

    useEffect(() => {
        listConvenios();
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View style={styles.card}>
                <Image style={styles.img} source={{ uri: item.ImgUrl }} />
            </View>
        )
    }

    const renderItemEmpty = ({ item }) => {
        return (
            Array(5).fill(
                <ShimmerPlaceholder style={styles.card} LinearGradient={LinearGradient} />
            )
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                horizontal={true}
                pagingEnabled={true}
                data={imagens}
                renderItem={renderItem}
                keyExtractor={item => item.ImgUrl}
                ListEmptyComponent={renderItemEmpty}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 12,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
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
        })
    },
    img: {
        resizeMode: 'contain',
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 14,
    }
})
