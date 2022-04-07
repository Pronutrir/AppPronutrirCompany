import { Dimensions, StyleSheet } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container:{
            flex: 1,
            backgroundColor: theme.colors.BACKGROUND_1,
            justifyContent: 'center',
        },
        box1:{
            flex: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        box2:{
            width: (Dimensions.get('screen').width),
            height: (Dimensions.get('screen').height / 15) 
        },
        textLabel:{
            fontSize: theme.typography.SIZE.fontysize22,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            textAlign: 'center'
        },
        textInfo:{
            fontSize: theme.typography.SIZE.fontysize12,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            textAlign: 'center'
        },
        input:{
            width: '80%',
            borderBottomColor: '#DBCCCC',
            borderBottomWidth:2,
            margin: 10,
            textAlign: 'center',
            fontSize: theme.typography.SIZE.fontysize18,
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
        },
        BackgroundImage:{
            flex: 1,
            resizeMode: 'cover'
        }
    })
    return styles;
};



export default createStyles;
