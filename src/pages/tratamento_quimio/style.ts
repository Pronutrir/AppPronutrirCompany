import { StyleSheet, Dimensions } from 'react-native';
import { ThemeContextData } from '../../contexts/themeContext';
const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: Dimensions.get('screen').width,
      paddingVertical: 10,
      alignItems: 'center',
      backgroundColor: theme.colors.BACKGROUND_2,
    },
  });
  return styles;
};

export default createStyles;
