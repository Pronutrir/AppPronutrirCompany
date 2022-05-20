import React, { useState, useContext, useEffect, useRef } from 'react';
import { View } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import SinaisVitaisContext from '../../../contexts/sinaisVitaisContext';
import CardConsultasQTComponent from '../components/cardConsultasQTComponent/cardConsultasQTComponent';
import { IconsultaQT } from '../../../reducers/ConsultasQTReducer';
import createStyles from './style';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
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

    const styles = useThemeAwareObject(createStyles);

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
        setState((prevState) => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: consultasQT,
                query: '',
            };
        });
    };

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
