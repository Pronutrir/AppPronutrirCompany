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
} from 'react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
    activeModal?: boolean;
    children: React.ReactNode;
    style?: ViewStyle;
    animationType?: 'none' | 'slide' | 'fade';
}
export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

const ModalBottom = React.forwardRef<ModalHandles, Props>(
    (
        { animationType = 'none', children, style, activeModal = false }: Props,
        ref,
    ) => {

        const styles = useThemeAwareObject(createStyles);

        const _view = useRef<any>(null);
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
                            style={[styles.modalView, style && { ...style }]}>
                            {children}
                        </SafeAreaView>
                        <SafeAreaView>
                            <TouchableOpacity
                                onPress={() => closeModal()}
                                style={[styles.modalView, styles.btnCloser]}>
                                <Text style={styles.cancelTextStyle}>
                                    Fechar
                                </Text>
                            </TouchableOpacity>
                        </SafeAreaView>
                    </Animated.View>
                </Modal>
            </View>
        );
    },
);

ModalBottom.displayName = "ModalBottom";

export default ModalBottom;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingTop: RFPercentage(10),
        },
        modalView: {
            flexBasis: 'auto',
            flexShrink: 1,
            flexGrow: 0,
            backgroundColor: theme.colors.BACKGROUND_2,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            justifyContent: 'flex-end',
            width: '100%',
        },
        btnCloser: {
            marginTop: RFPercentage(1.5),
            paddingVertical: 10,
        },
        cancelTextStyle: {
            color: '#08948A',
            fontSize: RFValue(18, 680),
            textAlign: 'center',
            fontWeight: 'bold',
        },
    });
    return styles;
};
