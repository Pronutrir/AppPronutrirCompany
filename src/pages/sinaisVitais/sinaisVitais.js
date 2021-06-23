import React, { useState } from 'react';
import { View, SafeAreaView, FlatList, Pressable, Text, ScrollView } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import styles from './style';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import MyLoadingBall from '../../componentes/MyLoadingBall';
import SlideRanger from '../../components/Slider/SlideRanger';
import BtnCentered from '../../components/buttons/BtnCentered';
import IncrementDecrement from '../../components/IncrementDecrement';
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
    const [valueDose, setValueDose] = useState(1.00);
    const [valueRanger, setValueRanger] = useState(50.00);

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
        setState(prevState => { return { ...prevState, dataSource: [] } });
        try {
            const { data: { result } } = await Api.get(`SinaisVitaisMonitoracaoGeral/FiltrarDadosSVMGPacientePorAtendimentoPessoaFisica/${nome}`);
            console.log(result);
            setActiveBall(false);
        } catch (error) {
            console.log(error);
        }
    }

    const Onclean = () => {
        filterList("");
        setState(prevState => {
            return { ...prevState, spinnerVisibility: false }
        });
    }

    const inc_Dec = (tipo) => {
        tipo === 'soma' && setValueRanger(parseFloat(valueRanger) + 0.01);
        tipo === 'subtracao' && setValueRanger(parseFloat(valueRanger) - 0.01);
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
            <ScrollView style={styles.SearchBarBoxStyle}>
                <View style={styles.box1}>
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
                        onClearPress={() => Onclean()}
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
                </View>
                <View style={styles.box2}>
                    <View style={styles.item1}>
                        <SlideRanger
                            label={"Altura"}
                            medida={'cm'}
                            step={0.01}
                            valueMin={0}
                            valueMax={2.5}
                            valueRanger={valueRanger}
                            setValueRanger={setValueRanger}
                        />
                    </View>
                    <View style={styles.item2}>
                        <SlideRanger
                            label={"Peso"}
                            medida={'kg'}
                            step={0.1}
                            valueMin={0}
                            valueMax={200}
                            valueRanger={valueDose}
                            setValueRanger={setValueDose}
                        />
                    </View>
                    <View style={styles.item2}>
                        <SlideRanger
                            label={"Temperatura"}
                            medida={'kg'}
                            step={0.1}
                            valueMin={0}
                            valueMax={200}
                            valueRanger={valueDose}
                            setValueRanger={setValueDose}
                        />
                    </View>
                    <View style={styles.item2}>
                        <SlideRanger
                            label={"Peso"}
                            medida={'kg'}
                            step={0.1}
                            valueMin={0}
                            valueMax={200}
                            valueRanger={valueDose}
                            setValueRanger={setValueDose}
                        />
                    </View>
                </View>
                <View style={styles.box3}>
                    <BtnCentered labelBtn={"Adicionar"} />
                </View>
                {activeBall && <MyLoadingBall />}
            </ScrollView>
        </SafeAreaView>
    )
}

export default sinaisVitais
