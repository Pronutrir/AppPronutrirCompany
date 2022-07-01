import React, { useState, useContext, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import SinaisVitaisContext, {
    IFilterPF,
    IPFSinaisVitais,
} from '../../contexts/sinaisVitaisContext';
import { ModalHandles } from '../../components/Modais/ModalBottom';
import { DateMask } from '../../services/validacoes';
import MenuPopUp from '../../components/menuPopUp/menuPopUp';
import SearchBar from 'react-native-dynamic-search-bar';
import createStyles from './style';
import CardConsultasGerais from '../Cards/cardConsultasGerais';
import { useNavigation } from '@react-navigation/native';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
export interface IParamConsulta {
    query: string | null | undefined;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: IPFSinaisVitais[];
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
    showRequest: boolean;
}
interface Ifilter {
    filter: string;
    placeHolder: string;
}

const filterDefault = [
    { filter: 'NOME PACIENTE', placeHolder: 'Nome do paciente' },
    {
        filter: 'DATA DE NASCIMENTO',
        placeHolder: 'Data de nascimento',
    },
];

interface Props {
    reset?: boolean;
}

const SinaisVitaisGerais: React.FC<Props> = ({ reset = false }:Props) => {
    
    const styles = useThemeAwareObject(createStyles);

    const navigation = useNavigation();
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
        showRequest: false,
    });

    const Search = async (filter: IFilterPF) => {
        const query = filter.queryDate ? filter.queryDate : filter.queryNome;
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
                return { ...prevState, spinnerVisibility: false, query: text };
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
        const textDate = DateMask(text);
        if (textDate.length === 0) {
            setState((prevState) => {
                return {
                    ...prevState,
                    spinnerVisibility: false,
                    query: textDate,
                    showRequest: false,
                };
            });
            return;
        }

        if (text.length >= 9 && text.length <= 10) {
            Search({ queryDate: textDate });
        }
        if (text.length > 10) {
            return;
        } else {
            setState((prevState) => {
                return {
                    ...prevState,
                    query: textDate,
                    dataSource: [],
                    showRequest: false,
                };
            });
        }
    };

    useEffect(() => {
        setFilterSelected(filterDefault[0]);
    }, []);

    useEffect(() => {
        if(reset){
            Onclean();
        }
    },[reset])

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    justifyContent: 'space-around',
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
                <MenuPopUp
                    btnLabels={['Nome paciente', 'Data de nascimento']}
                    onpress={(label) => {
                        switch (label) {
                            case 'Nome paciente':
                                filter(filterDefault[0]);
                                break;
                            case 'Data de nascimento':
                                filter(filterDefault[1]);
                                break;
                            default:
                                break;
                        }
                    }}
                />
            </View>
            <CardConsultasGerais
                dataSourcePFsinaisVitais={state.dataSource}
                setState={setState}
                state={state}
                onPress={(item) =>
                    navigation.navigate('EvolucaoEnfermagem', {
                        PessoaFisica: item,
                    })
                }
            />
        </View>
    );
};

export default SinaisVitaisGerais;
