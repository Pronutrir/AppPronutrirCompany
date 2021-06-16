import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

export default function MyModalSelectorSimples({ options, textSelect, action, disabled, tipo, btn }) {

    const refSelector = useRef(null);
    const [value, setValue] = useState(textSelect);

    const selectItem = item => {
        if (item) {
            switch (tipo) {
                case "unidades": setValue(`${item.dS_MUNICIPIO} ▼`)
                    break;
                case "especialidade": setValue(`${item.dS_ESPECIALIDADE} ▼`)
                    break;
                case "medicos": setValue(`${item.nM_GUERRA.substring(0, 16)}... ▼ `)
                    break;
                case "convenios": setValue(`${item.dS_CONVENIO} ▼ `)
                    break;
                case "planos": setValue(`${item.dS_PLANO} ▼ `)
                    break;
                default:
                    break;
            }
            action(item);
        }
    }

    const ListaPersonalizada = () => {

        switch (tipo) {
            case "unidades":
                return options.map((item, index) => (
                    {
                        ...item,
                        value: index,
                        Componente:
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={{ color: '#08948A', textAlign: 'center', fontSize: RFValue(18, 680) }}>{`${item.dS_MUNICIPIO}`}</Text>
                                </View>
                            </View>
                    }));
                break;
            case "especialidade":
                return options.map((item, index) => (
                    {
                        ...item,
                        value: index,
                        Componente:
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={{ color: '#08948A', textAlign: 'center', fontSize: RFValue(18, 680) }}>{`${item.dS_ESPECIALIDADE}`}</Text>
                                </View>
                            </View>
                    }));
                break;
            case "convenios":
                return options.map((item, index) => (
                    {
                        ...item,
                        value: index,
                        Componente:
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={{ color: '#08948A', textAlign: 'center', fontSize: RFValue(18, 680) }}>{`${item.dS_CONVENIO}`}</Text>
                                </View>
                            </View>
                    }));
                break;
            case "planos":
                return options.map((item, index) => (
                    {
                        ...item,
                        value: index,
                        Componente:
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={{ color: '#08948A', textAlign: 'center', fontSize: RFValue(18, 680) }}>{`${item.dS_PLANO}`}</Text>
                                </View>
                            </View>
                    }));
                break;
            case "medicos":
                return options.map((item, index) => (
                    {
                        ...item,
                        value: index,
                        Componente:
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, padding: 10 }}>
                                    <Text style={{ color: '#08948A', textAlign: 'center', fontSize: RFValue(18, 680) }}>{`${item.nM_GUERRA}`}</Text>
                                    <Text style={{ color: '#7C9292', textAlign: 'center', fontSize: RFValue(12, 680) }}>{`(${item.dS_ESPECIALIDADE})`}</Text>
                                </View>
                            </View>
                    }));
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setValue(textSelect);
    }, [options])

    return (
        <View>
            <ModalSelector
                ref={refSelector}
                style={btn ? stylesBtn.container : styles.container}
                childrenContainerStyle={disabled ? btn ? stylesBtn.childrenContainerEnable : styles.childrenContainerEnable : styles.childrenContainerDisable}
                optionContainerStyle={{ backgroundColor: '#fff', marginVertical: 20 }}
                selectStyle={btn ? stylesBtn.selectStyle : styles.selectStyle}
                touchableStyle={btn ? stylesBtn.touchableStyle : styles.touchableStyle}
                optionStyle={styles.option}
                optionTextStyle={{ color: '#7C9292' }}
                selectTextStyle={{ color: '#08948A' }}
                selectedItemTextStyle={{ color: 'red' }}
                sectionTextStyle={{ color: 'green' }}
                sectionStyle={{ backgroundColor: 'red' }}
                data={ListaPersonalizada()}
                keyExtractor={item => item.value}
                labelExtractor={(item, index) => `${item.nM_GUERRA} - ${item.dS_ESPECIALIDADE} ▼`}
                componentExtractor={(item, index) => item.Componente}
                initValue={value}
                initValueTextStyle={disabled ? { color: '#7C9292', fontSize: RFValue(14, 680) } : { color: '#7C9292', opacity: 0.5, fontSize: RFValue(14, 680) }}
                disabled={!disabled}
                cancelText={'Fechar'}
                cancelStyle={{ backgroundColor: '#fff' }}
                cancelTextStyle={{ color: '#08948A', fontSize: RFValue(18, 680) }}
                onChange={option => { selectItem(option) }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
    },
    childrenContainerEnable: {
        backgroundColor: '#fff',
        borderRadius: 0,
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 3
                },
                shadowOpacity: 0.4,
                shadowRadius: 4,
            },
            android:{
                elevation: 3,
            }
        }),
        borderWidth: 3,
        borderColor: 'transparent'
    },
    childrenContainerDisable: {
        opacity: 5
    },
    touchableStyle: {
        backgroundColor: '#fff',
        flex: 1
    },
    option: {
        borderBottomWidth: 0,
        marginTop: 1, 
    },
    selectStyle: {
        backgroundColor: '#fff',
        borderWidth: 0
    }
})

const stylesBtn = StyleSheet.create({
    container: {
        flex: 2,
        margin: (Dimensions.get('window').height / 200)
    },
    childrenContainerEnable: {
        backgroundColor: '#fff',
        ...Platform.select({
            ios:{
                shadowOffset:{
                    width: 0,
                    height: 2
                },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android:{
                elevation: 3,
            }
        }),
    },
    childrenContainerDisable: {
        opacity: 5
    },
    touchableStyle: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    option: {
        borderBottomWidth: 0,
        marginTop: 1
    },
    selectStyle: {
        flex: 2,
        borderWidth: 0,
        justifyContent: 'center'
    }
})
