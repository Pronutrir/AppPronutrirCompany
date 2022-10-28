import React, {
    useRef,
    useState,
    useCallback,
    useImperativeHandle,
} from 'react';
import { View, StyleSheet, Modal, Platform, ViewStyle } from 'react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface Props {
    activeModal?: boolean;
    children: any;
    style?: ViewStyle;
    animationType?: 'none' | 'slide' | 'fade';
    disableTouchOff?: boolean;
}

export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

const ModalCentralize = React.forwardRef<ModalHandles, Props>(
    (
        {
            animationType = 'none',
            children,
            style,
            activeModal = false,
            disableTouchOff = false,
        }: Props,
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
                            if (!disableTouchOff) {
                                evt.persist();
                                if (
                                    evt.nativeEvent.target ===
                                    _view.current?._nativeTag
                                ) {
                                    closeModal();
                                }
                                return true;
                            } else {
                                return false;
                            }
                        }}>
                        <View style={[styles.modalView, style && { ...style }]}>
                            {children}
                        </View>
                    </Animated.View>
                </Modal>
            </View>
        );
    },
);

ModalCentralize.displayName = 'ModalCentralize';

export default ModalCentralize;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            backgroundColor: theme.colors.BACKGROUND_1,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
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
    });
    return styles;
};
