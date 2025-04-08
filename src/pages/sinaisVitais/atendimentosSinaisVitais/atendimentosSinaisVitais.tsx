import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IAgendaPaciente, useAgendasPaciente } from '../../../hooks/useAgendaConsultas';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import SearchBarPerson from '../../../components/seachBarPerson/searchBarPerson';
import { DateMask } from '../../../services/validacoes';
import MenuPopUp from '../../../components/menuPopUp/menuPopUp';
import { useNavigation } from '@react-navigation/native';
import { StackNavigation } from '../../../routes/routeDashboard';
import moment from 'moment';
import ItemAtendimentoSinaisVitais from './ItemAtendimentoSinaisVitais';

interface Consulta {
    query: string;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: IAgendaPaciente[] | undefined;
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
}

type PropsFilter = 'DATA DE NASCIMENTO' | 'NOME PACIENTE';
type PropsPlaceHolder = 'Data de nascimento' | 'Nome do paciente';

interface Ifilter {
    filter: PropsFilter;
    placeHolder: PropsPlaceHolder;
}

const filterDefault: Ifilter[] = [
    {
        filter: 'DATA DE NASCIMENTO',
        placeHolder: 'Data de nascimento',
    },
    { filter: 'NOME PACIENTE', placeHolder: 'Nome do paciente' },
];

const AtendimentosSinaisVitais = () => {

    const navigation = useNavigation<StackNavigation>();

    const { data: Atendimentos, isLoading } = useAgendasPaciente();
    const styles = useThemeAwareObject(createStyles);

    const clearSetTimeout = useRef<NodeJS.Timeout | null>(null);

    type Props_Search = 'nM_PESSOA_FISICA' | 'dT_NASCIMENTO';

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

    const [filterSelected, setFilterSelected] = useState<Ifilter>(
        filterDefault[0],
    );

    const validade_date = (value1: string, value2: string) => {
        const data1 = moment(value1).format('DD/MM/YYYY');
        const data2 = moment(value2, 'DD/MM/YYYY').format('DD/MM/YYYY');
        return data1 === data2;
    };

    const Search = (name: string, prop: Props_Search) => {
        if (prop === 'dT_NASCIMENTO') {
            const result = Atendimentos?.filter(value =>
                validade_date(value[prop], name),
            );
            return result;
        } else {
            const result = Atendimentos?.filter(item =>
                item[prop].toLocaleLowerCase().includes(name.toLocaleLowerCase()),
            );
            return result;
        }
    };

    const onChangeTextSearch = async (name: string) => {
        setState({ ...state, spinnerVisibility: true, query: name });

        if (clearSetTimeout.current) {
            clearTimeout(clearSetTimeout.current);
        }

        clearSetTimeout.current = setTimeout(() => {
            const seachResult = Search(name, 'nM_PESSOA_FISICA');
            setState(old => {
                return {
                    ...old,
                    query: name,
                    dataSource:
                        seachResult && seachResult.length > 0
                            ? seachResult
                            : old.dataSource,
                    spinnerVisibility: false,
                };
            });
        }, 1000);
    };

    const onChangeDateSearch = (date: string) => {
        setState({ ...state, spinnerVisibility: true, query: date });

        const textDate = DateMask(date);

        if (textDate.length === 0) {
            setState(prevState => {
                return {
                    ...prevState,
                    spinnerVisibility: false,
                    query: textDate,
                    dataSource: Atendimentos,
                };
            });
            return;
        }

        if (textDate.length === 10) {
            const seachResult = Search(textDate, 'dT_NASCIMENTO');
            setState(old => {
                return {
                    ...old,
                    query: textDate,
                    dataSource: seachResult && seachResult.length > 0 ? seachResult : [],
                    spinnerVisibility: false,
                };
            });
        }
    };

    const Onclean = () => {
        setState(prevState => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: Atendimentos,
                query: '',
            };
        });
    };

    const renderItem = useCallback(({ item, index }: { item: IAgendaPaciente; index: number }) => {
        return (
            <ItemAtendimentoSinaisVitais
                key={index.toString()}
                item={item}
                index={index}
                onPress={() => navigation.navigate('AtendimentoFilterSinaisVitais', { cd_pessoa_fisica: item.cD_PESSOA_FISICA })}
                onLongPress={() => console.log('Long Press')}
            />
        );
    }, [navigation]);

    const renderItemEmpty = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.text}>Nenhuma consulta encontrada!</Text>
        </View>
    );

    const filter = (item: Ifilter) => {
        Onclean();
        setFilterSelected(item);
    };

    useEffect(() => {
        setState(prevState => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: Atendimentos,
                query: '',
            };
        });
    }, [Atendimentos]);

    const renderShimmer = () => {
        return (
            <View style={styles.shimmerContainer}>
                {Array(6).fill(0).map((_, index) => (
                    <ShimerPlaceHolderCardSNVTs key={`shimmer-${index}`} />
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <SearchBarPerson
                    placeholder={filterSelected.placeHolder}
                    onChangeText={text =>
                        filterSelected.filter === 'NOME PACIENTE'
                            ? onChangeTextSearch(text)
                            : onChangeDateSearch(text)
                    }
                    onClean={() => Onclean()}
                    spinnerVisibility={state.spinnerVisibility}
                    btnOptions={true}
                    value={state.query}
                    keyboardType={
                        filterSelected.filter === 'NOME PACIENTE' ? 'default' : 'numeric'
                    }
                />
                <MenuPopUp
                    btnLabels={['Nome paciente', 'Data de nascimento']}
                    containerStyle={{
                        position: 'absolute',
                        right: 0,
                        alignSelf: 'center',
                    }}
                    onpress={label => {
                        switch (label) {
                            case 'Nome paciente':
                                filter(filterDefault[1]);
                                break;
                            case 'Data de nascimento':
                                filter(filterDefault[0]);
                                break;
                            default:
                                break;
                        }
                    }}
                />
            </View>
            {isLoading ? (
                renderShimmer()
            ) : (
                <FlatList
                    data={state.dataSource?.filter((object, Index, self) =>
                        Index === self.findIndex((t) => (t.cD_PESSOA_FISICA === object.cD_PESSOA_FISICA))
                    )}
                    renderItem={({ index, item }) => renderItem({ item, index })}
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={renderItemEmpty}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    )
}

export default AtendimentosSinaisVitais;

const createStyles = (theme: ThemeContextData) => {
    const { width } = Dimensions.get('window');
    const isVerySmallDevice = width < 320;
    const isSmallDevice = width < 360;

    return StyleSheet.create({
        container: {
            flex: 1,
            width: '100%',
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        searchContainer: {
            flexDirection: 'row',
            width: '100%',
        },
        shimmerContainer: {
            flex: 1,
            width: width,
        },
        listContainer: {
            flexGrow: 1,
            width: '100%',
        },
        cardStyle: {
            flex: 1,
            borderRadius: 10
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: isVerySmallDevice
                ? theme.typography.SIZE.fontysize12
                : isSmallDevice
                    ? theme.typography.SIZE.fontysize14
                    : theme.typography.SIZE.fontysize16,
            textAlign: 'center',
        },
        emptyContainer: {
            width: width,
            padding: isVerySmallDevice ? 10 : isSmallDevice ? 15 : 20,
            alignItems: 'center',
            justifyContent: 'center',
        }
    });
}