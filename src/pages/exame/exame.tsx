import { View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import CardStatusExamesComponent from './components/cardStatusExamesComponent/cardStatusExamesComponent';
import SearchBarPerson, {
    IParamConsulta,
} from '../../components/seachBar/searchBarPerson';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { IExame, useExames } from '../../hooks/useExames';
import ShimerPlaceHolderCardSNVTs from '../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import RenderItemEmpty from '../../components/renderItem/renderItemEmpty';
import RenderFooter from '../../components/renderItem/renderFooter';
import CardExames from './components/cardExame/cardExames';

const Exame: React.FC = () => {
    const styles = useThemeAwareObject(creatStyles);

    const [state, setState] = useState<IParamConsulta<IExame>>({
        query: '',
        isLoading: false,
        refreshing: false,
        dataSource: undefined,
        spinnerVisibility: false,
        page: 1,
        loadingScrow: false,
        continue: true,
        showRequest: false,
    });

    const {
        data,
        refetch,
        isLoading,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useExames(state.query);

    const loadMore = () => {
        if (hasNextPage) {
            fetchNextPage();
        }
    };

    /* useEffect(() => {
        setState((old) => {
            return { ...old, dataSource: data?.pages.map((page) => page).flat(), isLoading: isLoading };
        });
    }, [data, isLoading]); */

    return (
        <View style={styles.container}>
            <View style={styles.box1}>
                <CardStatusExamesComponent
                    label="Liberadas"
                    value={
                        data?.pages
                            ?.map((page) => page)
                            ?.flat()
                            ?.filter((item) => item.status == 'E').length
                    }
                />
                <CardStatusExamesComponent
                    label="Pendentes"
                    value={
                        data?.pages
                            ?.map((page) => page)
                            ?.flat()
                            ?.filter((item) => item.status == 'A').length
                    }
                />
            </View>
            <View style={styles.box2}>
                <SearchBarPerson
                    item={state}
                    onChangeText={(text) =>
                        setState((old) => {
                            return { ...old, query: text };
                        })
                    }
                    onClean={() =>
                        setState((old) => {
                            return {
                                ...old,
                                query: '',
                                isLoading: false,
                                dataSource: undefined,
                            };
                        })
                    }
                    btnOptions={true}
                />
                {data?.pages ? (
                    <FlatList
                        nestedScrollEnabled={true}
                        data={data?.pages?.map((page) => page)?.flat()}
                        renderItem={({ item, index }) => (
                            <CardExames item={item} index={index} />
                        )}
                        scrollEnabled
                        keyExtractor={(item, index) => `key-${index}`}
                        ListEmptyComponent={() => (
                            <RenderItemEmpty text="Nenhum exame encontrado!" />
                        )}
                        onEndReachedThreshold={0.3}
                        ListFooterComponent={() => (
                            <RenderFooter show={isFetchingNextPage} />
                        )}
                        onEndReached={loadMore}
                        refreshing={isLoading}
                        onRefresh={() => {
                            refetch();
                        }}
                    />
                ) : (
                    Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
                )}
            </View>
        </View>
    );
};

const creatStyles = (theme: ThemeContextData) => {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        box1: {
            flexDirection: 'row',
            marginTop: RFPercentage(1),
            paddingBottom: RFPercentage(1),
            backgroundColor: theme.colors.BACKGROUND_1,
        },
        box2: {
            flex: 1,
            marginVertical: RFPercentage(1),
        },
        textStyle: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlign: 'center',
        },
        text: {
            fontFamily: theme.typography.FONTES.Regular,
            letterSpacing: theme.typography.LETTERSPACING.S,
            color: theme.colors.TEXT_SECONDARY,
            fontSize: theme.typography.SIZE.fontysize16,
            textAlignVertical: 'center',
        },
    });
    return styles;
};

export default Exame;
