import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { RootStackParamList } from '../../routes/routeDashboard';
import { RouteProp } from '@react-navigation/native';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import CardSimples from '../../components/Cards/CardSimples';
import { ThemeContextData } from '../../contexts/themeContext';
import {
  IQuimioterapiaStopwatchH,
  useListStopwatchAtrados,
} from '../../hooks/useStopwatch';
import CardStopWatch from './cardStopWatch';
import MenuPopUp, {
  ModalHandlesMenu,
} from '../../components/menuPopUp/menuPopUp';
import { RFPercentage } from 'react-native-responsive-fontsize';

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'StopwatchFilter'>;

interface Props {
  route: ProfileScreenRouteProp;
}

type IFilterSearch = 'Todos' | 'Margem Positiva' | 'Margem Negativa';

const StopwatchFilter = ({
  route: {
    params: { listFilter, filterParam, setor },
  },
}: Props) => {
  const { data: listAtrados } = useListStopwatchAtrados(setor);

  const styles = useThemeAwareObject(createStyles);

  const refMenuBotom = useRef<ModalHandlesMenu>(null);

  type ObjectKey = keyof typeof listFilter[0];

  const myVar = filterParam as ObjectKey;

  const [listItens, SetListItens] = useState(
    listFilter.filter(item => item[myVar] == 'N'),
  );

  const [placeholder, setPlaceholder] =
    useState<IFilterSearch>('Margem Negativa');

  const Filter = (paramFilter: string) => {
    switch (paramFilter) {
      case 'Margem Negativa':
        setPlaceholder(paramFilter);
        SetListItens(listFilter.filter(item => item[myVar] == 'N'));
        break;
      case 'Margem Positiva':
        setPlaceholder(paramFilter);
        SetListItens(listFilter.filter(item => item[myVar] == 'P'));
        break;
      case 'Todos':
        setPlaceholder(paramFilter);
        SetListItens(listFilter);
        break;
      default:
        break;
    }
  };

  const renderItemEmpty = () => (
    <CardSimples styleCardContainer={styles.cardStyle}>
      <Text style={styles.text}>Nenhum paciente encontrado</Text>
    </CardSimples>
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: IQuimioterapiaStopwatchH;
    index: number;
  }) => (
    <CardSimples key={index} styleCardContainer={styles.cardStyle}>
      <CardStopWatch
        key={index.toString()}
        item={item}
        index={index}
        setor={setor}
      />
    </CardSimples>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.textLabel}>{placeholder}</Text>
      <MenuPopUp
        ref={refMenuBotom}
        btnVisible={true}
        containerStyle={styles.menuPopUpStyle}
        btnLabels={['Todos', 'Margem Positiva', 'Margem Negativa']}
        showItemSelected={true}
        ItemSelected={placeholder}
        onpress={label => Filter(label)}
      />
      <FlatList
        data={listItens}
        renderItem={({ item, index }) => renderItem({ item, index })}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={renderItemEmpty}
      /* refreshing={isLoading}
        onRefresh={() => refetch()} */
      />
    </View>
  );
};

export default StopwatchFilter;

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
    titleLabel: {
      alignSelf: 'flex-start',
      paddingLeft: 10,
    },
    textLabel: {
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_PRIMARY,
      fontSize: theme.typography.SIZE.fontysize16,
      textAlign: 'center',
      marginVertical: RFPercentage(0.5),
    },
    text: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.TEXT_SECONDARY,
      fontSize: theme.typography.SIZE.fontysize16,
    },
    item: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    SubItem: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    menuPopUpStyle: {
      position: 'absolute',
      alignSelf: 'auto',
      right: 0,
    },
  });
  return styles;
};
