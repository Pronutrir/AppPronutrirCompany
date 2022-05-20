import { StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { ThemeContextData } from '../../../contexts/themeContext';

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
            paddingVertical: RFPercentage(1),
            paddingHorizontal: RFPercentage(2),
        },
        box: {
            flex: 1,
        },
        item1: {
            flex: 1,
            alignItems: 'flex-start',
        },
        item2: {
            flex: 1
        },
        item3: {

        },
        textInputStyle: {
            fontSize: RFValue(20, 680)
        },
        clearIconImageStyle: {
            width: RFValue(20, 680),
            height: RFValue(20, 680)
        },
        searchIconImageStyle: {
            width: RFValue(20, 680),
            height: RFValue(20, 680)
        },
        item: {
            flex: 1,
            marginBottom: 10,
            paddingVertical: 10
        },
        descricao: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        label: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            flexWrap: 'wrap',
        },
        boxLabel: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
        },
        modalAlert: {
            alignSelf: 'flex-end',
        }
    });
    return styles;
}


export default createStyles;
