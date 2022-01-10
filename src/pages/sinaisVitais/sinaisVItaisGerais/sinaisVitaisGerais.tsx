import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import SearchBar from 'react-native-dynamic-search-bar';
import { RFValue } from 'react-native-responsive-fontsize';
import CardConsultasGerais from '../components/cardConsultasGerais/cardConsultasGerais';
import styles from './style';
import SinaisVitaisContext, {
    IPFSinaisVitais,
} from '../../../contexts/sinaisVitaisContext';

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
            setState((prevState) => {
                return {
                    ...prevState,
                    spinnerVisibility: false,
                    dataSource: [],
                };
            });
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

    //const Item = ({ title }: { title: any }) => {
    //    return (
    //        <Pressable
    //            key={title.nM_PESSOA_FISICA}
    //            style={styles.item}
    //           onPress={() => {} /* SearchAtendimentos(title) */}>
    //           <Text
    //               style={
    //                   styles.descricao
    //               }>{`${title.nM_PESSOA_FISICA.toUpperCase()}`}</Text>
    //       </Pressable>
    //   );
    //};

    //const renderItem = ({ item }: { item: any }) => <Item title={item} />;

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
            {/* {state.dataSource.length > 0 && state.query.length > 4 && (
                <View style={styles.containerAutoComplete}>
                    <FlatList
                        data={state.dataSource}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={LoadingSearch}
                        onEndReachedThreshold={0.5}
                        ListFooterComponent={renderFooter}
                    />
                </View>
            )} */}
            <CardConsultasGerais
                dataSourcePFsinaisVitais={state.dataSource}
                setState={setState}
                state={state}
            />
        </View>
    );
};

export default SinaisVitaisGerais;
