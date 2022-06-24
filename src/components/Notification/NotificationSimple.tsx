import React, { useState, useEffect, useImperativeHandle, useCallback, memo } from 'react';
import { StyleSheet, Text, View, Modal } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import BtnOptions from '../buttons/BtnOptions';

interface Props {
    title?: string;
    message?: string;
    activeModal?: boolean;
    onpress?(): void;
}

export interface ModalHandles {
    openModal(): void;
    closeModal(): void;
}

const NotificationSimple = React.forwardRef<ModalHandles, Props>(
    (
        {
            title = 'Mensagem:',
            message = 'teste',
            activeModal = false,
            onpress,
        }: Props,
        ref,
    ) => {
        const styles = useThemeAwareObject(createStyles);

        const [active, setActive] = useState(activeModal);

        const disabled = () => {
            setActive(false);
            if (onpress) {
                onpress();
            }
        };

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
            setActive(activeModal);
        }, [activeModal]);
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={active}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.box}>
                                <Text style={styles.textLabel}>{title}</Text>
                            </View>
                            <View style={styles.box}>
                                <Text style={styles.text}>{message}</Text>
                            </View>
                            <BtnOptions
                                valueText={'OK'}
                                onPress={() => disabled()}
                            />
                        </View>
                    </View>
                </Modal>
            </View>
        );
    },
);

NotificationSimple.displayName = 'NotificationSimple';

export default memo(NotificationSimple);

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.colors.BACKDROP,
        },
        modalView: {
            opacity: 20,
            backgroundColor: theme.colors.BACKGROUND_1,
            borderRadius: 20,
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: theme.colors.BACKDROP,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            width: '60%',
        },
        box: {
            marginVertical: 10,
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
        },
        boxBtn: {
            marginVertical: 10,
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
        text: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            textAlign: 'center',
        },
        textLabel: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            textAlign: 'center',
        },
    });
    return styles;
};
