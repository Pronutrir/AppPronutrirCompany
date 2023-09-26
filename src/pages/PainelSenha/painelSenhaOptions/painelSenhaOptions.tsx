import { FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemeContextData } from '../../../contexts/themeContext';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
import {
  useGetListPacientFilaEspera,
  PropsPacientFilaEspera,
} from '../../../hooks/usePainelSenha';
import CardPainelSenhaComponent from '../painelSenhaComponents/cardPainelSenhaComponent';
import ShimerPlaceHolderCardSNVTs from '../../../components/shimmerPlaceHolder/shimerPlaceHolderCardSNVTs';
import RenderItemEmpty from '../../../components/renderItem/renderItemEmpty';

const PainelSenhaOptions = () => {
  const styles = useThemeAwareObject(createStyles);

  const { data, isFetching, refetch, isLoading } =
    useGetListPacientFilaEspera();

  console.log('PainelSenhaOptions');

  const renderItem: ListRenderItem<PropsPacientFilaEspera> = ({
    item,
    index,
  }) => <CardPainelSenhaComponent key={index} item={item} />;

  return (
    <View style={styles.container}>
      {!isFetching ? (
        <FlatList
          data={data}
          keyExtractor={(_$, index) => index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={<RenderItemEmpty />}
          //refreshing={isLoading}
          //onRefresh={() => refetch()}
        />
      ) : (
        Array(4).fill(<ShimerPlaceHolderCardSNVTs />)
      )}
    </View>
  );
};

export default PainelSenhaOptions;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.BACKGROUND_2,
    },
  });
  return styles;
};
