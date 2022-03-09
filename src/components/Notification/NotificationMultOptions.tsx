import React, {
    useCallback,
    useState,
    useImperativeHandle,
    useRef,
    memo,
} from 'react';
import { StyleSheet, Text, View, Modal, Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import BtnOptions from '../../components/buttons/BtnOptions';
import { ThemeContextData } from '../../contexts/themeContext';
import useTheme from '../../hooks/useTheme';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

interface Notification {
    message: string;
    status?: 'sucess' | 'error' | 'warning' | 'info';
    onpress(): void;
}

export interface ModalHandles {
    closeNotification(): void;
    openNotification(): void;
}

const NotificationMultOptions = React.forwardRef<ModalHandles, Notification>(
    ({ message, onpress }: Notification, ref) => {
        const [active, setActive] = useState(false);
        const _view = useRef<any>(null);

        const theme = useTheme();
        const styles = useThemeAwareObject(createStyles);

        const closeNotification = useCallback(() => {
            setActive(false);
        }, []);

        const openNotification = useCallback(() => {
            setActive(true);
        }, []);

        useImperativeHandle(ref, () => {
            return {
                closeNotification,
                openNotification,
            };
        });

        return (
            <View>
                <Modal animationType="fade" transparent={true} visible={active}>
                    <View
                        ref={_view}
                        style={styles.centeredView}
                        onStartShouldSetResponder={(evt) => {
                            evt.persist();
                            if (
                                evt.nativeEvent.target ===
                                _view.current?._nativeTag
                            ) {
                                closeNotification();
                            }
                            return true;
                        }}>
                        <View style={styles.modalView}>
                            <View style={styles.box}>
                                <Text style={styles.Titulo}>Mensagem:</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.textMsn}>{message}</Text>
                            </View>
                            <View style={styles.boxBtn}>
                                <BtnOptions
                                    onPress={() => onpress()}
                                    valueText={'Ok'}
                                />
                                <BtnOptions
                                    onPress={() => closeNotification()}
                                    valueText={'Cancelar'}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    },
);

export default memo(NotificationMultOptions);

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            paddingHorizontal: RFPercentage(3),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            backgroundColor: theme.colors.BACKGROUND_1,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 10,
            marginHorizontal: 20,
        },
        box: {
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        boxBtn:{

        },
        textMsn: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            textAlign: 'justify',
            margin: 5,
        },
        Titulo: {
            fontSize: theme.typography.SIZE.fontysize18,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
    });

    return styles;
};
