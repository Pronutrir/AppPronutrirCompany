import { StyleSheet, Dimensions, Platform } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: Dimensions.get('screen').width,
            paddingHorizontal: RFPercentage(2),
            paddingVertical: RFPercentage(1),
            alignItems: 'center',
        },
        SearchBarStyle: {
            width: '95%',
            height: Dimensions.get('screen').height / 16,
            backgroundColor: theme.colors.GREENPRIMARY,
        },
        textInputStyle: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize18,
        },
        clearIconImageStyle: {
            width: RFPercentage(2),
            height: RFPercentage(2),
        },
        searchIconImageStyle: {
            width: RFPercentage(2),
            height: RFPercentage(2),
        },
        containerAutoComplete: {
            flex: 1,
            flexDirection: 'row',
            alignSelf: 'center',
            backgroundColor: '#fff',
            borderRadius: 2,
            position: 'absolute',
            width: '88%',
            padding: 10,
            zIndex: 1,
            marginTop: Dimensions.get('screen').height / 15,
            maxHeight: 400,
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
        loading: {
            width: '100%',
            height: '100%',
            backgroundColor: '#fff',
        },
        item: {
            flex: 1,
            marginBottom: 10,
            paddingVertical: 10,
        },
        descricao: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        selectTextStyle: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_TERTIARY,
            fontSize: theme.typography.SIZE.fontysize18,
            textAlign: 'center',
        },
    });
    return styles;
};

export default createStyles;
