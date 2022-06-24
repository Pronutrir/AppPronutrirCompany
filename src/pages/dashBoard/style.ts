import { StyleSheet, Dimensions } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_2,
        },
        box1: {
            width: Dimensions.get('screen').width,
            height: (Dimensions.get('screen').height / 100) * 35,
            alignItems: 'center',
            marginBottom: 10,
        },
        box2: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
        },
        selectedUnidade: {
            position: 'absolute',
            right: 0,
            paddingHorizontal: 5,
            width: RFPercentage(20),
            height: RFPercentage(6),
            zIndex: 1,
        },
        DropDownStyle:{ 
            height: RFPercentage(3.5), 
            backgroundColor: theme.colors.BACKGROUND_2 
        },
        ContainerStyle: {
            backgroundColor: theme.colors.BACKGROUND_2
        },
        imgPost: {
            width: '80%',
            height: '70%',
            borderRadius: 10,
        },
        boxPost: {
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.BROWNDARK,
            borderBottomEndRadius: 5,
            alignSelf: 'flex-start',
            margin: 15,
        },
        textPost: {
            fontSize: theme.typography.SIZE.fontysize16,
            fontFamily: theme.typography.FONTES.Bold,
            color: theme.colors.TEXT_SECONDARY,
            borderRadius: 5,
            padding: 2,
        },
        text: {
            flex: 1,
            fontSize: theme.typography.SIZE.fontysize14,
            fontFamily: theme.typography.FONTES.Bold,
            color: theme.colors.TEXT_SECONDARY,
        },
    });
    return styles;
};

export default createStyles;
