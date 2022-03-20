
import React, {
    useRef,
    useState,
    useCallback,
    useImperativeHandle,
    useContext,
    memo,
    useEffect,
} from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Modal,
    Platform,
    ViewStyle,
    TouchableOpacity,
    Text,
    StyleProp,
    FlatList,
    ListRenderItem,
} from 'react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';
import AnimatedLottieView from 'lottie-react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import SinaisVitaisContext from '../../contexts/sinaisVitaisContext';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { IAlertaPaciente } from '../../reducers/ConsultasReducer';
import CardSimples from '../Cards/CardSimples';
interface Props {
    codPacient: string;
    activeModal?: boolean;
    styleModal?: StyleProp<ViewStyle>;
    styleContainerImg?: StyleProp<ViewStyle>;
    animationType?: 'none' | 'slide' | 'fade';
}

export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

const ModalAlertPaciente = React.forwardRef<ModalHandles, Props>(
    (
        {
            codPacient,
            animationType = 'none',
            styleContainerImg,
            styleModal,
            activeModal = false,
        }: Props,
        ref,
    ) => {
        const { useAlerts } = useContext(SinaisVitaisContext);
        const { data, isFetching } = useAlerts(codPacient);

        const styles = useThemeAwareObject(createStyles);
        const _view = useRef<any>(null);
        const animatedRef = useRef<any>(null);
        const [active, setActive] = useState(activeModal);
        const [theme, setTheme] = useState<ThemeOpacity>('light');

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

        const Status = ({ item }: { item: IAlertaPaciente }) => {
            switch (item.iE_CONFIRMACAO) {
                case 'C':
                    return (
                        <View style={styles.item}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.text}>Confirmada</Text>
                        </View>
                    );
                case 'S':
                    return (
                        <View style={styles.item}>
                            <Text style={styles.label}>Status:</Text>
                            <Text style={styles.text}>Suspeita</Text>
                        </View>
                    );
                default:
                    return null;
            }
        };

        const Observacao = ({ item }: { item: IAlertaPaciente }) => {
            if (item.dS_OBSERVACAO) {
                return (
                    <View style={styles.item}>
                        <Text style={styles.label}>Observação</Text>
                        <Text style={styles.text}>{item.dS_OBSERVACAO}</Text>
                    </View>
                );
            } else {
                return null;
            }
        };

        const TipoAlergia = ({ item }: { item: IAlertaPaciente }) => {
            if (item.dS_TIPO_ALERGIA) {
                return (
                    <View style={styles.item}>
                        <Text style={styles.label}>Tipo de Alergia</Text>
                        <Text style={styles.text}>{item.dS_TIPO_ALERGIA}</Text>
                    </View>
                );
            } else {
                return null;
            }
        };

        const DsSubstancia = ({ item }: { item: IAlertaPaciente }) => {
            if (item.dS_SUBSTANCIA) {
                return (
                    <View style={styles.item}>
                        <Text style={styles.label}>Tipo de Substância</Text>
                        <Text style={styles.text}>{item.dS_SUBSTANCIA}</Text>
                    </View>
                );
            } else {
                return null;
            }
        };

        const renderItem: ListRenderItem<IAlertaPaciente> = ({ item }) => (
            <CardSimples styleCardContainer={styles.card}>
                <TouchableOpacity>
                    <>
                        <Status item={item} />
                        <Observacao item={item} />
                        <TipoAlergia item={item} />
                        <DsSubstancia item={item} />
                    </>
                </TouchableOpacity>
            </CardSimples>
        );

        useEffect(() => {
            if(data != undefined && data?.length > 0 && !isFetching){
                animatedRef.current?.play();
            }
        }, [isFetching]);

        return (
            <>
                <TouchableOpacity
                    onPress={() => openModal()}
                    style={[styles.container, styleContainerImg]}
                    disabled={Boolean(data == undefined || data?.length <= 0)}>
                    <AnimatedLottieView
                        ref={animatedRef}
                        source={require('../../assets/Animacoes/alert-notification.json')}
                        loop={true}
                        style={styles.emoji}
                    />
                </TouchableOpacity>
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
                                style={[styles.modalView, styleModal]}>
                                <Text style={styles.Titulo}>
                                    (Alergias / Reações adversas)
                                </Text>
                                {data && (
                                    <FlatList
                                        data={data}
                                        renderItem={renderItem}
                                        contentContainerStyle={
                                            styles.contentContainerStyle
                                        }
                                    />
                                )}
                            </SafeAreaView>
                        </Animated.View>
                    </Modal>
                </View>
            </>
        );
    },
);

ModalAlertPaciente.displayName = 'ModalAlertPaciente';

export default memo(ModalAlertPaciente);

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            width: RFPercentage(4),
            height: RFPercentage(4),
            justifyContent: 'center',
            alignItems: 'center',
        },
        emoji: {
            width: RFPercentage(8),
            height: RFPercentage(8),
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            maxHeight: '80%',
            minHeight: '35%',
            backgroundColor: theme.colors.BACKGROUND_1,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.colors.BACKDROP,
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
        contentContainerStyle: {
            margin: RFPercentage(2),
        },
        Titulo: {
            padding: 10,
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        card: {
            padding: RFPercentage(2),
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        item: {
            flexDirection: 'column',
            marginVertical: RFPercentage(0.5),
        },
        label: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
    });
    return styles;
};
