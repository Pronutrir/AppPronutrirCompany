import React, {
    useRef,
    useState,
    useCallback,
    useImperativeHandle,
} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Modal,
    ViewStyle,
    TouchableOpacity,
    Text,
    TextStyle,
    Dimensions,
    Platform,
} from 'react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import Credencial from '../../assets/svg/carteira-de-identidade.svg';
import OkImg from '../../assets/svg/ok.svg';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
    activeModal: boolean;
    setActiveModal(parm: boolean): void;
    message: string;
    ContainerStyle?: ViewStyle;
    TextStyle?: TextStyle;
    animationType: 'none' | 'slide' | 'fade';
}

export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

const ModalBottomInfor = React.forwardRef<ModalHandles, Props>(
    (
        {
            activeModal,
            ContainerStyle,
            animationType = 'none',
            message = 'Adicione seu texto',
            TextStyle,
        }: Props,
        ref,
    ) => {
        const styles = useThemeAwareObject(createStyles);
        const _view = useRef<any>(null);
        const [active, setActive] = useState(activeModal);
        const [theme, setTheme] = useState<ThemeOpacity>('light');

        const size = Dimensions.get('screen').width / 10;

        const closeModal = useCallback(() => {
            setTheme('light');
            setActive(false);
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
                        <SafeAreaView
                            style={[
                                styles.modalView,
                                ContainerStyle && { ...ContainerStyle },
                            ]}>
                            <View style={styles.box}>
                                <Credencial
                                    fill={'#08948A'}
                                    width={size}
                                    height={size}
                                />
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.text}>{message}</Text>
                            </View>
                            <View style={styles.boxBtn}>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => closeModal()}>
                                    <OkImg
                                        fill={'#08948A'}
                                        width={20}
                                        height={20}
                                    />
                                    <Text
                                        style={[
                                            styles.text,
                                            TextStyle && { ...TextStyle },
                                        ]}>
                                        OK
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </Animated.View>
                </Modal>
            </View>
        );
    },
);

ModalBottomInfor.displayName = 'ModalBottomInfor';

export default ModalBottomInfor;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            backgroundColor: theme.colors.BACKGROUND_1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        },
        box: {
            marginVertical: 10,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        btn: {
            width: 100,
            height: 60,
            backgroundColor: theme.colors.BACKGROUND_1,
            opacity: 0.9,
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
            alignItems: 'center',
            borderRadius: 10,
            justifyContent: 'center',
            flexDirection: 'row',
        },
        boxBtn: {
            marginVertical: 20,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        text: {
            color: '#7C9292',
            fontSize: RFValue(16, 680),
            textAlign: 'justify',
            margin: 5,
        },
        Titulo: {
            color: '#08948A',
            fontWeight: 'bold',
            fontSize: RFValue(18, 680),
        },
        textOk: {
            color: '#08948A',
            fontWeight: 'bold',
            paddingHorizontal: 10,
        },
        box1: {
            flexDirection: 'row',
            marginVertical: 20,
            alignSelf: 'flex-start',
        },
        labelDescription: {
            fontSize: RFValue(16, 680),
            color: '#08948A',
        },
        description: {
            fontSize: RFValue(16, 680),
            color: '#08948A',
        },
    });
    return styles;
}

