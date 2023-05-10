import { View, StyleSheet, FlatList } from 'react-native';
import React, { useState } from 'react';
import { ThemeContextData } from '../../contexts/themeContext';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import CardStatusExamesComponent from './components/cardStatusExamesComponent/cardStatusExamesComponent';
import SearchBarPerson from '../../components/seachBar/searchBarPerson';
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  useExames,
  IparamsFilterExame,
  useCountExames,
} from '../../hooks/useExames';
import ShimerPlaceHolderCardSNVTs from '../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import RenderItemEmpty from '../../components/renderItem/renderItemEmpty';
import RenderFooter from '../../components/renderItem/renderFooter';
import CardExames from './components/cardExame/cardExames';
import MenuPopUp from '../../components/menuPopUp/menuPopUp';

type IFilterExames =
  | 'Todos'
  | 'Liberados'
  | 'Pendentes'
  | 'Cancelados'
  | 'search';

type IFilterSearch = 'Nome paciente' | 'Nome médico(a)';
const Exame: React.FC = () => {
  const styles = useThemeAwareObject(creatStyles);

  const [stateExame, setStateExame] = useState<IparamsFilterExame>({});
  const [placeholder, setPlaceholder] =
    useState<IFilterSearch>('Nome paciente');
  const [selectedFilter, setSelectedFilter] = useState<IFilterExames>('Todos');

  const { data: countExames } = useCountExames();

  const {
    data,
    refetch,
    isLoading,
    /* isFetching, */
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useExames(stateExame);

  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const filterExames = (label: IFilterExames) => {
    switch (label) {
      case 'Todos':
        setStateExame({});
        setSelectedFilter('Todos');
        break;
      case 'Liberados':
        setStateExame({ statusExame: 'E' });
        setSelectedFilter('Liberados');
        break;
      case 'Pendentes':
        setStateExame({ statusExame: 'A' });
        setSelectedFilter('Pendentes');
        break;
      case 'Cancelados':
        setStateExame({ statusExame: 'C' });
        setSelectedFilter('Cancelados');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <CardStatusExamesComponent
          label="Liberadas"
          value={countExames?.execultados}
        />
        <CardStatusExamesComponent
          label="Pendentes"
          value={countExames?.andamentos}
        />
        <MenuPopUp
          containerStyle={styles.menuPopUpStyle}
          showItemSelected={true}
          ItemSelected={selectedFilter}
          btnLabels={['Todos', 'Liberados', 'Pendentes', 'Cancelados']}
          onpress={filterExames}
        />
      </View>
      <View style={styles.box2}>
        <View style={styles.boxSearch}>
          <SearchBarPerson
            value={
              placeholder === 'Nome paciente'
                ? stateExame.nomePacient
                : placeholder === 'Nome médico(a)'
                ? stateExame.nomeMedico
                : undefined
            }
            onChangeText={text => {
              switch (placeholder) {
                case 'Nome paciente':
                  {
                    setStateExame({ nomePacient: text });
                    setSelectedFilter('search');
                  }
                  break;
                case 'Nome médico(a)':
                  setStateExame({ nomeMedico: text });
                  break;
              }
            }}
            onClean={() => {
              setStateExame({});
              setSelectedFilter('Todos');
            }}
            btnOptions={true}
            placeholder={placeholder}
            //spinnerVisibility={isFetching}
          />
          <MenuPopUp
            containerStyle={styles.menuPopUpStyleSearch}
            btnLabels={['Nome paciente', 'Nome médico(a)']}
            showItemSelected={true}
            ItemSelected={placeholder}
            onpress={label => {
              switch (label) {
                case 'Nome paciente':
                  setPlaceholder(label);
                  break;
                case 'Nome médico(a)':
                  setPlaceholder(label);
                  break;
              }
            }}
          />
        </View>
        {data?.pages ? (
          <FlatList
            nestedScrollEnabled={true}
            data={data?.pages?.map(page => page)?.flat()}
            renderItem={({ item, index }) => (
              <CardExames item={item} index={index} filter={stateExame} />
            )}
            scrollEnabled
            keyExtractor={(item, index) => `key-${index}`}
            ListEmptyComponent={
              <RenderItemEmpty text="Nenhum exame encontrado!" />
            }
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
    boxSearch: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    menuPopUpStyle: {
      position: 'absolute',
      right: 0,
    },
    menuPopUpStyleSearch: {
      position: 'absolute',
      alignSelf: 'center',
      right: 0,
    },
  });
  return styles;
};

export default Exame;
