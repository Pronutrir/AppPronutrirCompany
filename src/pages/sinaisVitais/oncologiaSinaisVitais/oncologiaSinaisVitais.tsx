import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import SinaisVitaisContext, {
    consultaQT,
} from '../../../contexts/sinaisVitaisContext';
import CardSinaisVitais from '../components/cardSinaisVitais';
import styles from './style';
interface Consulta {
    query: string;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: consultaQT[];
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
}

const OncologiaSinaisVitais = () => {
    const { consultasQT } = useContext(SinaisVitaisContext);
    const [state, setState] = useState<Consulta>({
        query: '',
        isLoading: true,
        refreshing: false,
        dataSource: consultasQT,
        spinnerVisibility: false,
        page: 1,
        loadingScrow: false,
        continue: true,
    });

    const Search = async (name: string) => {
        const SeachResult = consultasQT.filter((item) =>
            item.nM_PESSOA_FISICA
                .toLocaleLowerCase()
                .includes(name.toLocaleLowerCase()),
        );
        if (SeachResult.length > 0) {
            setState((old) => {
                return { ...old, query: name, dataSource: SeachResult };
            });
        } else {
            setState((old) => {
                return { ...old, query: name };
            });
        }
    };

    const Onclean = () => {
        //setSelected(undefined);
        //setAtendimento(null);
        setState((prevState) => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: consultasQT,
                query: '',
            };
        });
    };

    /* const renderFooter = () => {
        if (!state.loadingScrow) {
            return null;
        }
        return (
            <View style={styles.loading}>
                <ActivityIndicator size={'small'} color={'#08948A'} />
            </View>
        );
    }; */

    /*  const SearchAtendimentos = () => {
        console.log('SearchAtendimentos');
    }; */

    /*  const LoadingSearch = () => {
        console.log('LoadingSearch');
    }; */

    /* const renderItem: ListRenderItem<consultaQT> = ({ item }) => {
        return (
            <Pressable
                key={item.NM_PESSOA_FISICA}
                style={styles.item}
                onPress={() => SearchAtendimentos()}>
                <Text
                    style={
                        styles.descricao
                    }>{`${item.NM_PESSOA_FISICA.toUpperCase()}`}</Text>
            </Pressable>
        );
    }; */

    //const renderItem = ({ item }: { item: any }) => <Item item={item} />;

    return (
        <View style={styles.container}>
            <SearchBar
                darkMode
                placeholder="Pesquise o nome do paciente"
                spinnerVisibility={state.spinnerVisibility}
                style={styles.SearchBarStyle}
                textInputStyle={styles.textInputStyle}
                spinnerSize={RFValue(20, 680)}
                clearIconImageStyle={styles.clearIconImageStyle}
                searchIconImageStyle={styles.searchIconImageStyle}
                onChangeText={(text) => Search(text)}
                onClearPress={() => Onclean()}
                selectionColor="#fff"
                value={state.query}
            />
            <CardSinaisVitais dataSource={state.dataSource} />
        </View>
    );
};

export default OncologiaSinaisVitais;
