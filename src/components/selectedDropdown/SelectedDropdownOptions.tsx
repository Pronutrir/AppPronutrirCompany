import React from 'react';
import { StyleSheet, Platform, Dimensions } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { ThemeContextData } from '../../contexts/themeContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';

const { width } = Dimensions.get('window');

interface Props<T> {
  data: T[];
  onChange(item: T): void;
  selectedValue?: string;
  selectedIndex?: number;
  defaultButtonText?: string;
}

const SelectedDropdownOptions = <
  T extends { index: number; label: string; value: any },
>({
  data,
  onChange,
  selectedIndex,
  selectedValue,
  defaultButtonText = 'Selecione o dispositivo',
}: Props<T>): JSX.Element => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <SelectDropdown
      data={data}
      defaultValueByIndex={selectedIndex}
      defaultValue={selectedValue}
      onSelect={selectedItem => {
        onChange(selectedItem);
      }}
      defaultButtonText={defaultButtonText}
      buttonTextAfterSelection={selectedItem => {
        return selectedItem.label;
      }}
      rowTextForSelection={item => {
        return item.label;
      }}
      renderDropdownIcon={isOpened => {
        //return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
      }}
      dropdownIconPosition={'right'}
      buttonStyle={styles.buttonStyle}
      buttonTextStyle={styles.buttonTextStyle}
      dropdownStyle={styles.dropdownStyle}
      rowStyle={styles.rowStyle}
      rowTextStyle={styles.rowTextStyle}
    />
  );
};

export default SelectedDropdownOptions;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    buttonStyle: {
      width: '100%',
      backgroundColor: theme.colors.BACKGROUND_1,
      height: RFPercentage(6),
      margin: RFPercentage(2),
      alignSelf: 'center',
      borderRadius: 10,
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
    buttonTextStyle: {
      flex: 1,
      textAlign: 'center',
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize14,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
    },
    dropdownStyle: {
      marginTop: RFPercentage(-3),
      borderRadius: 5,
    },
    rowStyle: {
      backgroundColor: theme.colors.BACKGROUND_1,
    },
    rowTextStyle: {
      flex: 1,
      textAlign: 'center',
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize14,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
    },
    dropdownDisable: {
      width: '100%',
      backgroundColor: theme.colors.BACKGROUND_1,
      height: RFPercentage(6),
      margin: RFPercentage(2),
      alignSelf: 'center',
      borderRadius: 10,
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
      opacity: 0.5,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: RFPercentage(1),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    textItem: {
      flex: 1,
      textAlign: 'center',
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize14,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
    },
    placeholderStyle: {
      height: Platform.OS === 'android' ? RFPercentage(5) : RFPercentage(3),
      padding: RFPercentage(0.5),
      textAlign: 'center',
      textAlignVertical: 'center',
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize12,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.L,
    },
    iconStyle: {
      width: RFPercentage(4),
      height: RFPercentage(4),
    },
    inputSearchStyle: {
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize14,
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      height: RFPercentage(6),
    },
  });
  return styles;
};
