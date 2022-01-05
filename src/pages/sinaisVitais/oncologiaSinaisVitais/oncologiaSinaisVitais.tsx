import React, { useState, useContext, useEffect, useRef } from 'react';
import { View } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import SinaisVitaisContext from '../../../contexts/sinaisVitaisContext';
import CardConsultasQTComponent from '../components/cardConsultasQTComponent/cardConsultasQTComponent';
import { IconsultaQT } from '../../../reducers/ConsultasQTReducer';
import styles from './style';
interface Consulta {
    query: string;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: IconsultaQT[];
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
}

const OncologiaSinaisVitais = () => {
    const {
        stateConsultasQT: { consultasQT, flagQT },
    } = useContext(SinaisVitaisContext);
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

    const clearSetTimeout = useRef<NodeJS.Timeout | null>(null);

    const Search = async (name: string) => {
        setState({ ...state, spinnerVisibility: true, query: name });

        if (clearSetTimeout.current) {
            clearTimeout(clearSetTimeout.current);
        }
        clearSetTimeout.current = setTimeout(() => {
            const SeachResult = consultasQT.filter((item) =>
                item.nM_PESSOA_FISICA
                    .toLocaleLowerCase()
                    .includes(name.toLocaleLowerCase()),
            );
            if (SeachResult.length > 0) {
                setState((old) => {
                    return {
                        ...old,
                        query: name,
                        dataSource: SeachResult,
                        spinnerVisibility: false,
                    };
                });
            } else {
                setState((old) => {
                    return { ...old, query: name, spinnerVisibility: false };
                });
            }
        }, 2000);
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

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: consultasQT,
                query: '',
            };
        });
    }, [consultasQT]);

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
            <CardConsultasQTComponent
                dataSourceQT={flagQT ? state.dataSource : null}
            />
        </View>
    );
};

export default OncologiaSinaisVitais;
