import React, { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    Text,
    UIManager,
    TouchableOpacity,
} from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import * as Animatable from 'react-native-animatable';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

import styles from './style';

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Busca({ navigation }) {
    const listaFuncionalidade = [
        {
            id: '1',
            name: 'Perfil',
            rota: 'Perfil',
            descricao: 'Acesse seus dados cadastrais.',
        },
        {
            id: '2',
            name: 'Inicial',
            rota: 'DashBoard',
            descricao: 'Pagina inicial.',
        },
        {
            id: '3',
            name: 'Recuperar Senha',
            rota: 'RecuperarSenha',
            descricao: 'Recuperar Senha.',
        },
        {
            id: '4',
            name: 'Alterar numero celular',
            rota: 'AtualizarCelular',
            descricao: 'Atualizar Celular',
        },
        {
            id: '5',
            name: 'Alterar E-mail',
            rota: 'AtualizarEmail',
            descricao: 'Alterar endereço de E-mail',
        },
        {
            id: '6',
            name: 'Alterar Senha',
            rota: 'AlterarSenha',
            descricao: 'Alterar Senha',
        },
        {
            id: '7',
            name: 'Credenciais',
            rota: 'Credenciais',
            descricao: 'Suas credenciais de acesso',
        },
        {
            id: '8',
            name: 'Dados de Contato',
            rota: 'DadosContato',
            descricao: 'E-mail e telefone de contato',
        },
        {
            id: '9',
            name: 'Informações Pessoais',
            rota: 'InformacoesPessoais',
            descricao: 'Nome completo e data de nascimento.',
        },
    ];

    const [state, setState] = useState({
        query: '',
        isLoading: true,
        refreshing: false,
        dataBackup: [],
        dataSource: [],
        spinnerVisibility: false,
    });

    const filterList = (text) => {
        var newData = listaFuncionalidade;
        newData = listaFuncionalidade.filter((item) => {
            const itemData = item.name.toLowerCase();
            const textData = text.toLowerCase();
            return itemData.indexOf(textData) > -1;
        });
        setState((prevState) => {
            return { ...prevState, query: text, dataSource: newData };
        });
    };

    const renderItem = (item) => {
        return (
            <Animatable.View
                animation="bounceInLeft"
                easing="ease-in-out"
                iterationCount={1}>
                <TouchableOpacity
                    style={styles.cardStyle}
                    onPress={() => navigation.navigate(item.rota)}>
                    <Text style={styles.label}>{item.name}</Text>
                    <Text style={styles.textDescription}>{item.descricao}</Text>
                </TouchableOpacity>
            </Animatable.View>
        );
    };

    useEffect(() => {
        setState((prevState) => {
            return { ...prevState, dataSource: listaFuncionalidade };
        });
    }, []);

    return (
        <View style={styles.safeAreaViewStyle}>
            <View style={styles.SearchBarBoxStyle}>
                <SearchBar
                    darkMode
                    placeholder="Pesquisar no app"
                    spinnerVisibility={state.spinnerVisibility}
                    style={styles.SearchBarStyle}
                    textInputStyle={styles.textInputStyle}
                    spinnerSize={RFValue(20, 680)}
                    clearIconImageStyle={styles.clearIconImageStyle}
                    searchIconImageStyle={styles.searchIconImageStyle}
                    onChangeText={(text) => {
                        if (text.length === 0)
                            setState((prevState) => {
                                return {
                                    ...prevState,
                                    spinnerVisibility: false,
                                };
                            });
                        else
                            setState((prevState) => {
                                return {
                                    ...prevState,
                                    spinnerVisibility: true,
                                };
                            });
                        filterList(text);
                    }}
                    onClearPress={() => {
                        filterList('');
                        setState((prevState) => {
                            return { ...prevState, spinnerVisibility: false };
                        });
                    }}
                />
                <View style={styles.flatListStyle}>
                    <FlatList
                        data={state.dataSource}
                        renderItem={({ item }) => renderItem(item)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    );
}
