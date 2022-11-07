import React, {
    useState,
    useRef,
    useCallback,
    useImperativeHandle,
    useContext,
} from 'react';
import { View, StyleSheet, Modal } from 'react-native';
import moment from 'moment';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import Animated, {
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';
import BtnOptions from '../buttons/BtnOptions';
import NotificationGlobalContext from '../../contexts/notificationGlobalContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { TextInputMask } from 'react-native-masked-text';
import CalendarPerson, { Type, DateOptions } from '../calendar/calendarPerson';
import { useKeyboardHeight } from '../../hooks/useKeyboardHeight';
import useTheme from '../../hooks/useTheme';

interface Props {
    activeModal?: any;
    setActiveModal?: any;
    onPress?(initialDate: string, EndDate: string): void;
    clear?(): void;
    animationType?: 'none' | 'slide' | 'fade';
}

export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

const ModalFiltroData = React.forwardRef<ModalHandles, Props>(
    (
        {
            animationType = 'none',
            activeModal = false,
            onPress = () => '',
            clear = () => '',
        }: Props,
        ref,
    ) => {
        const _theme = useTheme();
        const keyboardHeight = useKeyboardHeight();

        const styles = useThemeAwareObject(createStyles);
        const { addAlert } = useContext(NotificationGlobalContext);

        const [active, setActive] = useState(activeModal);
        const [theme, setTheme] = useState<ThemeOpacity>('light');

        const [initialvalue, setInitialvalue] = useState<string>();
        const [endvalue, setEndvalue] = useState<string>();
        const _view = useRef<any>(null);

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

        const SelectedDay = (day: DateOptions) => {
            if (day.tipo === 'valueInitial') {
                setInitialvalue(moment(day.date).format('YYYY-MM-DD'));
            }
            if (day.tipo === 'valueEnd') {
                setEndvalue(moment(day.date).format('YYYY-MM-DD'));
            }
        };

        const validacao = () => {
            if (initialvalue && endvalue) {
                if (moment(initialvalue).isBefore(endvalue)) {
                    onPress(initialvalue, endvalue);
                } else {
                    addAlert({
                        message:
                            'A Data final tem que ser maior que a data inicial!',
                        status: 'info',
                    });
                }
            } else {
                addAlert({
                    message:
                        'A Data final tem que ser maior que a data inicial!',
                    status: 'info',
                });
            }
        };

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

        const [dateInitial, setDateInitial] = useState(
            moment().format('DD-MM-YYYY'),
        );
        const [dateEnd, setDateEnd] = useState(moment().format('DD-MM-YYYY'));
        const [dateType, setDateType] = useState<Type>();

        return (
            <View>
                <Modal
                    animationType={animationType}
                    transparent={true}
                    statusBarTranslucent={true}
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
                        <View
                            style={[
                                styles.modalView,
                                /* { bottom: keyboardHeight }, */
                            ]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.box}>
                                    <TextInputMask
                                        style={styles.inputDate}
                                        type="datetime"
                                        placeholder="Data inicial"
                                        onFocus={() =>
                                            setDateType('valueInitial')
                                        }
                                        /* onChangeText={(text) =>
                                            setDateInitial(text)
                                        } */
                                        value={dateInitial}
                                        keyboardType="numeric"
                                        showSoftInputOnFocus={false}
                                    />
                                    <TextInputMask
                                        style={styles.inputDate}
                                        type="datetime"
                                        placeholder="Data final"
                                        onFocus={() => setDateType('valueEnd')}
                                        /* onChangeText={(text) =>
                                            setDateEnd(text)
                                        } */
                                        value={dateEnd}
                                        keyboardType="ascii-capable"
                                        showSoftInputOnFocus={false}
                                    />
                                </View>
                            </View>
                            <CalendarPerson
                                type={dateType}
                                selectedDay={(item) => {
                                    switch (item.tipo) {
                                        case 'valueInitial':
                                            setDateInitial(item.date);
                                            break;
                                        case 'valueEnd':
                                            setDateEnd(item.date);
                                            break;
                                        default:
                                            break;
                                    }
                                }}
                            />
                            <View style={styles.boxBtn}>
                                <BtnOptions
                                    valueText="Ok"
                                    disable={Boolean(initialvalue && endvalue)}
                                    onPress={() => validacao()}
                                />
                                <BtnOptions
                                    valueText="Cancel"
                                    onPress={() => closeModal()}
                                />
                            </View>
                        </View>
                    </Animated.View>
                </Modal>
            </View>
        );
    },
);

ModalFiltroData.displayName = 'ModalFiltroData';

export default ModalFiltroData;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
            zIndex: 1,
        },
        modalView: {
            position: 'absolute',
            opacity: 20,
            backgroundColor: theme.colors.BACKGROUND_1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
            width: '100%',
            //height: '80%',
        },
        box: {
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 5,
            justifyContent: 'space-around',
            flexDirection: 'row',
        },
        text: {
            color: theme.colors.TEXT_SECONDARY,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        btnData: {
            backgroundColor: theme.colors.BACKGROUND_2,
            justifyContent: 'center',
            marginVertical: 10,
            height: 40,
            paddingLeft: 10,
        },
        btn: {
            width: 200,
            height: 40,
            borderRadius: 10,
            backgroundColor: theme.colors.BUTTON_PRIMARY,
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputDate: {
            flex: 2,
            marginHorizontal: 10,
            borderWidth: 2,
            padding: 5,
            borderRadius: 10,
            borderColor: theme.colors.BACKGROUND_2,
            color: theme.colors.TEXT_SECONDARY,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            fontSize: theme.typography.SIZE.fontysize18,
            textAlign: 'center',
        },
        boxBtn: {
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        viewLabel: {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        btnClear: {
            width: RFPercentage(4),
            height: RFPercentage(3),
            borderRadius: 10,
        },
        calendario: {
            width: '100%',
            borderRadius: 10,
        },
    });
    return styles;
};
