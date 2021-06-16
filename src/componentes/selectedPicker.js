import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Picker } from '@react-native-picker/picker';

export default function selectedPicker({ options, textSelecione, selection, tipo, selectedEnable, selected }) {

    const [selectSpecialidade, setSelectSpecialidade] = useState(selected && selected);

    const select = item => {
        if (item !== selectSpecialidade) {
            setSelectSpecialidade(item);
            selection(item);
        }
    }

    return (
        <View style={styles.container}>
            <Picker
                enabled={(options ? options.length > 0 ? true : false : false) && selectedEnable}
                selectedValue={selectedEnable ? selectSpecialidade: ""}
                style={(options ? options.length > 0 ? true : false : false) ? styles.Picker : styles.PickerDisabled}
                onValueChange={itemValue => { select(itemValue) }}
            >
                <Picker.Item label={textSelecione ? textSelecione : "Selecione"} value="" />

                {options && options.map((item, index) => {
                    switch (tipo) {
                        case 'esp':
                            return <Picker.Item key={index} label={item.dS_ESPECIALIDADE} value={item} />
                            break;
                        case 'md':
                            return <Picker.Item key={index} label={`${item.nM_GUERRA} - ${item.dS_ESPECIALIDADE}`} value={item} />
                            break;
                        case 'unid':
                            return <Picker.Item key={index} label={`${item.dS_MUNICIPIO}`} value={item} />
                            break;
                        case 'conve':
                            return <Picker.Item key={index} label={`${item.dS_CONVENIO}`} value={item} />
                            break;
                        case 'pl':
                            return <Picker.Item key={index} label={`${item.dS_PLANO}`} value={item} />
                            break;
                        default:
                            return <Picker.Item key={index} label={item} value={item} />
                            break;
                    }
                })}
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        elevation: 3,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    Picker: {
        height: 50,
        width: 270,
        color: '#7C9292',
        textAlign: 'center',
    },
    PickerDisabled: {
        height: 50,
        width: 270,
        color: '#c5c1c1',
        textAlign: 'center'
    }
})
