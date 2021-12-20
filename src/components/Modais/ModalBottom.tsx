import React, {
    useRef,
    useState,
    useCallback,
    useImperativeHandle,
} from 'react';
import { View, StyleSheet, SafeAreaView, Modal, ViewStyle } from 'react-native';
import Animated, {
    withTiming,
    useAnimatedStyle,
    interpolateColor,
    useDerivedValue,
} from 'react-native-reanimated';
import { RFPercentage } from 'react-native-responsive-fontsize';
interface Props {
    activeModal?: boolean;
    children: any;
    style?: ViewStyle;
    animationType?: 'none' | 'slide' | 'fade';
}
export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

type ThemeOpacity = 'light' | 'dark';

export const ModalBottom = React.forwardRef<ModalHandles, Props>(
    (
        { animationType = 'none', children, style, activeModal = false }: Props,
        ref,
    ) => {
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
                    </Animated.View>
                </Modal>
            </View>
        );
    },
);

export default ModalBottom;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        //backgroundColor: 'rgba(0,0,0,.8)',
    },
    modalView: {
        flexBasis: 'auto',
        flexShrink: 1,
        flexGrow: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'flex-end',
        width: '100%',
        paddingBottom: RFPercentage(3),
    },
});
