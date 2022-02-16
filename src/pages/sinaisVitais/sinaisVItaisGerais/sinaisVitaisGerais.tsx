import React, { useState, useContext, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import CardConsultasGerais from '../components/cardConsultasGerais/cardConsultasGerais';
import styles from './style';
import SinaisVitaisContext, {
    IFilterPF,
    IPFSinaisVitais,
} from '../../../contexts/sinaisVitaisContext';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import BtnOptionsFilter from '../../../components/buttons/BtnOptionsFilter';
import ModalBottom, {
    ModalHandles,
} from '../../../components/Modais/ModalBottom';
import { DateMask } from '../../../services/validacoes';
export interface IParamConsulta {
    query: string | null | undefined;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: IPFSinaisVitais[];
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
    showRequest: boolean
}

interface Ifilter {
    filter: string;
    placeHolder: string;
}

const filterDefault = [
    {
        filter: 'DATA DE NASCIMENTO',
        placeHolder: 'Pesquise a data de nascimento',
    },
    { filter: 'NOME PACIENTE', placeHolder: 'Pesquise o nome do paciente' },
];

const SinaisVitaisGerais = () => {
    const { SearchPFSinaisVitais } = useContext(SinaisVitaisContext);
    const refModalBotom = useRef<ModalHandles>(null);
    const [filterSelected, setFilterSelected] = useState<Ifilter>(
        filterDefault[0],
    );
    const [state, setState] = useState<IParamConsulta>({
        query: '',
        isLoading: true,
        refreshing: false,
        dataSource: [],
        spinnerVisibility: false,
        page: 2,
        loadingScrow: false,
        continue: true,
        showRequest: false
    });

    const Search = async (filter: IFilterPF) => {
        let query = filter.queryDate ? filter.queryDate : filter.queryNome;

        setState((prevState) => {
            return {
                ...prevState,
                spinnerVisibility: true,
                query: query,
                dataSource: [],
            };
        });

        const PFSinaisVitais = await SearchPFSinaisVitais(filter);

        if (PFSinaisVitais) {
            setState((prevState) => {
                return {
                    ...prevState,
                    spinnerVisibility: false,
                    dataSource: PFSinaisVitais,
                    showRequest: true,
                };
            });
        } else {
            if (PFSinaisVitais === null) {
                setState((prevState) => {
                    return {
                        ...prevState,
                        spinnerVisibility: false,
                        dataSource: [],
                        showRequest: true,
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
                showRequest: false,
            };
        });
    };

    const filter = (item: Ifilter) => {
        Onclean();
        setFilterSelected(item);
        refModalBotom.current?.closeModal();
    };

    const filterTextSelected = (item: string) => {
        return item;
    };

    const onChangeTextSearch = (text: string) => {
        if (text.length === 0) {
            setState((prevState) => {
                return { ...prevState, spinnerVisibility: false, query: text, };
            });
            return;
        }
        text.length > 4
            ? Search({ queryNome: text })
            : setState((prevState) => {
                  return {
                      ...prevState,
                      spinnerVisibility: false,
                      query: text,
                      dataSource: [],
                      continue: true,
                  };
              });
    };

    const onChangeDateSearch = (text: string) => {
        let textDate = DateMask(text);
        if (textDate.length === 0) {
            setState((prevState) => {
                return { ...prevState, spinnerVisibility: false, query: textDate, showRequest: false };
            });
            return;
        }
        text.length >= 9
            ? Search({ queryDate: textDate })
            : setState((prevState) => {
                  return {
                      ...prevState,
                      query: textDate,
                      dataSource: [],
                      showRequest: false,
                  };
              });
    };

    useEffect(() => {
        setFilterSelected(filterDefault[0]);
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 5,
                }}>
                <SearchBar
                    darkMode
                    placeholder={filterTextSelected(filterSelected.placeHolder)}
                    spinnerVisibility={state.spinnerVisibility}
                    style={styles.SearchBarStyle}
                    textInputStyle={styles.textInputStyle}
                    spinnerSize={RFValue(20, 680)}
                    clearIconImageStyle={styles.clearIconImageStyle}
                    searchIconImageStyle={styles.searchIconImageStyle}
                    onChangeText={(text) =>
                        filterSelected.filter === 'DATA DE NASCIMENTO'
                            ? onChangeDateSearch(text)
                            : onChangeTextSearch(text)
                    }
                    onClearPress={() => Onclean()}
                    selectionColor="#fff"
                    value={state.query?.toString()}
                    keyboardType={
                        filterSelected.filter === 'DATA DE NASCIMENTO'
                            ? 'number-pad'
                            : 'default'
                    }
                    returnKeyType={'next'}
                />
                <BtnOptionsFilter
                    onPress={() => {
                        refModalBotom.current?.openModal();
                    }}
                />
                <ModalBottom animationType={'slide'} ref={refModalBotom}>
                    <View style={{ paddingVertical: 10 }}>
                        <TouchableOpacity
                            onPress={() => filter(filterDefault[1])}
                            style={{ paddingVertical: 10 }}>
                            <Text style={styles.selectTextStyle}>
                                NOME PACIENTE
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => filter(filterDefault[0])}
                            style={{ paddingVertical: 10 }}>
                            <Text style={styles.selectTextStyle}>
                                DATA DE NASCIMENTO
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ModalBottom>
            </View>
            <CardConsultasGerais
                dataSourcePFsinaisVitais={state.dataSource}
                setState={setState}
                state={state}
            />
        </ScrollView>
    );
};

export default SinaisVitaisGerais;
