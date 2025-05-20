import React from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import moment from 'moment';
import HistorySvg from '../../../assets/svg/historico.svg';
import { ThemeContextData } from '../../../contexts/themeContext';
import { IAgendaPaciente } from '../../../hooks/useAgendaConsultas';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import CheckSinaisVitaisComponent from '../components/checkSinaisVitaisComponent/checkSinaisVitaisComponent';
import PressableRipple from '../../../components/ripple/PressableRipple';
import CheckPVSinaisVitaisComponent from '../components/checkPVSinaisVitaisComponent/checkPVSinaisVitaisComponent';

interface ItemAtendimentoSinaisVitaisProps {
    item: IAgendaPaciente;
    index: number;
    onPress: () => void;
    onLongPress?: () => void;
}

const ItemAtendimentoSinaisVitais: React.FC<ItemAtendimentoSinaisVitaisProps> = ({
    item,
    index,
    onPress,
    onLongPress
}) => {
    const styles = useThemeAwareObject(createStyles);
    const { width: SCREEN_WIDTH } = Dimensions.get('window');

    // Função adaptativa para determinar o número de linhas baseado no tamanho da tela
    const getNumberOfLines = (size: number) => {
        if (SCREEN_WIDTH < 320) return size + 1;
        return size;
    };

    // Função para determinar o tamanho do ícone baseado no tamanho da tela
    const getIconSize = () => {
        if (SCREEN_WIDTH < 320) return RFPercentage(3);
        if (SCREEN_WIDTH < 360) return RFPercentage(3.5);
        if (SCREEN_WIDTH < 400) return RFPercentage(4);
        return RFPercentage(4.5);
    };

    const iconSize = getIconSize();

    const renderInfoItem = (label: string, value: string | undefined) => (
        <View style={styles.infoRow}>
            <Text style={styles.labelText}>{label}: </Text>
            <Text
                style={styles.valueText}
                numberOfLines={getNumberOfLines(4)}
                ellipsizeMode="head"
            >
                {value || '-'}
            </Text>
        </View>
    );

    return (
        <PressableRipple
            key={index.toString()}
            onLongPress={onLongPress}
            onPress={onPress}
            style={styles.container}
        >
            <View style={styles.cardContent}>
                <View style={[ styles.iconContainer, { position: 'absolute', bottom: 0, left: 10 } ]}>
                    <CheckPVSinaisVitaisComponent Item={item.counT_SVMP} />
                </View>
                <View style={styles.iconContainer}>
                    <HistorySvg
                        width={iconSize}
                        height={iconSize}
                    />
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.labelText}>
                            Paciente:
                        </Text>
                        <Text
                            style={styles.pacienteNome}
                            numberOfLines={getNumberOfLines(2)}
                            ellipsizeMode="tail"
                        >
                            {item?.nM_PESSOA_FISICA?.toUpperCase() || '-'}
                        </Text>
                    </View>

                    <View style={styles.detailsContainer}>
                        {renderInfoItem('Data Nascimento', moment(item?.dT_NASCIMENTO).format('DD/MM/YYYY'))}

                        <View style={styles.checkContainer}>
                            <CheckSinaisVitaisComponent Item={item.cD_PESSOA_FISICA} />
                        </View>
                    </View>
                </View>
            </View>
        </PressableRipple>
    );
};

export default ItemAtendimentoSinaisVitais;

const createStyles = (theme: ThemeContextData) => {
    // Cálculos responsivos baseados no tamanho da tela
    const { width, height } = Dimensions.get('window');

    // Categorias de tamanho de tela
    const isVerySmallDevice = width < 320;
    const isSmallDevice = width < 360;
    const isMediumDevice = width < 400;
    const isLargeDevice = width >= 400;

    // Cálculo para garantir que o card não fique maior que a tela
    // Deixamos uma margem de segurança nas laterais
    const horizontalMargin = isVerySmallDevice ? 8 : 12;
    const safeWidth = width - (horizontalMargin * 2);

    // Função para calcular valores responsivos
    const getResponsiveValue = (
        verySmall: number,
        small: number,
        medium: number,
        large: number
    ) => {
        if (isVerySmallDevice) return verySmall;
        if (isSmallDevice) return small;
        if (isMediumDevice) return medium;
        return large;
    };

    // Calculando padding baseado no tamanho da tela
    const paddingHorizontal = getResponsiveValue(8, 10, 14, 16);
    const paddingVertical = getResponsiveValue(8, 10, 12, 16);
    const marginValue = getResponsiveValue(4, 5, 6, 8);

    // Ajustando tamanhos das fontes
    const titleSize = isSmallDevice
        ? theme.typography.SIZE.fontysize14
        : theme.typography.SIZE.fontysize16;

    const labelSize = getResponsiveValue(
        theme.typography.SIZE.fontysize10,
        theme.typography.SIZE.fontysize12,
        theme.typography.SIZE.fontysize12,
        theme.typography.SIZE.fontysize14
    );

    const valueSize = getResponsiveValue(
        theme.typography.SIZE.fontysize10,
        theme.typography.SIZE.fontysize12,
        theme.typography.SIZE.fontysize12,
        theme.typography.SIZE.fontysize14
    );

    // Calculando tamanho do ícone
    const iconDimension = getResponsiveValue(
        RFPercentage(4),
        RFPercentage(4.5),
        RFPercentage(5),
        RFPercentage(5.5)
    );

    const borderRadius = getResponsiveValue(8, 10, 12, 12);

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
            borderRadius: borderRadius,
            shadowColor: theme.colors.DARKLIGHT,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            marginVertical: marginValue,
            marginHorizontal: horizontalMargin,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: theme.colors.GREENLIGHT,
            alignSelf: 'center',
            width: safeWidth, // Usando a largura calculada com margem de segurança
            maxWidth: '98%', // Garantia adicional que não excederá a largura da tela
        },
        cardContent: {
            flexDirection: 'row',
            padding: paddingVertical,
            paddingHorizontal: paddingHorizontal,
        },
        iconContainer: {
            marginRight: marginValue * 2,
            justifyContent: 'center',
            alignItems: 'center',
            width: iconDimension,
            height: iconDimension,
            //borderRadius: iconDimension / 2,
            //backgroundColor: theme.colors.BACKGROUND_2,
            //borderWidth: isVerySmallDevice ? 0.5 : 1,
            //borderColor: theme.colors.GREENLIGHT,
        },
        infoContainer: {
            flex: 1,
            flexShrink: 1,
            justifyContent: 'center',
            overflow: 'hidden', // Impede que o conteúdo extravase o container
        },
        headerContainer: {
            marginBottom: marginValue,
            borderBottomWidth: isVerySmallDevice ? 0.5 : 1,
            borderBottomColor: theme.colors.GREENLIGHT,
            paddingBottom: marginValue,
        },
        atendimentoTitle: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: titleSize,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
        },
        atendimentoValue: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: titleSize,
            color: theme.colors.BROWNDARK,
        },
        pacienteNome: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: titleSize,
            color: theme.colors.BROWNDARK,
            flexShrink: 1,
            marginTop: 2,
        },
        detailsContainer: {
            flex: 1,
        },
        infoRow: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 2,
            marginBottom: marginValue / 2,
            flexWrap: 'wrap',
        },
        labelText: {
            fontFamily: theme.typography.FONTES.Bold,
            fontSize: labelSize,
            color: theme.colors.TEXT_PRIMARY,
            marginRight: 2,
        },
        valueText: {
            fontFamily: theme.typography.FONTES.Regular,
            fontSize: valueSize,
            color: theme.colors.TEXT_SECONDARY,
            flexShrink: 1,
            flex: 1,
            flexWrap: 'wrap', // Garante que o texto quebre adequadamente
        },
        checkContainer: {
            flex: 1,
            marginTop: marginValue,
            paddingTop: marginValue,
            borderTopWidth: isVerySmallDevice ? 0.5 : 0.5,
            borderTopColor: theme.colors.GREENLIGHT,
        }
    });
};
