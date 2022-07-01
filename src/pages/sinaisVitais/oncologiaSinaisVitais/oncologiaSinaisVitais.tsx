import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import CardConsultasQTComponent from '../components/cardConsultasQTComponent/cardConsultasQTComponent';
import createStyles from './style';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import { IAgendaQT, useGetAgendasQt } from '../../../hooks/useAgendaQt';
interface Consulta {
    query: string;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: IAgendaQT[] | undefined;
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
}

const OncologiaSinaisVitais = () => {
    const styles = useThemeAwareObject(createStyles);

    const { data: agendasQt, refetch } = useGetAgendasQt();

    const [state, setState] = useState<Consulta>({
        query: '',
        isLoading: true,
        refreshing: false,
        dataSource: undefined,
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
        if (agendasQt) {
            clearSetTimeout.current = setTimeout(() => {
                const SeachResult = agendasQt.filter((item) =>
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
                        return {
                            ...old,
                            query: name,
                            spinnerVisibility: false,
                        };
                    });
                }
            }, 1000);
        }
    };

    const Onclean = () => {
        setState((prevState) => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: agendasQt,
                query: '',
            };
        });
    };

    useEffect(() => {
        setState((prevState) => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: agendasQt,
                query: '',
            };
        });
    }, [agendasQt]);

    return (
        <View style={styles.container}>
            <SearchBar
                darkMode
                placeholder="Nome do paciente"
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
            <CardConsultasQTComponent refetch={() => refetch()} dataSourceQT={state.dataSource} />
        </View>
    );
};

export default OncologiaSinaisVitais;
