import React, {
    useRef,
    useState,
    useCallback,
    useImperativeHandle,
    useEffect,
    useContext
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    Image,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Platform,
    ViewStyle,
    useWindowDimensions,
    ListRenderItem,
} from 'react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';
import Cancel from '../../assets/svg/cancel.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { IInstagram } from '../carrosel/Carousel_Instagram';
import Carousel, {
    ParallaxImage,
    AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import Api from '../../services/api';
import NotificationGlobalContext from '../../contexts/notificationGlobalContext';

const width = Dimensions.get('screen').width;

interface Props {
    postagem: IInstagram;
    activeModal?: boolean;
    style?: ViewStyle;
    animationType?: 'none' | 'slide' | 'fade';
}

export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

const { width: screenWidth } = Dimensions.get('screen');

const ModalInstagram = React.forwardRef<ModalHandles, Props>(
    ({ animationType = 'none', activeModal = false, postagem }: Props, ref) => {
        const _view = useRef<any>(null);
        const [active, setActive] = useState(activeModal);
        const [theme, setTheme] = useState<ThemeOpacity>('light');

        const { addNotification } = useContext(NotificationGlobalContext);
        const [imagensInsta, setImagensInsta] = useState<IInstagram[]>([]);

        const windowWidth = useWindowDimensions().width;
        const windowHeight = useWindowDimensions().height;

        const closeModal = useCallback(() => {
            setTheme('light');
            setActive(false);
            setImagensInsta([]);
        }, []);

        const openModal = useCallback(() => {
            setActive(true);
        }, []);

        useImperativeHandle(ref, () => {
            return {
                openModal,
                closeModal,
            };
        });

        const progress = useDerivedValue(() => {
            return theme === 'dark' ? withTiming(0, { duration: 500 }) : 1;
        }, [theme]);

        const animatedStyles = useAnimatedStyle(() => {
            const backgroundColor = interpolateColor(
                progress.value,
                [0, 1],
                ['rgba(0,0,0,.8)', 'rgba(0,0,0,.0)'],
            );
            return {
                backgroundColor,
            };
        });

        const getPostagemInsta = () => {
            if(postagem.children?.data){
                Api.post('Social/GetChildresInst', postagem.children.data)
                .then((response) => {
                    const { data } = response;
                    if (data) {
                        setImagensInsta(data);
                    }
                })
                .catch(() => {
                    addNotification({
                        message:
                            'Não foi possivel acessar os posts do instram tente mais tarde!',
                        status: 'error',
                    });
                });
            }else{
                setImagensInsta([postagem]);
            }
        };
    
        useEffect(() => {
            getPostagemInsta();
        }, [postagem]);

        const renderItem: ListRenderItem<IInstagram> = (
            { item },
            parallaxProps?: AdditionalParallaxProps,
        ) => {
            return (
                <View style={styles.item}>
                    <ParallaxImage
                        source={{
                            uri: item.media_url,
                        }}
                        containerStyle={styles.imageContainer}
                        showSpinner={true}
                        style={styles.image}
                        parallaxFactor={0}
                        {...parallaxProps}
                    />
                </View>
            );
        };

        return (
            <View>
                <Modal
                    animationType={animationType}
                    transparent={true}
                    visible={active}
                    onShow={() => setTheme('dark')}>
                    <Animated.View
                        style={[styles.centeredView, animatedStyles]}
                        ref={_view}
                        onStartShouldSetResponder={(evt) => {
                            evt.persist();
                            if (
                                evt.nativeEvent.target ===
                                _view.current?._nativeTag
                            ) {
                                closeModal();
                            }
                            return true;
                        }}>
                        <SafeAreaView style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.box1}>
                                    <View style={styles.boxBtn}>
                                        <TouchableOpacity
                                            style={{ ...styles.openButton }}
                                            onPress={() => closeModal()}>
                                            <Cancel
                                                fill={'#748080'}
                                                width={15}
                                                height={15}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.imgView}>
                                        <Carousel
                                            layout={'default'}
                                            sliderWidth={screenWidth}
                                            sliderHeight={screenWidth}
                                            itemWidth={
                                                windowWidth
                                            }
                                            data={imagensInsta}
                                            renderItem={renderItem}
                                            keyExtractor={(item, index) =>
                                                index.toString()
                                            }
                                            hasParallaxImages={true}
                                            autoplay={true}
                                            enableMomentum={false}
                                            lockScrollWhileSnapping={true}
                                            loop={true}
                                        />
                                    </View>
                                </View>
                                <ScrollView style={styles.box2}>
                                    <Text
                                        style={[
                                            styles.modalText,
                                            styles.modalTextTitulo,
                                        ]}>
                                        {postagem?.username}
                                    </Text>
                                    {
                                        <Text style={styles.modalText}>
                                            {postagem?.caption}
                                        </Text>
                                    }

                                    <Text style={styles.modalText}>
                                        #pronutrironcologia
                                    </Text>

                                    <Text style={styles.textPublicacao}>
                                        Publicado{' '}
                                        {moment(postagem?.timestamp).format(
                                            'DD-MM-YYYY - HH:mm',
                                        )}
                                    </Text>
                                </ScrollView>
                            </View>
                        </SafeAreaView>
                    </Animated.View>
                </Modal>
            </View>
        );
    },
);

export default ModalInstagram;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    modalView: {
        flex: 1,
        backgroundColor: '#fff',
        paddingBottom: 0,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
    },
    box1: {
        flex: width > 500 ? 1.8 : 1,
    },
    box2: {
        flex: 1,
        margin: 10,
    },
    modalText: {
        textAlign: 'left',
        fontSize: RFValue(12, 680),
        margin: 0.1,
        padding: 5,
    },
    modalTextTitulo: {
        fontSize: RFValue(15, 680),
        fontWeight: 'bold',
    },
    modalTextItem: {
        fontSize: RFValue(15, 680),
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: RFValue(20, 680),
    },
    boxBtn: {
        backgroundColor: 'transparent',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'flex-end',
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android: {
                elevation: 3,
            },
        }),
    },
    openButton: {
        backgroundColor: '#fff',
        padding: 10,
        margin: 10,
        borderRadius: 30,
    },
    imgView: {
        flex: 1,
    },
    img: {
        flex: 1,
        resizeMode: 'stretch',
    },
    BoxMedico: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    textPublicacao: {
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
        fontSize: RFValue(10, 680),
    },
    item: {
        alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
    },
    image: {
        resizeMode: 'stretch',
        transform: [{ scale: 0.55 }],
        ...StyleSheet.absoluteFillObject,
    },
});
