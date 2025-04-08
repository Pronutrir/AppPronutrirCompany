import React, { useContext, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import HistorySvg from '../../../assets/svg/historico.svg';
import { ThemeContextData } from '../../../contexts/themeContext';
import { IAgendaPaciente } from '../../../hooks/useAgendaConsultas';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import CheckSinaisVitaisComponent from '../components/checkSinaisVitaisComponent/checkSinaisVitaisComponent';
import MenuPopUp, { ModalHandlesMenu } from '../../../components/menuPopUp/menuPopUp';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import { useGerarSenhaPainel } from '../../../hooks/usePainelSenha';
import AuthContext from '../../../contexts/auth';
import NotificationGlobalContext from '../../../contexts/notificationGlobalContext';
import PrintBluetoothContext from '../../../contexts/printBluetoothContext';

interface AtendimentoInfoCardProps {
    item: IAgendaPaciente;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const AtendimentoInfoCard: React.FC<AtendimentoInfoCardProps> = ({
    item
}) => {
    const styles = useThemeAwareObject(createStyles);

    const MenuPopUpRef = useRef<ModalHandlesMenu>(null);
    const loadingRef = useRef<LoadHandles>(null);

    const { stateAuth } = useContext(AuthContext);
    const { mutateAsync: mutateAsyncGerarSenha } = useGerarSenhaPainel();
    const { addNotification } = useContext(NotificationGlobalContext);
    const { printSenha } = useContext(PrintBluetoothContext);

    const handleGerarSenha = async (item: IAgendaPaciente, nR_SEQ_FILA_P: number) => {
        try {
            if (nR_SEQ_FILA_P != 0 && nR_SEQ_FILA_P != undefined) {
                loadingRef.current?.openModal();
                const result = await mutateAsyncGerarSenha({
                    cD_ESTABELECIMENTO_P: item.cD_ESTABELECIMENTO,
                    cD_PESSOA_FISICA_P: item.cD_PESSOA_FISICA,
                    iE_SENHA_PRIORITARIA_P: 'N',
                    nR_SEQ_FILA_P: nR_SEQ_FILA_P,
                    nM_USUARIO_P: stateAuth.usertasy.nM_USUARIO,
                });
                await printSenha(result, item.nM_PESSOA_FISICA);
                loadingRef.current?.closeModal();
            } else {
                addNotification({
                    message:
                        'Médico sem agenda vinculada a fila no painel de senhas!',
                    status: 'error',
                });
            }
        } catch (error) {
            loadingRef.current?.closeModal();
            addNotification({
                message:
                    'Erro ao gerar a senha!',
                status: 'error',
            });
        }
    };

    const handleGerarSenhaOptions = (item: IAgendaPaciente, option: string) => {
        switch (option) {
            case "Senha normal": handleGerarSenha(item, item.seQ_FILAS_SENHA[0]);
                break;
            case "Senha Prioridade": handleGerarSenha(item, item.seQ_FILAS_SENHA[1]);
                break;
        }
    }

    const renderInfoItem = (label: string, value: string | undefined) => (
        <View style={styles.infoRow}>
            <Text style={styles.labelText}>{label}: </Text>
            <Text style={styles.valueText} numberOfLines={2} ellipsizeMode="tail">
                {value || '-'}
            </Text>
        </View>
    );

    const iconSize = SCREEN_WIDTH < 360 ? RFPercentage(3.5) : RFPercentage(4);

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.7}
            onPress={() => MenuPopUpRef.current?.showMenu()}
            onLongPress={() => MenuPopUpRef.current?.showMenu()}
        >
            <View style={styles.cardContent}>
                <View
                    style={styles.iconContainer}
                >
                    <HistorySvg
                        width={iconSize}
                        height={iconSize}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.atendimentoTitle} numberOfLines={1}>
                            <Text style={styles.atendimentoValue}>{item?.origem}</Text>
                        </Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        {renderInfoItem('Médico', item?.nM_GUERRA_MEDICO)}
                        {renderInfoItem(
                            item.origem === "CONSULTA" ? "Especialidade" : "Protocolo",
                            item?.especialidadE_PROTOCOLO
                        )}
                        {renderInfoItem('Horário da Agenda', moment(item?.dT_AGENDA).format('HH:mm'))}

                        <View style={styles.checkContainer}>
                            <CheckSinaisVitaisComponent Item={item.cD_PESSOA_FISICA} />
                        </View>
                    </View>
                </View>
            </View>
            <MenuPopUp
                containerStyle={styles.menuPopUpStyle}
                ref={MenuPopUpRef}
                btnVisible={false}
                btnLabels={item.origem == "CONSULTA" ? ['Senha normal', 'Senha Prioridade'] : ['Senha normal']}
                onpress={(options) => handleGerarSenhaOptions(item, options)}
            />
            <Loading ref={loadingRef} />
        </TouchableOpacity>
    );
};

export default AtendimentoInfoCard;

const createStyles = (theme: ThemeContextData) => {
    // Cálculos responsivos baseados no tamanho da tela
    const { width } = Dimensions.get('window');
    const isSmallDevice = width < 360;
    const paddingHorizontal = isSmallDevice ? 10 : 16;
    const paddingVertical = isSmallDevice ? 12 : 16;

    // Calcula a largura segura do card com margens adaptativas
    const horizontalMargin = isSmallDevice ? 6 : 10;
    const safeWidth = width - (horizontalMargin * 2);

    return StyleSheet.create({
        container: {
            backgroundColor: theme.colors.BACKGROUND_1,
            borderRadius: 12,
            shadowColor: theme.colors.DARKLIGHT,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            marginVertical: RFValue(6),
            marginHorizontal: RFValue(6),
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: theme.colors.GREENLIGHT,
            alignSelf: 'center',
            width: safeWidth,
            maxWidth: '98%',
        },
        cardContent: {
            flexDirection: 'row',
            padding: paddingVertical,
            paddingHorizontal: paddingHorizontal,
        },
        iconContainer: {
            marginRight: RFValue(12),
            justifyContent: 'center',
            alignItems: 'center',
            width: isSmallDevice ? RFPercentage(5) : RFPercentage(5.5),
            height: isSmallDevice ? RFPercentage(5) : RFPercentage(5.5),
            borderRadius: isSmallDevice ? RFPercentage(2.5) : RFPercentage(2.75),
            backgroundColor: theme.colors.BACKGROUND_2,
            borderWidth: 1,
            borderColor: theme.colors.GREENLIGHT,
        },
        infoContainer: {
            flex: 1,
            flexShrink: 1,
            overflow: 'hidden',
        },
        headerContainer: {
            marginBottom: RFValue(6),
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.GREENLIGHT,
            paddingBottom: RFValue(6),
        },
        atendimentoTitle: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: isSmallDevice
                ? theme.typography.SIZE.fontysize14
                : theme.typography.SIZE.fontysize16,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        atendimentoValue: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: isSmallDevice
                ? theme.typography.SIZE.fontysize14
                : theme.typography.SIZE.fontysize16,
            color: theme.colors.BROWNDARK,
        },
        detailsContainer: {
            /* gap: RFValue(3), */
        },
        infoRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            paddingVertical: 2,
            marginBottom: RFValue(2),
        },
        labelText: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: isSmallDevice
                ? theme.typography.SIZE.fontysize12
                : theme.typography.SIZE.fontysize14,
            color: theme.colors.TEXT_PRIMARY,
        },
        valueText: {
            fontFamily: theme.typography.FONTES.Regular,
            fontSize: isSmallDevice
                ? theme.typography.SIZE.fontysize12
                : theme.typography.SIZE.fontysize14,
            color: theme.colors.TEXT_SECONDARY,
            flexShrink: 1,
            flexWrap: 'wrap',
        },
        checkContainer: {
            flex: 1,
            marginTop: RFValue(6),
            paddingTop: RFValue(4),
            borderTopWidth: 0.5,
            borderTopColor: theme.colors.GREENLIGHT,
        },
        menuPopUpStyle: {
            position: 'absolute',
            right: 0,
        },
    });
};