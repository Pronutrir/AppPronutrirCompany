import React, {
    memo,
    useImperativeHandle,
    useCallback,
    useState,
    useEffect,
} from 'react';
import { View, StyleSheet, Modal, Dimensions, ModalProps } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
interface modalProps extends ModalProps {
    activeModal?: boolean;
}
export interface LoadHandles {
    openModal(): void;
    closeModal(): void;
}

const Loading = React.forwardRef<LoadHandles, modalProps>(
    ({ activeModal, ...rest }: modalProps, ref) => {
        const styles = useThemeAwareObject(createStyles);
        const [active, setActive] = useState(false);
        const size = Dimensions.get('screen').width / 8;

        const closeModal = useCallback(() => {
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

        useEffect(() => {
            if (activeModal !== undefined) {
                setActive(activeModal);
            }
        }, [activeModal]);

        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={active}
                    {...rest}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <AnimatedLottieView
                                source={require('../../assets/Animacoes/logoAnimated.json')}
                                autoPlay={true}
                                loop={true}
                                style={{ width: size, height: size }}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    },
);

Loading.displayName = "Loading";

export default memo(Loading);

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
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        modalImg: {
            width: Dimensions.get('screen').width / 10,
            height: Dimensions.get('screen').width / 10,
        },
    });
    return styles;
}

