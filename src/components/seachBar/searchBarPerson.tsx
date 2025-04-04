import React from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import { ThemeContextData } from '../../contexts/themeContext';
import {
  Dimensions,
  KeyboardTypeOptions,
  StyleSheet,
  View,
} from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

/**
 * @param item
 */
interface Props {
  onChangeText: (text: string) => void;
  onClean: () => void;
  btnOptions?: boolean;
  placeholder?: string;
  spinnerVisibility?: boolean;
  value: string | undefined;
  keyboardType?: KeyboardTypeOptions;
}

const SearchBarPerson = ({
  onChangeText,
  onClean,
  placeholder = 'Digite o texto',
  spinnerVisibility = false,
  keyboardType = 'default',
  value = '',
}: Props) => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.container}>
      <SearchBar
        darkMode={true}
        placeholder={placeholder}
        spinnerVisibility={spinnerVisibility}
        style={styles.SearchBarStyle}
        textInputStyle={styles.textInputStyle}
        spinnerSize={RFValue(20, 680)}
        clearIconImageStyle={styles.clearIconImageStyle}
        searchIconImageStyle={styles.searchIconImageStyle}
        onChangeText={text => onChangeText(text)}
        onClearPress={() => onClean()}
        selectionColor="#fff"
        keyboardType={keyboardType}
        value={value}
        /* keyboardType={
                        filterSelected.filter === 'DATA DE NASCIMENTO'
                            ? 'number-pad'
                            : 'default'
                    } */
        returnKeyType={'next'}
      />
    </View>
  );
};

export default SearchBarPerson;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      paddingVertical: RFPercentage(2),
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    SearchBarStyle: {
      height: Dimensions.get('screen').height / 16,
      backgroundColor: theme.colors.BUTTON_TERTIARY,
    },
    textInputStyle: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_TERTIARY,
      fontSize: theme.typography.SIZE.fontysize14,
    },
    clearIconImageStyle: {
      width: RFPercentage(2),
      height: RFPercentage(2),
    },
    searchIconImageStyle: {
      width: RFPercentage(2),
      height: RFPercentage(2),
    },
    loading: {
      width: '100%',
      height: '100%',
      backgroundColor: '#fff',
    },
  });
  return styles;
};
