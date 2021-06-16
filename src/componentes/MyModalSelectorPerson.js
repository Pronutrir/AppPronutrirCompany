import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MyModalSelector({ options, initialLabel, action, disabled, editable, idIntervalo }) {

    const refSelector = useRef(null);
    const [value, setValue] = useState(initialLabel);

    const setItem = () => {
        var index = options.findIndex(item => item.id === idIntervalo);
        setValue(options[index].name)
        action({...options[index], flag: true});
    }

    useEffect(() => {
        setValue(initialLabel);
        
    }, [initialLabel])

    useEffect(() => {
        editable && setItem();
    }, [])

    return (
        <View style={{}}>
            {/* // Default mode */}
            <ModalSelector
                ref={refSelector}
                style={styles.container}
                childrenContainerStyle={styles.childrenContainer}
                optionContainerStyle={{ backgroundColor: '#fff', marginVertical: 20}}
                selectStyle={{ backgroundColor: '#fff', }}
                touchableStyle={styles.touchableStyle}
                optionStyle={styles.option}
                optionTextStyle={{ color: '#08948A', fontSize: RFValue(16, 680), textAlign: 'justify' }}
                selectTextStyle={{ color: '#08948A' }}
                selectedItemTextStyle={{ color: '#08948A' }}
                sectionTextStyle={{ color: 'green' }}
                data={options}
                keyExtractor={(item, index) => item.id}
                labelExtractor={(item, index) => `${item.name}`}
                //componentExtractor={(item, index) => item.Componente}
                initValue={value}
                initValueTextStyle={{ color: '#7C9292', fontSize: RFValue(14, 680) }}
                disabled={disabled}
                cancelText={'Fechar'}
                cancelStyle={{ backgroundColor: '#fff' }}
                cancelTextStyle={{ color: '#08948A', fontSize: RFValue(18, 680) }}
                onChange={option => { action(option) }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('screen').width / 100 * 100,
        height: Dimensions.get('screen').width / 100 * 9,
        alignItems: 'center'
    },
    childrenContainer: {
        width: Dimensions.get('screen').width / 100 * 90,
        height: Dimensions.get('screen').width / 100 * 9,
        backgroundColor: '#fff',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 5
                },
                shadowOpacity: 0.2,
                shadowRadius: 6,
            },
            android:{
                elevation: 3,
            }
        }),
        borderRadius: 10
    },
    touchableStyle: {
        flex: 1,
        backgroundColor: '#fff',
    },
    option: {
        borderBottomWidth: 0,
        marginTop: 1
    },
    btnConvenio:{
        width: Dimensions.get('screen').width / 3, 
        textAlign: 'center', 
        borderWidth: 1, 
        padding: 3, 
        color: '#fff', 
        borderColor: '#65E15C', 
        backgroundColor: '#73E26B', 
        borderRadius: 5,
        fontSize: RFValue(14, 680)
    },
    btnIndisposivel:{
        width: Dimensions.get('screen').width / 3,
        textAlign: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
        padding: 3, 
        color: '#fff', 
        borderColor: '#B7C1C1', 
        backgroundColor: '#B7C1C1', 
        borderRadius: 5,
        fontSize: RFValue(14, 680)
    }
})
