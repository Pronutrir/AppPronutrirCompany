import { StyleSheet, Dimensions } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ThemeContextData } from '../../contexts/themeContext';

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_2,
        },
        box1: {
            backgroundColor: theme.colors.BACKGROUND_1,
            width: Dimensions.get('screen').width,
            height: RFPercentage(8),
            flexDirection: 'row',
        },
        box2: {
            flex: 1,
        },
        btn: {
            flex: 1,
            backgroundColor: theme.colors.BUTTON_SECUNDARY,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomWidth: 5,
            borderColor: theme.colors.BUTTON_SECUNDARY,
            margin: RFPercentage(1),
            borderRadius: 5,
            paddingHorizontal: 5
        },
        btnSelected: {
            borderColor: theme.colors.GREENDARK,
        },
        textBtn: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize16,
            fontWeight: 'bold',
            padding: RFPercentage(1),
            paddingHorizontal: RFPercentage(2)
        },
        ContainerModal: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        box: {
            width: '100%',
            marginVertical: 10,
            marginHorizontal: 20,
            alignItems: 'center',
        },
        viewEmpty: {
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: RFValue(22, 680),
        },
        textEmpty: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            marginHorizontal: 10,
        },
        indicator: {
            position:"absolute",
            width:20,
            height: 5,
            backgroundColor:"red"
        },
        indicatorWrapper: {
            flexDirection: 'row',
            flex: 0.1,
            backgroundColor: 'green',
        }
    });
    return styles;
}

export default createStyles;
