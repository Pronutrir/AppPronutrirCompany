import React, { useState } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
//import AntDesign from 'react-native-vector-icons/AntDesign';

const _data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

export interface Idata {
    label: string;
    value: any;
}

interface Props {
    placeholder?: string;
    data?: Idata[];
    value?: any;
    onChange?(item: Idata): void;
}

const SelectedDropdown: React.FC<Props> = ({ data = _data, onChange, value, placeholder }:Props) => {
    
    const [_value, setValue] = useState(null);

    const renderItem = (item: any) => {
        return (
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.label}</Text>
                {/*  {item.value === value && (
              <AntDesign
                style={styles.icon}
                color="black"
                name="Safety"
                size={20}
              />
            )} */}
            </View>
        );
    };

    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder= {placeholder ? placeholder : "Selecione" }
            value={value ? value: _value}
            onChange={(item) => {
                if(onChange){
                    onChange(item);
                }else{
                    setValue(item.value);
                }
            }}
            /*  renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        )} */
            renderItem={renderItem}
        />
    );
};

export default SelectedDropdown;

const styles = StyleSheet.create({
    dropdown: {
        marginVertical: 20,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 12,
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
    icon: {
        marginRight: 5,
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: '#7A8B8E',
    },
    placeholderStyle: {
        fontSize: 16,
        color: '#7A8B8E',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: '#7A8B8E',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});
