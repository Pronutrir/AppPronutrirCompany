import React, {
    useRef,
    useState,
    useCallback,
    useImperativeHandle,
    useEffect,
    ReactNode,
} from 'react';
import { View, StyleSheet, Modal, Text } from 'react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import BtnOptions from '../buttons/BtnOptions';
interface Props {
    activeModal?: boolean;
    message: string;
    onpress(): void;
    onpressCancel?(): void;
    setActiveModal?(parms: boolean): void;
    animationType?: 'none' | 'slide' | 'fade';
    onStartShouldResponder?: boolean;
    children?: ReactNode;
    LottieAnimation?: React.ReactNode;
}
export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

const ModalCentralizedOptions = React.forwardRef<ModalHandles, Props>(
    (
        {
            animationType = 'none',
            activeModal = false,
            message = 'teste',
            onpress,
            onpressCancel,
            setActiveModal,
            onStartShouldResponder = true,
            children,
            LottieAnimation,
        }: Props,
        ref,
    ) => {
        const _view = useRef<any>(null);
        const [active, setActive] = useState(activeModal);
        const [theme, setTheme] = useState<ThemeOpacity>('light');

        const styles = useThemeAwareObject(createStyles);

        const closeModal = useCallback(() => {
            setTheme('light');
            setActive(false);
            if (setActiveModal) {
                setActiveModal(false);
            }
        }, []);

        const openModal = useCallback(() => {
            setActive(true);
        }, []);

        const Ok = () => {
            closeModal();
            onpress();
        };

        useImperativeHandle(ref, () => {
            return {
                openModal,
                closeModal,
            };
        });

        useEffect(() => {
            setActive(activeModal);
        }, [activeModal]);

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
                                onStartShouldResponder && closeModal();
                            }
                            return true;
                        }}>
                        <View style={styles.modalView}>
                            <View>
                                {LottieAnimation}
                            </View>
                            <View style={styles.menssage}>
                                <Text style={styles.textMenssage}>
                                    {message}
                                </Text>
                            </View>
                            {children}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-around',
                                    margin: 10,
                                }}>
                                <BtnOptions
                                    valueText={'Ok'}
                                    onPress={() => Ok()}
                                />
                                <BtnOptions
                                    valueText={'Cancelar'}
                                    onPress={() => {
                                        closeModal();
                                        onpressCancel && onpressCancel();
                                    }}
                                />
                            </View>
                        </View>
                    </Animated.View>
                </Modal>
            </View>
        );
    },
);

ModalCentralizedOptions.displayName = 'ModalCentralizedOptions';

export default ModalCentralizedOptions;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            marginHorizontal: RFPercentage(1),
            padding: 10,
            backgroundColor: theme.colors.BACKGROUND_1,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
        },
        menssage: {},
        textMenssage: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            padding: 20,
        },
    });
    return styles;
};
