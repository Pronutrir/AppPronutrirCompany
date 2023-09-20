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
}

const SelectedDropdownOptions = <
  T extends { index: number; label: string; value: any },
>({
  data,
  onChange,
  selectedIndex,
  selectedValue,
}: Props<T>): JSX.Element => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <SelectDropdown
      data={data}
      defaultValueByIndex={selectedIndex}
      defaultValue={selectedValue}
      onSelect={(selectedItem, index) => {
        onChange(selectedItem);
        console.log(index);
      }}
      defaultButtonText={'Selecione o dispositivo'}
      buttonTextAfterSelection={(selectedItem, index) => {
        return selectedItem.label;
      }}
      rowTextForSelection={(item, index) => {
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

const styles1 = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    width,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
  viewContainer: { flex: 1, width, backgroundColor: '#FFF' },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#ff0000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'center' },
  dropdown1DropdownStyle: { backgroundColor: '#5c1f1f', marginTop: -30 },
  dropdown1RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: { backgroundColor: 'slategray' },
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown4DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown4RowStyle: {
    backgroundColor: '#EFEFEF',
    borderBottomColor: '#C5C5C5',
  },
  dropdown4RowTxtStyle: { color: '#444', textAlign: 'left' },
});
