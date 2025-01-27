import React, {
    useState,
    useCallback,
    useImperativeHandle,
    useEffect,
    useContext,
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Platform,
    ViewStyle,
    ListRenderItem,
} from 'react-native';
import Cancel from '../../assets/svg/cancel.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import moment from 'moment';
import { IInstagram } from '../carrosel/Carousel_Instagram';
import Carousel, {
    ParallaxImage,
    AdditionalParallaxProps,
} from 'react-native-snap-carousel';
import Api from '../../services/api';
import NotificationGlobalContext from '../../contexts/notificationGlobalContext';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const width = Dimensions.get('window').width;
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

const { width: screenWidth } = Dimensions.get('screen');

const ModalInstagram = React.forwardRef<ModalHandles, Props>(
    ({ animationType = 'none', activeModal = false, postagem }: Props, ref) => {
        const theme = useTheme();
        const styles = useThemeAwareObject(createStyles);
        const [active, setActive] = useState(activeModal);

        const { addNotification } = useContext(NotificationGlobalContext);
        const [imagensInsta, setImagensInsta] = useState<IInstagram[]>([]);
        const insets = useSafeAreaInsets();

        const closeModal = useCallback(() => {
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

        const getPostagemInsta = useCallback(() => {
            if (postagem.children?.data) {
                Api.post('v1/Social/GetChildresInst', postagem.children.data)
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
            } else {
                setImagensInsta([postagem]);
            }
        }, [setImagensInsta, addNotification, postagem]);

        useEffect(() => {
            getPostagemInsta();
        }, [postagem, getPostagemInsta]);

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
                    visible={active}>
                    <View
                        style={[
                            styles.centeredView,
                            {
                                marginTop: insets.top,
                                marginBottom: insets.bottom,
                            },
                        ]}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.box1}>
                                    <View style={styles.boxBtn}>
                                        <TouchableOpacity
                                            style={{ ...styles.openButton }}
                                            onPress={() => closeModal()}>
                                            <Cancel
                                                fill={theme.colors.BROWNPRIMARY}
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
                                                (Dimensions.get('window')
                                                    .width /
                                                    100) *
                                                95
                                            }
                                            data={imagensInsta}
                                            renderItem={renderItem}
                                            keyExtractor={(item, index) =>
                                                index.toString()
                                            }
                                            hasParallaxImages={true}
                                            autoplay={true}
                                            enableMomentum={false}
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
                        </View>
                    </View>
                </Modal>
            </View>
        );
    },
);

ModalInstagram.displayName = 'ModalInstagram';

export default ModalInstagram;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        modalView: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
            paddingBottom: 0,
            shadowColor: theme.colors.BROWNDARK,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
        },
        box1: {
            flex: width > 500 ? 1.5 : 1,
        },
        box2: {
            flex: 1,
            margin: 10,
        },
        modalText: {
            textAlign: 'left',
            fontSize: theme.typography.SIZE.fontysize12,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            margin: 0.1,
            padding: 5,
        },
        modalTextTitulo: {
            fontSize: theme.typography.SIZE.fontysize18,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
        boxBtn: {
            backgroundColor: 'transparent',
            position: 'absolute',
            right: RFPercentage(1),
            zIndex: 1,
            alignSelf: 'flex-end',
        },
        openButton: {
            backgroundColor: theme.colors.BACKGROUND_1,
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
            fontSize: theme.typography.SIZE.fontysize10,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
        item: {
            alignItems: 'center',
        },
        imageContainer: {
            width: '100%',
            height: '100%',
            marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        image: {
            resizeMode: 'stretch',
            transform: [{ scale: 0.55 }],
            ...StyleSheet.absoluteFillObject,
        },
    });
    return styles;
};
