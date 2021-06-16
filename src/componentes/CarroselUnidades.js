import React, { useRef, useState, useEffect, useContext } from 'react';
import { useWindowDimensions, Linking, TouchableOpacity } from 'react-native';
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import {
    View,
    Dimensions,
    StyleSheet,
    Text,
    Platform,
    SafeAreaView, PixelRatio
} from 'react-native';

import storage from '@react-native-firebase/storage';
import Api from '../services/api';
import AgendaConsultaContext from '../contexts/agendaConsultas';
import { foneMask, FormatText, cepMask } from '../services/validacoes';
import LocalizacaoImg from '../assets/svg/localizacao.svg';
import InstagramSvg from '../assets/svg/instagram.svg';
import FacebookSvg from '../assets/svg/facebook.svg';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const MyCarousel = ({ cod_estabelecimento }) => {

    const pronutirFortaleza = 'https://goo.gl/maps/3Mv4oDGMVAenesFg6';
    const pronutrirCarriri = 'https://goo.gl/maps/qLwmSBdDggXUTVz5A';
    const pronutrirSobral = 'https://goo.gl/maps/c5rjxfwXYcUMUNXL7';

    const windowWidth = useWindowDimensions().width;
    const windowHeight = useWindowDimensions().height;

    const { stateConsultas, dispathConsultas } = useContext(AgendaConsultaContext);
    const [unidade, setUnidade] = useState(null);
    const { UnidadesUrl } = stateConsultas;

    const [modalActive, setModalActive] = useState(false);
    const carouselRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState();

    const getImgUrl = async (itemFull, itemName) => {
        const url = await storage().ref(itemFull).getDownloadURL();
        return { title: itemFull, UrlImg: url, name: itemName };
    }

    const getImagens = async (ListItem) => {
        return Promise.all(ListItem.map(async item => { return getImgUrl(item.fullPath, item.name) }))
    }

    const getUnidades = async (reference, pageToken) => {
        var { result } = await Api.get('Estabelecimentos/listarEstabelecimentos').then(response => { return response.data })
        if (result) {
            result = result.filter(unidade => unidade.cD_ESTABELECIMENTO !== 4)
            const resultado = await storage().ref('unidades').list({ pageToken }).then(resultImg => {
                return getImagens(resultImg.items).then(_resultUrl => {
                    const unidadesUrl = result.map(itemUnidade => {
                        _resultUrl.map(itemImg => {
                            const nameImg = itemImg.name.split('.', 1);
                            if (nameImg[0] === itemUnidade.dS_MUNICIPIO.toLowerCase()) {
                                return itemUnidade = { ...itemUnidade, ImgUrl: itemImg.UrlImg }
                            }
                        });
                        return itemUnidade;
                    });
                    const order_unidadesUrl = unidadesUrl.sort(function (a, b) {
                        return a.dS_MUNICIPIO < b.dS_MUNICIPIO ? -1 : a.dS_MUNICIPIO > b.dS_MUNICIPIO ? 1 : 0
                    })
                    return order_unidadesUrl;
                });
            });
            setUnidade(resultado.filter((item) => item.cD_ESTABELECIMENTO === cod_estabelecimento));
        }
    }

    const selectEstabelecimento = (codEstabelecimento) => {
        switch (codEstabelecimento) {
            case 7: return pronutirFortaleza
                break;
            case 12: return pronutrirSobral
                break;
            case 8: return pronutrirCarriri
                break;
            default: return pronutirFortaleza
                break;
        }
    }

    useEffect(() => {
        getUnidades();
    }, []);

    const renderItem = ({ item, index }, parallaxProps) => {
        return (
            <View style={styles.card}>
                <View style={styles.cardBox1}>
                    <ParallaxImage
                        source={{ uri: item.ImgUrl }}
                        containerStyle={styles.imageContainer}
                        //showSpinner={true}
                        style={styles.image}
                        parallaxFactor={0}
                        {...parallaxProps}
                    />
                </View>
                <View style={styles.cardBox2}>
                    <View style={styles.item1}>
                        <Text adjustsFontSizeToFit={true} style={styles.cardLabel}>{`${item.dS_MUNICIPIO} - ${item.sG_ESTADO}`}</Text>
                        {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={{margin: 10 }} onPress={() => Linking.openURL(`https://www.facebook.com/pronutriroficial/?ref=br_rs`)}>
                                <InstagramSvg width={25} height={25} />
                            </TouchableOpacity>
                            <TouchableOpacity style={{margin: 10 }} onPress={() => Linking.openURL('fb://profile/508499826155556')}>
                                <FacebookSvg width={25} height={25} />
                            </TouchableOpacity>
                        </View> */}
                    </View>
                    <View style={styles.item2}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={styles.label}>Endereço: </Text>
                            <Text style={styles.text}>{`Rua ${FormatText(item.dS_ENDERECO)}, nº ${item.nR_ENDERECO}`}</Text>
                        </View>
                        <View style={[styles.boxRow]}>
                            <Text style={styles.label}>Bairro: </Text>
                            <Text style={styles.text}>{`${FormatText(item.dS_BAIRRO)}`}</Text>
                        </View>
                        <View style={styles.boxRow}>
                            <Text style={styles.label}>Cep: </Text>
                            <Text style={styles.text}>{`${cepMask(item.cD_CEP.toString())}`}</Text>
                        </View>
                        <View style={styles.boxRow}>
                            <Text style={styles.label}>Telefone: </Text>
                            <Text style={styles.text}>{foneMask(`${item.nR_DDD_TELEFONE} ${item.nR_TELEFONE}`)}</Text>
                        </View>
                        <View style={styles.boxRow}>
                            <Text style={styles.label}>Horário:  </Text>
                            <Text style={styles.text}>Segunda - Sexta (7:30 - 18:00)</Text>
                        </View>
                        <View style={styles.boxRow}>
                            <Text style={styles.label}>Localização:  </Text>
                            <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => Linking.openURL(selectEstabelecimento(item.cD_ESTABELECIMENTO))}>
                                <Text style={styles.text}>{item.endereco}<LocalizacaoImg width={25} height={25} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    const renderItemEmpty = () => {
        return (
            <View style={styles.cardShimmer}>
                <View style={styles.cardBox1}>
                    <ShimmerPlaceholder
                        style={{
                            width: '100%',
                            height: '100%',
                            marginBottom: Platform.select({ ios: 0, android: 1 }),
                            borderTopStartRadius: 10,
                            borderTopEndRadius: 10
                        }}
                        LinearGradient={LinearGradient}
                    />
                </View>
                <View style={styles.cardBox2}>
                    <View style={styles.item1}>
                        <ShimmerPlaceholder style={{ flex: 1 }} LinearGradient={LinearGradient} />
                    </View>
                    <View style={styles.item2}>
                        <View style={{ marginBottom: 5 }}>
                            <ShimmerPlaceholder style={{ flex: 1 }} LinearGradient={LinearGradient} />
                        </View>
                        <View style={[styles.boxRow, { marginTop: 10 }]}>
                            <ShimmerPlaceholder style={{ flex: 1 }} LinearGradient={LinearGradient} />
                        </View>
                        <View style={[styles.boxRow, { marginTop: 10 }]}>
                            <ShimmerPlaceholder style={{ flex: 1 }} LinearGradient={LinearGradient} />
                        </View>
                        <View style={[styles.boxRow, { marginTop: 10 }]}>
                            <ShimmerPlaceholder style={{ flex: 1 }} LinearGradient={LinearGradient} />
                        </View>
                        <View style={[styles.boxRow, { marginTop: 10 }]}>
                            <ShimmerPlaceholder style={{ flex: 1 }} LinearGradient={LinearGradient} />
                        </View>
                        <View style={[styles.boxRow, { marginTop: 10 }]}>
                            <ShimmerPlaceholder style={{ flex: 1 }} LinearGradient={LinearGradient} />
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {
                    unidade ?
                        <Carousel
                            layout={'stack'}
                            layoutCardOffset={18}
                            ref={carouselRef}
                            sliderWidth={windowWidth}
                            sliderHeight={windowHeight}
                            itemWidth={windowWidth - 20}
                            data={unidade}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            hasParallaxImages={true}
                            //autoplay={true}
                            enableMomentum={false}
                            onSnapToItem={(index) => setActiveSlide(index)}
                        />
                        :
                        renderItemEmpty()
                }
            </View>
        </SafeAreaView>
    );
};

export default MyCarousel;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        alignItems: 'center'
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
    },
    image: {
        resizeMode: 'stretch',
        transform: [{ scale: 0.55 }],
        ...StyleSheet.absoluteFillObject,
    },
    card: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginVertical: 10,
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
    cardShimmer: {
        flex: 1,
        width: Dimensions.get('screen').width / 100 * 95,
        backgroundColor: '#fff',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10,
        marginVertical: 10,
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
    cardBox1: {
        flex: 1.5,
    },
    cardBox2: {
        flex: 2,
        padding: 10,
        justifyContent: 'center'
    },
    cardLabel: {
        fontSize: RFValue(16, 680),
        color: '#08948A'
    },
    label: {
        fontSize: RFValue(14, 680),
        color: '#08948A',
        paddingVertical: 2
    },
    text: {
        color: '#7A8888',
        fontSize: RFValue(12, 680),
    },
    item1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item2: {
        marginVertical: 5
    },
    boxRow: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});