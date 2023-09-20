import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import ShimerPlaceHolderSelected from '../shimmerPlaceHolder/shimerPlaceHolderSelected';

const _data: Array<{ label: string; value: string }> = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];
interface Props<T> {
  placeholder?: string;
  data?: T[];
  value?: any | null; // eslint-disable-line
  onChange?(item: T): void;
  shimerPlaceHolder?: boolean;
  disable?: boolean;
  DropDownStyle?: StyleProp<ViewStyle>;
  ContainerStyle?: StyleProp<ViewStyle>;
  maxHeight?: number;
  error?: boolean;
}

const SelectedDropdown = <T extends { label: string }>({
  data,
  onChange,
  value = null,
  placeholder,
  shimerPlaceHolder = false,
  disable = false,
  DropDownStyle,
  maxHeight = RFPercentage(45),
  ContainerStyle,
  error = false,
}: Props<T>) => {
  const styles = useThemeAwareObject(createStyles);
  const [_value, setValue] = useState(value);

  const renderItem = (item: T) => {
    // eslint-disable-line
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  if (shimerPlaceHolder) {
    return <ShimerPlaceHolderSelected />;
  } else {
    return (
      <Dropdown
        disable={disable}
        search={data && data.length > 20 ? true : false}
        style={[
          disable ? { ...styles.dropdownDisable } : { ...styles.dropdown },
          DropDownStyle,
        ]}
        placeholderStyle={[styles.placeholderStyle, error && { color: 'red' }]}
        selectedTextStyle={styles.placeholderStyle}
        inputSearchStyle={styles.inputSearchStyle}
        containerStyle={ContainerStyle}
        iconStyle={styles.iconStyle}
        data={data ?? _data}
        maxHeight={maxHeight}
        labelField="label"
        valueField="index"
        placeholder={placeholder ? placeholder : 'Selecione'}
        value={value ? value : _value}
        onChange={item => {
          if (onChange) {
            onChange(item);
          } else {
            setValue(item);
          }
        }}
        /*  renderLeftIcon={() => (
                    <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
                )} */
        renderItem={renderItem}
      />
    );
  }
};

export default SelectedDropdown;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    dropdown: {
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
