import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MyModalSelector({ options, initialLabel, action, disabled }) {

    const refSelector = useRef(null);

    useEffect(() => {
        action(options[6]);
    }, [])

    return (
        <View style={{}}>
            {/* // Default mode */}
            <ModalSelector
                ref={refSelector}
                animationType={'fade'}
                style={styles.container}
                childrenContainerStyle={styles.childrenContainer}
                optionContainerStyle={styles.containerOptions}
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
                initValue={initialLabel}
                initValueTextStyle={{ color: '#7C9292', fontSize: RFValue(14, 680) }}
                disabled={disabled}
                cancelText={'Fechar'}
                cancelStyle={styles.containerFechar}
                cancelTextStyle={{ color: '#08948A', fontSize: RFValue(14, 680) }}
                onChange={option => { action(option) }}
                backdropPressToClose={true}
                cancelButtonAccessible={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').width / 100 * 10,
        alignItems: 'center'
    },
    childrenContainer: {
        width: Dimensions.get('screen').width / 100 * 50,
        height: Dimensions.get('screen').width / 100 * 10,
        backgroundColor: '#fff',
    },
    touchableStyle: {
        flex: 1,
        backgroundColor: '#fff',
    },
    containerOptions:{
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: 300,
        height: 300
    },
    containerFechar:{
        backgroundColor: '#fff',
        alignSelf: 'center',
        width: 300,
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
