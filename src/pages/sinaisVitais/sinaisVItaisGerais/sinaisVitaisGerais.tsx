import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import CardConsultasGerais from '../components/cardConsultasGerais/cardConsultasGerais';
import styles from './style';
import SinaisVitaisContext, {
    IPFSinaisVitais,
} from '../../../contexts/sinaisVitaisContext';
import FilterPFGerais from '../components/filterPFGerais/filterPFGerais';
import { ScrollView } from 'react-native-gesture-handler';
export interface IParamConsulta {
    query: string;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: IPFSinaisVitais[];
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
}

const SinaisVitaisGerais = () => {
    const { SearchPFSinaisVitais } = useContext(SinaisVitaisContext);
    const [selectedFilter, setSelectedFilter] = useState<string | undefined>();
    const [state, setState] = useState<IParamConsulta>({
        query: '',
        isLoading: true,
        refreshing: false,
        dataSource: [],
        spinnerVisibility: false,
        page: 2,
        loadingScrow: false,
        continue: true,
    });

    const Search = async (nome: string) => {
        setState((prevState) => {
            return {
                ...prevState,
                spinnerVisibility: true,
                query: nome,
                dataSource: [],
            };
        });

        const PFSinaisVitais = await SearchPFSinaisVitais(nome, 1);

        if (PFSinaisVitais) {
            setState((prevState) => {
                return {
                    ...prevState,
                    spinnerVisibility: false,
                    dataSource: PFSinaisVitais,
                };
            });
        } else {
            if (PFSinaisVitais === null) {
                setState((prevState) => {
                    return {
                        ...prevState,
                        spinnerVisibility: false,
                        dataSource: [],
                    };
                });
            }
        }
    };

    const Onclean = () => {
        setState((prevState) => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: [],
                query: '',
                continue: true,
            };
        });
    };

    return (
        <ScrollView style={styles.container}>
            <FilterPFGerais onpress={(item) => setSelectedFilter(item.prop)} selectedFilter={selectedFilter}/>
            <SearchBar
                darkMode
                placeholder="Pesquise o nome do paciente"
                spinnerVisibility={state.spinnerVisibility}
                style={styles.SearchBarStyle}
                textInputStyle={styles.textInputStyle}
                spinnerSize={RFValue(20, 680)}
                clearIconImageStyle={styles.clearIconImageStyle}
                searchIconImageStyle={styles.searchIconImageStyle}
                onChangeText={(text) =>
                    text.length > 4
                        ? Search(text)
                        : setState((prevState) => {
                              return {
                                  ...prevState,
                                  spinnerVisibility: false,
                                  query: text,
                                  dataSource: [],
                                  continue: true,
                              };
                          })
                }
                onClearPress={() => Onclean()}
                selectionColor="#fff"
                value={state.query}
            />
            <CardConsultasGerais
                dataSourcePFsinaisVitais={state.dataSource}
                setState={setState}
                state={state}
            />
        </ScrollView>
    );
};

export default SinaisVitaisGerais;
