import { StyleSheet, Dimensions } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';
const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get('screen').width,
      paddingVertical: 10,
      backgroundColor: theme.colors.BACKGROUND_2,
    },
    menuPopUpStyleSearch: {
      position: 'absolute',
      alignSelf: 'auto',
      right: 0,
    },
  });
  return styles;
};

export default createStyles;
