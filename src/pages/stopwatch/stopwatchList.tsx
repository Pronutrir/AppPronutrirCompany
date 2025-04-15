import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ModalHandlesMenu } from '../../components/menuPopUp/menuPopUp';
import { FlatList } from 'react-native-gesture-handler';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/routeDashboard';
import { PatientsStopWatchH } from '../../hooks/useStopwatch';
import CardStopWatchGeneric from './cardStopWatchGeneric';
import renderItemEmpty from '../../components/renderItem/renderItemEmpty';
import HistorySvg from '../../assets/svg/historico.svg';
import moment from 'moment';
import SearchBarPerson from '../../components/seachBar/searchBarPerson';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'StopwatchList'>;

interface Props {
    route: ProfileScreenRouteProp;
}

interface Query {
    query: string;
    isLoading: boolean;
    refreshing: boolean;
    dataSource: PatientsStopWatchH[] | undefined;
    spinnerVisibility: boolean;
    page: number;
    loadingScrow: boolean;
    continue: boolean;
}

const StopwatchList = ({
    route: {
        params: { listFilter, title },
    },
}: Props) => {

    const styles = useThemeAwareObject(createStyles);

    const refMenuBotom = useRef<ModalHandlesMenu>(null);

    const [state, setState] = useState<Query>({
        query: '',
        isLoading: true,
        refreshing: false,
        dataSource: listFilter,
        spinnerVisibility: false,
        page: 1,
        loadingScrow: false,
        continue: true,
    });

    const Onclean = () => {
        setState(prevState => {
            return {
                ...prevState,
                spinnerVisibility: false,
                dataSource: listFilter,
                query: '',
            };
        });
    };

    const clearSetTimeout = useRef<NodeJS.Timeout | null>(null);

    const Search = (text: string) => {
        setState({ ...state, spinnerVisibility: true, query: text });

        if (clearSetTimeout.current) {
            clearTimeout(clearSetTimeout.current);
        }

        clearSetTimeout.current = setTimeout(() => {
            const seachResult = listFilter.filter(item => item.paciente.toLowerCase().includes(text.toLowerCase()));
            setState(old => {
                return {
                    ...old,
                    query: text,
                    dataSource:
                        seachResult && seachResult.length > 0
                            ? seachResult
                            : old.dataSource,
                    spinnerVisibility: false,
                };
            });
        }, 1000);
    }

    const renderItem = ({
        item,
        index,
    }: {
        item: PatientsStopWatchH;
        index: number;
    }) => (
        <CardStopWatchGeneric>
            <TouchableOpacity
                key={index.toString()}
                onPress={() => {
                    refMenuBotom.current?.showMenu();
                }}
                style={{ flexDirection: 'row', paddingVertical: 10 }}>
                <View style={styles.box1}>
                    <HistorySvg width={RFPercentage(5)} height={RFPercentage(5)} />
                </View>
                <View style={styles.box2}>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Paciente: </Text>
                        <Text style={styles.text}>{`${item.paciente.toUpperCase()}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Protocolo: </Text>
                        <Text style={styles.text}>{`${item.protocolo}`}</Text>
                    </View>
                    <View style={styles.item}>
                        <Text style={styles.textLabel}>Data Acolhimento: </Text>
                        <Text style={styles.text}>
                            {moment(item.dT_ACOLHIMENTO).format('DD-MM-YYYY HH:mm:ss')}
                        </Text>
                    </View>
                    {
                        item.dT_ALTA ?
                            <View style={[styles.item, { marginRight: RFPercentage(1) }]}>
                                <Text style={styles.textLabel}>Data da Alta: </Text>
                                <Text style={styles.text}>
                                    {moment(item.dT_ALTA).format('DD-MM-YYYY HH:mm:ss')}
                                </Text>
                            </View>
                            :
                            <View style={[styles.item, { marginRight: RFPercentage(1) }]}>
                                <Text style={styles.textLabel}>Data da Alta: </Text>
                                <Text style={styles.text}>
                                    Em Atendimento
                                </Text>
                            </View>
                    }
                    {
                        title == "ALTA" &&
                        <View style={[styles.item, { marginRight: RFPercentage(1) }]}>
                            <Text style={styles.textLabel}>Duração do Atendimento: </Text>
                            <Text style={styles.text}>
                                {`${item.duration} Min`}
                            </Text>
                        </View>
                    }
                </View>
            </TouchableOpacity>
        </CardStopWatchGeneric>
    );

    return (
        <View style={styles.container}>
            <SearchBarPerson
                value={state.query}
                onChangeText={text => Search(text)}
                onClean={() => Onclean()}
                btnOptions={true}
                placeholder={'Digite o nome do paciente'}
                spinnerVisibility={state.spinnerVisibility}
            />
            <FlatList
                data={state.dataSource}
                renderItem={({ item, index }) => renderItem({ item, index })}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={renderItemEmpty}
            /* refreshing={isLoading}
              onRefresh={() => refetch()} */
            />
        </View>
    )
}

export default StopwatchList;

const createStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 10,
        },
        cardStyle: {
            flex: 1,
            padding: 10,
        },
        textLabel: {
            fontFamily: theme.typography.FONTES.Bold,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_PRIMARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
        },
        text_protocolo: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize10,
            textAlign: 'justify',
            textAlignVertical: 'center',
        },
        item_protocolo: {
            width: '80%',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        item: {
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        box1: {
            flex: 0.5,
            justifyContent: 'center',
            alignItems: 'center',
            margin: 3,
        },
        box2: {
            flex: 5,
            justifyContent: 'center',
            alignItems: 'flex-start',
            margin: 3,
        },
        menuPopUpStyleSearch: {
            position: 'absolute',
            alignSelf: 'auto',
            right: 0,
        },
    });
    return styles;
};