import React, { useState } from 'react';
import { View, SafeAreaView, FlatList, Pressable, Text } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import styles from './style';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MyLoadingBall from '../../componentes/MyLoadingBall';
import SlideRanger from '../../components/Slider/SlideRanger';
import Api from '../../services/api';

const sinaisVitais = () => {

    const [state, setState] = useState({
        query: "",
        isLoading: true,
        refreshing: false,
        dataBackup: [],
        dataSource: [],
        spinnerVisibility: false,
    });

    const [activeBall, setActiveBall] = useState(false);
    const [atendimentos, setAtendimentos] = useState();
    const [value, setValue] = useState(50);

    const Search = async (nome) => {
        setState(prevState => { return { ...prevState, spinnerVisibility: true } });
        try {
            const { data: { result } } = await Api.get(`PessoaFisica/filtroPessoas/${nome}`);
            setState(prevState => { return { ...prevState, spinnerVisibility: false, dataSource: result } });
        } catch (error) {
            console.log(error);
        }
    }

    const SearchAtendimentos = async (nome) => {
        setActiveBall(true);
        try {
            const { data: { result } } = await Api.get(`SinaisVitaisMonitoracaoGeral/FiltrarDadosSVMGPacientePorAtendimentoPessoaFisica/${nome}`);
            console.log(result);
            setActiveBall(false);
        } catch (error) {
            console.log(error);
        }
    }

    const filterList = (text) => {
        /*  var newData = listaFuncionalidade;
         newData = listaFuncionalidade.filter((item) => {
             const itemData = item.name.toLowerCase();
             const textData = text.toLowerCase();
             return itemData.indexOf(textData) > -1;
         }); */
        setState(prevState => {
            return { ...prevState, query: text/* , dataSource: newData */ }
        });
    };

    const Item = ({ title }) => {
        return (
            <Pressable key={title.cD_PESSOA_FISICA} style={styles.item} onPress={() => SearchAtendimentos(title.nM_PESSOA_FISICA)}>
                <Text style={styles.descricao}>{`${title.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
            </Pressable>
        )
    }

    const renderItem = ({ item }) => (
        <Item title={item} />
    );

    return (
        <SafeAreaView style={styles.safeAreaViewStyle}>
            <View style={styles.SearchBarBoxStyle}>
                <SearchBar
                    darkMode
                    placeholder="Pesquisar"
                    spinnerVisibility={state.spinnerVisibility}
                    style={styles.SearchBarStyle}
                    textInputStyle={styles.textInputStyle}
                    spinnerSize={RFValue(20, 680)}
                    clearIconImageStyle={styles.clearIconImageStyle}
                    searchIconImageStyle={styles.searchIconImageStyle}
                    onChangeText={(text) => text.length > 4 ? Search(text) : setState(prevState => { return { ...prevState, spinnerVisibility: false } })}
                    onClearPress={() => {
                        filterList("");
                        setState(prevState => {
                            return { ...prevState, spinnerVisibility: false }
                        });
                    }}
                />
                {
                    state.dataSource.length > 0 &&
                    <View style={styles.containerAutoComplete} >
                        <FlatList
                            data={state.dataSource}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                }
                {activeBall && <MyLoadingBall />}
                <SlideRanger/>
                <SlideRanger/>
            </View>
        </SafeAreaView>
    )
}

export default sinaisVitais
