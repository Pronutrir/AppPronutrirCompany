import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MyBackButton from '../../components/buttons/BackButton';
import SinaisVitaisSvg from '../../assets/svg/sinaisVitais.svg';
import ConsultasMarcadasImg from '../../assets/svg/ConsultasMarcadas.svg';
import CruzVermelha from '../../assets/svg/cruzVermelha.svg';
import PilulaCompromido from '../../assets/svg/pilula-e-comprimido.svg';
import Lembrete from '../../assets/svg/lembrete.svg';
import Avatar from '../../assets/svg/avatar.svg';
import Hospital from '../../assets/svg/hospital.svg';
import Equipe from '../../assets/svg/trabalho-em-equipe.svg';
import LupaImg from '../../assets/svg/Lupa.svg';
import LembreteImg from '../../assets/svg/lembrete.svg';
import HospitalLocationSvg from '../../assets/svg/hospitalLocation.svg';
import FotoClick from '../../assets/svg/foto.svg';
import PilulaComprimidoImg from '../../assets/svg/pilula-e-comprimido.svg';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import useTheme from '../../hooks/useTheme';

interface Props {
    title?: string | null;
    onPress(): void;
}

const HeaderDashBoard: React.FC<Props> = ({ onPress, title }: Props) => {
    const theme = useTheme();
    const styles = useThemeAwareObject(createStyles);
    const size = RFPercentage(5);

    const SetIcone = () => {
        switch (title) {
            case 'updateSinais':
                return (
                    <SinaisVitaisSvg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Convênios':
                return (
                    <CruzVermelha
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Minhas Consultas':
                return (
                    <ConsultasMarcadasImg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'MedicamentosRotina':
                return (
                    <PilulaCompromido
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Medicamentos':
                return (
                    <PilulaComprimidoImg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Medicamentos ativos':
                return (
                    <PilulaComprimidoImg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Adicionar Medicamentos':
                return (
                    <PilulaComprimidoImg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Editar medicamento':
                return (
                    <PilulaComprimidoImg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'LembretesNotificacoes':
                return (
                    <Lembrete
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Perfil':
                return (
                    <Avatar
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Nossas Unidades':
                return (
                    <Hospital
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Equipe Médica':
                return (
                    <Equipe
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Busca':
                return (
                    <LupaImg
                        fill={theme.colors.FILL_ICONE}
                        width={size - 10}
                        height={size - 10}
                        style={styles.img}
                    />
                );
            case 'Lembrete e Notificações':
                return (
                    <LembreteImg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Unidades de Atendimento':
                return (
                    <HospitalLocationSvg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Informacoes Pessoais':
                return (
                    <Avatar
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Dados de Contato':
                return (
                    <Avatar
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Credenciais':
                return (
                    <Avatar
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Alterar senha':
                return (
                    <Avatar
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Atualizar Email':
                return (
                    <Avatar
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Atualizar Celular':
                return (
                    <Avatar
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            case 'Foto perfil':
                return (
                    <FotoClick
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
            default:
                return (
                    <SinaisVitaisSvg
                        fill={theme.colors.FILL_ICONE}
                        width={size}
                        height={size}
                        style={styles.img}
                    />
                );
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <MyBackButton onPress={onPress} />
                <Text style={styles.title}>{title && title}</Text>
                <SetIcone />
            </View>
        </View>
    );
};

export default HeaderDashBoard;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            height: (Dimensions.get('window').height / 100) * 8,
            backgroundColor: theme.colors.BACKGROUND_2,
        },
        box: {
            flex: 2,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.colors.BACKGROUND_1,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
        },
        title: {
            fontSize: theme.typography.SIZE.fontysize18,
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
        img: {
            margin: RFPercentage(1),
        },
    });

    return styles;
};
