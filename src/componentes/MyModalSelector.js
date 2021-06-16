import React, { useRef, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MyModalSelector({ options, textSelect, action, disabled }) {

    const refSelector = useRef(null);
    const [value, setValue] = useState(textSelect);

    const selectItem = item => {
        if (item) {
            setValue(`${item.nM_GUERRA} - ${item.dS_ESPECIALIDADE} ▼`)
            action(item);
        }
    }

    const ListaPersonalizada = () => {
        return options.map((item, index) => (
            {
                ...item,
                value: index,
                Componente:
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ justifyContent: 'center' }}>
                            {
                                item.selectedConvenioAtende ?
                                <Text style={styles.btnConvenio}>Conveniado</Text>
                                :
                                item.selectedConvenioAtende == undefined ?
                                <Text style={styles.btnConvenio}>Conveniado</Text>
                                :
                                <Text style={styles.btnIndisposivel}>Não Conveniado</Text>
                            }
                        </View>
                        <View style={{ flex: 1, padding: 10 }}>
                            <Text style={{ color: '#08948A', textAlign: 'center', fontSize: RFValue(14, 680) }}>{`${item.nM_GUERRA}`}</Text>
                            <Text style={{ color: '#7C9292', textAlign: 'center', fontSize: RFValue(12, 680) }}>{`(${item.dS_ESPECIALIDADE})`}</Text>
                        </View>
                    </View>
            }));
    }

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
                //overlayStyle={{backgroundColor:'red'}}
                optionStyle={styles.option}
                optionTextStyle={{ color: '#7C9292' }}
                selectTextStyle={{ color: '#08948A' }}
                selectedItemTextStyle={{ color: 'red' }}
                sectionTextStyle={{ color: 'green' }}
                //sectionStyle={{ backgroundColor: 'red' }}
                data={ListaPersonalizada()}
                keyExtractor={item => item.value}
                labelExtractor={(item, index) => `${item.nM_GUERRA} - ${item.dS_ESPECIALIDADE} ▼`}
                componentExtractor={(item, index) => item.Componente}
                initValue={value}
                initValueTextStyle={{ color: '#7C9292', fontSize: RFValue(14, 680) }}
                disabled={disabled}
                cancelText={'Fechar'}
                cancelStyle={{ backgroundColor: '#fff' }}
                cancelTextStyle={{ color: '#08948A', fontSize: RFValue(18, 680) }}
                onChange={option => { selectItem(option) }}
                //onModalClose={(options) => selectItem(options)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    childrenContainer: {
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
        backgroundColor: '#fff',
        flex: 1
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
