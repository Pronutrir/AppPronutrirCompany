import { Dimensions, StyleSheet } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../../contexts/themeContext';

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND_1,
      paddingVertical: RFPercentage(0.5),
      paddingHorizontal: RFPercentage(1),
    },
    box1: {
      backgroundColor: theme.colors.BACKGROUND_1,
      width: Dimensions.get('screen').width,
      flexDirection: 'row',
      paddingRight: RFPercentage(1)
    },
    box2: {
      flex: 1,
    },
    MenuOptions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    person: {},
    box_sinais_vitais: {
      flex: 1,
    },
    item1: {
      alignItems: 'flex-start',
    },
    item2: {
      flex: 1,
    },
    btn: {
      flex: 1,
      width: RFPercentage(20),
      height: RFPercentage(6),
      backgroundColor: theme.colors.BUTTON_SECUNDARY,
      alignItems: 'center',
      justifyContent: 'center',
      borderBottomWidth: RFPercentage(1),
      borderColor: theme.colors.BUTTON_SECUNDARY,
      marginHorizontal: RFPercentage(0.5),
      marginVertical: RFPercentage(1),
      borderRadius: 5,
      paddingHorizontal: 3,
    },
    btnSelected: {
      borderColor: theme.colors.GREENDARK,
    },
    textBtn: {
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_TERTIARY,
      fontSize: theme.typography.SIZE.fontysize14,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    clearIconImageStyle: {
      width: RFValue(20, 680),
      height: RFValue(20, 680),
    },
    searchIconImageStyle: {
      width: RFValue(20, 680),
      height: RFValue(20, 680),
    },
    item: {
      flex: 1,
      marginBottom: 10,
      paddingVertical: 10,
    },
    descricao: {
      color: '#1E707D',
      fontSize: RFValue(16, 680),
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
    },
  });
  return styles;
};

export default createStyles;
